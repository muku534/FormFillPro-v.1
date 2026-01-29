const DataImport = {
  currentDataset: null,
  currentRowIndex: 0,
  datasets: {},

  async init() {
    await this.loadDatasets();
  },

  async loadDatasets() {
    try {
      const result = await chrome.storage.local.get(['formfill_datasets', 'formfill_active_dataset', 'formfill_row_index']);
      this.datasets = result.formfill_datasets || {};
      if (result.formfill_active_dataset && this.datasets[result.formfill_active_dataset]) {
        this.currentDataset = result.formfill_active_dataset;
        this.currentRowIndex = result.formfill_row_index || 0;
      }
    } catch (e) {
      console.error('Failed to load datasets:', e);
      this.datasets = {};
    }
  },

  async saveDatasets() {
    try {
      await chrome.storage.local.set({
        formfill_datasets: this.datasets,
        formfill_active_dataset: this.currentDataset,
        formfill_row_index: this.currentRowIndex
      });
    } catch (e) {
      console.error('Failed to save datasets:', e);
    }
  },

  parseCSV(content, options = {}) {
    const { delimiter = null, hasHeader = true } = options;

    let cleanContent = content;
    if (cleanContent.charCodeAt(0) === 0xFEFF) {
      cleanContent = cleanContent.slice(1);
    }

    const detectedDelimiter = delimiter || this.detectDelimiter(cleanContent);
    const lines = this.parseCSVLines(cleanContent, detectedDelimiter);

    if (lines.length === 0) {
      throw new Error('File is empty');
    }

    let headers, dataRows;
    if (hasHeader) {
      headers = lines[0].map(h => this.normalizeHeader(h));
      dataRows = lines.slice(1);
    } else {
      headers = lines[0].map((_, i) => `column_${i + 1}`);
      dataRows = lines;
    }

    const rows = dataRows
      .filter(row => row.some(cell => cell.trim() !== ''))
      .map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = this.parseValue(row[i] || '');
        });
        return obj;
      });

    return { headers, rows, delimiter: detectedDelimiter };
  },

  detectDelimiter(content) {
    const firstLine = content.split(/\r?\n/)[0] || '';
    const delimiters = [',', ';', '\t', '|'];
    let maxCount = 0;
    let bestDelimiter = ',';

    for (const d of delimiters) {
      const count = (firstLine.match(new RegExp(d === '|' ? '\\|' : d, 'g')) || []).length;
      if (count > maxCount) {
        maxCount = count;
        bestDelimiter = d;
      }
    }

    return bestDelimiter;
  },

  parseCSVLines(content, delimiter) {
    const lines = [];
    let currentLine = [];
    let currentField = '';
    let inQuotes = false;
    let i = 0;

    while (i < content.length) {
      const char = content[i];
      const nextChar = content[i + 1];

      if (inQuotes) {
        if (char === '"') {
          if (nextChar === '"') {
            currentField += '"';
            i += 2;
            continue;
          } else {
            inQuotes = false;
            i++;
            continue;
          }
        } else {
          currentField += char;
          i++;
          continue;
        }
      }

      if (char === '"') {
        inQuotes = true;
        i++;
        continue;
      }

      if (char === delimiter) {
        currentLine.push(currentField.trim());
        currentField = '';
        i++;
        continue;
      }

      if (char === '\r' && nextChar === '\n') {
        currentLine.push(currentField.trim());
        lines.push(currentLine);
        currentLine = [];
        currentField = '';
        i += 2;
        continue;
      }

      if (char === '\n' || char === '\r') {
        currentLine.push(currentField.trim());
        lines.push(currentLine);
        currentLine = [];
        currentField = '';
        i++;
        continue;
      }

      currentField += char;
      i++;
    }

    if (currentField || currentLine.length > 0) {
      currentLine.push(currentField.trim());
      lines.push(currentLine);
    }

    return lines;
  },

  async parseExcel(arrayBuffer) {
    const data = new Uint8Array(arrayBuffer);

    if (!this.isValidZip(data)) {
      throw new Error('Invalid Excel file format');
    }

    const files = await this.unzipXLSX(data);
    const sharedStrings = this.parseSharedStrings(files['xl/sharedStrings.xml']);
    const sheet = this.parseSheet(files['xl/worksheets/sheet1.xml'], sharedStrings);

    if (sheet.length === 0) {
      throw new Error('Excel file is empty');
    }

    const headers = sheet[0].map(h => this.normalizeHeader(String(h)));
    const rows = sheet.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = this.parseValue(row[i] !== undefined ? String(row[i]) : '');
      });
      return obj;
    });

    return { headers, rows };
  },

  isValidZip(data) {
    return data[0] === 0x50 && data[1] === 0x4B;
  },

  async unzipXLSX(data) {
    const files = {};
    let offset = 0;

    while (offset < data.length - 4) {
      const signature = this.readUint32LE(data, offset);
      if (signature !== 0x04034B50) break;

      const compressionMethod = this.readUint16LE(data, offset + 8);
      const compressedSize = this.readUint32LE(data, offset + 18);
      const uncompressedSize = this.readUint32LE(data, offset + 22);
      const nameLength = this.readUint16LE(data, offset + 26);
      const extraLength = this.readUint16LE(data, offset + 28);

      const nameStart = offset + 30;
      const nameBytes = data.slice(nameStart, nameStart + nameLength);
      const fileName = new TextDecoder().decode(nameBytes);

      const dataStart = nameStart + nameLength + extraLength;
      const fileData = data.slice(dataStart, dataStart + compressedSize);

      if (fileName.endsWith('.xml')) {
        let content;
        if (compressionMethod === 0) {
          content = new TextDecoder().decode(fileData);
        } else if (compressionMethod === 8) {
          try {
            const decompressed = await this.inflate(fileData);
            content = new TextDecoder().decode(decompressed);
          } catch (e) {
            content = '';
          }
        }
        files[fileName] = content || '';
      }

      offset = dataStart + compressedSize;
    }

    return files;
  },

  async inflate(data) {
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(data);
    writer.close();

    const reader = ds.readable.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  },

  readUint16LE(data, offset) {
    return data[offset] | (data[offset + 1] << 8);
  },

  readUint32LE(data, offset) {
    return data[offset] | (data[offset + 1] << 8) | (data[offset + 2] << 16) | (data[offset + 3] << 24);
  },

  parseSharedStrings(xml) {
    if (!xml) return [];

    const strings = [];
    const regex = /<si>[\s\S]*?<t[^>]*>([^<]*)<\/t>[\s\S]*?<\/si>/gi;
    let match;

    while ((match = regex.exec(xml)) !== null) {
      strings.push(this.decodeXmlEntities(match[1]));
    }

    return strings;
  },

  parseSheet(xml, sharedStrings) {
    if (!xml) return [];

    const rows = [];
    const rowRegex = /<row[^>]*>([\s\S]*?)<\/row>/gi;
    let rowMatch;

    while ((rowMatch = rowRegex.exec(xml)) !== null) {
      const rowContent = rowMatch[1];
      const cells = [];
      const cellRegex = /<c\s+r="([A-Z]+)(\d+)"[^>]*(?:t="([^"]*)")?[^>]*>(?:<v>([^<]*)<\/v>)?/gi;
      let cellMatch;

      const cellMap = {};
      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        const col = this.columnToIndex(cellMatch[1]);
        const type = cellMatch[3];
        let value = cellMatch[4] || '';

        if (type === 's' && sharedStrings[parseInt(value)]) {
          value = sharedStrings[parseInt(value)];
        }

        cellMap[col] = this.decodeXmlEntities(value);
      }

      const maxCol = Math.max(...Object.keys(cellMap).map(Number), -1);
      for (let i = 0; i <= maxCol; i++) {
        cells.push(cellMap[i] !== undefined ? cellMap[i] : '');
      }

      if (cells.length > 0) {
        rows.push(cells);
      }
    }

    return rows;
  },

  columnToIndex(col) {
    let index = 0;
    for (let i = 0; i < col.length; i++) {
      index = index * 26 + (col.charCodeAt(i) - 64);
    }
    return index - 1;
  },

  decodeXmlEntities(str) {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  },

  normalizeHeader(header) {
    return header
      .toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  },

  parseValue(value) {
    const trimmed = value.trim();

    if (trimmed === '') return '';

    if (/^-?\d+$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      if (num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER) {
        return num;
      }
    }

    if (/^-?\d+\.\d+$/.test(trimmed)) {
      return parseFloat(trimmed);
    }

    const lowerVal = trimmed.toLowerCase();
    if (lowerVal === 'true' || lowerVal === 'yes' || lowerVal === '1') return true;
    if (lowerVal === 'false' || lowerVal === 'no' || lowerVal === '0') return false;

    return trimmed;
  },

  async importFile(file) {
    const fileName = file.name;
    const extension = fileName.split('.').pop().toLowerCase();

    let result;
    if (extension === 'csv' || extension === 'txt') {
      const content = await this.readFileAsText(file);
      result = this.parseCSV(content);
    } else if (extension === 'xlsx') {
      const buffer = await this.readFileAsArrayBuffer(file);
      result = await this.parseExcel(buffer);
    } else if (extension === 'xls') {
      throw new Error('Legacy .xls format not supported. Please save as .xlsx or .csv');
    } else {
      throw new Error(`Unsupported file format: .${extension}`);
    }

    if (result.rows.length === 0) {
      throw new Error('File contains no data rows');
    }

    const datasetName = fileName.replace(/\.[^.]+$/, '');
    const uniqueName = this.getUniqueName(datasetName);

    this.datasets[uniqueName] = {
      name: uniqueName,
      originalFileName: fileName,
      headers: result.headers,
      rows: result.rows,
      rowCount: result.rows.length,
      importedAt: new Date().toISOString()
    };

    this.currentDataset = uniqueName;
    this.currentRowIndex = 0;

    await this.saveDatasets();

    return {
      name: uniqueName,
      headers: result.headers,
      rowCount: result.rows.length
    };
  },

  getUniqueName(baseName) {
    if (!this.datasets[baseName]) return baseName;

    let counter = 1;
    while (this.datasets[`${baseName}_${counter}`]) {
      counter++;
    }
    return `${baseName}_${counter}`;
  },

  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file, 'UTF-8');
    });
  },

  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  },

  getCurrentRow() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      return null;
    }

    const dataset = this.datasets[this.currentDataset];
    if (this.currentRowIndex >= dataset.rows.length) {
      this.currentRowIndex = 0;
    }

    return dataset.rows[this.currentRowIndex];
  },

  getRowCount() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      return 0;
    }
    return this.datasets[this.currentDataset].rowCount;
  },

  async nextRow() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      return null;
    }

    const dataset = this.datasets[this.currentDataset];
    this.currentRowIndex = (this.currentRowIndex + 1) % dataset.rows.length;
    await this.saveDatasets();

    return this.getCurrentRow();
  },

  async previousRow() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      return null;
    }

    const dataset = this.datasets[this.currentDataset];
    this.currentRowIndex = (this.currentRowIndex - 1 + dataset.rows.length) % dataset.rows.length;
    await this.saveDatasets();

    return this.getCurrentRow();
  },

  async setRowIndex(index) {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      return null;
    }

    const dataset = this.datasets[this.currentDataset];
    if (index >= 0 && index < dataset.rows.length) {
      this.currentRowIndex = index;
      await this.saveDatasets();
    }

    return this.getCurrentRow();
  },

  async setActiveDataset(name) {
    if (this.datasets[name]) {
      this.currentDataset = name;
      this.currentRowIndex = 0;
      await this.saveDatasets();
      return true;
    }
    return false;
  },

  async deleteDataset(name) {
    if (this.datasets[name]) {
      delete this.datasets[name];
      if (this.currentDataset === name) {
        const remaining = Object.keys(this.datasets);
        this.currentDataset = remaining.length > 0 ? remaining[0] : null;
        this.currentRowIndex = 0;
      }
      await this.saveDatasets();
      return true;
    }
    return false;
  },

  async clearAllDatasets() {
    this.datasets = {};
    this.currentDataset = null;
    this.currentRowIndex = 0;
    await this.saveDatasets();
  },

  getDatasetList() {
    return Object.values(this.datasets).map(d => ({
      name: d.name,
      rowCount: d.rowCount,
      headers: d.headers,
      importedAt: d.importedAt,
      isActive: d.name === this.currentDataset
    }));
  },

  getActiveDatasetInfo() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      return null;
    }

    const dataset = this.datasets[this.currentDataset];
    return {
      name: dataset.name,
      headers: dataset.headers,
      rowCount: dataset.rowCount,
      currentRowIndex: this.currentRowIndex,
      currentRow: this.getCurrentRow()
    };
  },

  hasActiveDataset() {
    return this.currentDataset !== null && this.datasets[this.currentDataset] !== undefined;
  }
};

if (typeof window !== 'undefined') {
  window.DataImport = DataImport;
}
