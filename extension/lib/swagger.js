const SwaggerDetector = {
  isSwaggerPage() {
    const indicators = [
      '.swagger-ui',
      '#swagger-ui',
      '[data-name="swagger-ui"]',
      '.opblock',
      '.swagger-container'
    ];

    for (const selector of indicators) {
      if (document.querySelector(selector)) {
        return true;
      }
    }

    const url = window.location.href.toLowerCase();
    const swaggerPaths = ['/swagger', '/api-docs', '/openapi', '/docs/api', '/swagger-ui'];
    if (swaggerPaths.some(path => url.includes(path))) {
      if (document.querySelector('.opblock') || document.querySelector('.swagger-ui')) {
        return true;
      }
    }

    return false;
  },

  getExpandedOperations() {
    const operations = [];
    const opblocks = document.querySelectorAll('.opblock.is-open');

    opblocks.forEach(block => {
      const method = this.getHttpMethod(block);
      const path = this.getOperationPath(block);
      const bodyEditor = this.findBodyEditor(block);
      const parameters = this.findParameters(block);

      operations.push({
        element: block,
        method,
        path,
        bodyEditor,
        parameters
      });
    });

    return operations;
  },

  getHttpMethod(block) {
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
    for (const method of methods) {
      if (block.classList.contains(`opblock-${method}`)) {
        return method.toUpperCase();
      }
    }
    return 'UNKNOWN';
  },

  getOperationPath(block) {
    const pathElement = block.querySelector('.opblock-summary-path') ||
                        block.querySelector('.opblock-summary-path__deprecated') ||
                        block.querySelector('[data-path]');
    return pathElement ? pathElement.textContent.trim() : '';
  },

  findBodyEditor(block) {
    const contentType = this.getSelectedContentType(block);
    const isXmlContentType = contentType.includes('xml');
    const isJsonContentType = contentType.includes('json') || !isXmlContentType;

    const bodyParamTextarea = block.querySelector('.body-param__text');
    if (bodyParamTextarea) {
      const value = (bodyParamTextarea.value || '').trim();
      const isXmlContent = value.startsWith('<');
      const isJsonContent = value.startsWith('{') || value.startsWith('[');

      if (isXmlContentType && isXmlContent) {
        const jsonSchema = this.extractJsonSchemaFromBlock(block);
        if (jsonSchema) {
          return { type: 'xml-textarea', textarea: bodyParamTextarea, jsonSchema };
        }
      }

      if (isJsonContentType && isJsonContent) {
        return bodyParamTextarea;
      }

      if (isJsonContentType && isXmlContent) {
        const jsonSchema = this.extractJsonSchemaFromBlock(block);
        if (jsonSchema) {
          return { type: 'json-from-schema', textarea: bodyParamTextarea, jsonSchema };
        }
      }

      return bodyParamTextarea;
    }

    const textareas = block.querySelectorAll('textarea');
    for (const textarea of textareas) {
      const value = (textarea.value || '').trim();
      if (!value) continue;

      const isXmlContent = value.startsWith('<');
      const isJsonContent = value.startsWith('{') || value.startsWith('[');

      if (isJsonContentType && isJsonContent) {
        return textarea;
      }

      if (isXmlContentType && isXmlContent) {
        const jsonSchema = this.extractJsonSchemaFromBlock(block);
        if (jsonSchema) {
          return { type: 'xml-textarea', textarea, jsonSchema };
        }
        return textarea;
      }

      if (isJsonContentType && isXmlContent) {
        const jsonSchema = this.extractJsonSchemaFromBlock(block);
        if (jsonSchema) {
          return { type: 'json-from-schema', textarea, jsonSchema };
        }
      }
    }

    const monacoContainer = block.querySelector('.monaco-editor');
    if (monacoContainer) {
      return { type: 'monaco', container: monacoContainer, block };
    }

    const aceEditor = block.querySelector('.ace_editor');
    if (aceEditor) {
      return { type: 'ace', container: aceEditor, block };
    }

    return null;
  },

  getSelectedContentType(block) {
    const contentTypeSelectors = [
      '.content-type select',
      '.body-param select',
      'select[aria-label*="content"]',
      '.opblock-section select',
      '.parameters-col_description select'
    ];

    for (const selector of contentTypeSelectors) {
      const select = block.querySelector(selector);
      if (select && select.value) {
        return select.value.toLowerCase();
      }
    }

    const selectElements = block.querySelectorAll('select');
    for (const select of selectElements) {
      const value = (select.value || '').toLowerCase();
      if (value.includes('json') || value.includes('xml')) {
        return value;
      }
    }

    return 'application/json';
  },

  extractJsonSchemaFromBlock(block) {
    const exampleSelectors = [
      '.example-value code',
      '.model-example code',
      '.highlight-code code',
      '.microlight',
      'code.language-json',
      'pre.example code'
    ];

    for (const selector of exampleSelectors) {
      const elements = block.querySelectorAll(selector);
      for (const el of elements) {
        const text = (el.textContent || '').trim();
        if (text.startsWith('{') || text.startsWith('[')) {
          try {
            return JSON.parse(text);
          } catch (e) {}
        }
      }
    }

    const modelTabs = block.querySelectorAll('.model-box, .model');
    for (const tab of modelTabs) {
      const codeBlocks = tab.querySelectorAll('code, pre');
      for (const code of codeBlocks) {
        const text = (code.textContent || '').trim();
        if (text.startsWith('{') || text.startsWith('[')) {
          try {
            return JSON.parse(text);
          } catch (e) {}
        }
      }
    }

    const allCode = block.querySelectorAll('code, pre');
    for (const code of allCode) {
      const text = (code.textContent || '').trim();
      if (text.startsWith('{') && !text.includes('<?xml')) {
        try {
          return JSON.parse(text);
        } catch (e) {}
      }
    }

    return null;
  },

  findParameters(block) {
    const params = [];

    const paramInputs = block.querySelectorAll('.parameters input[type="text"], .parameters select');
    paramInputs.forEach(input => {
      if (input.tagName === 'SELECT' && this.isContentTypeSelect(input)) {
        return;
      }

      const row = input.closest('tr');
      if (row) {
        const nameEl = row.querySelector('.parameter__name');
        const typeEl = row.querySelector('.parameter__type');
        if (nameEl) {
          params.push({
            name: nameEl.textContent.trim().replace('*', '').trim(),
            type: typeEl ? typeEl.textContent.trim() : 'string',
            required: nameEl.textContent.includes('*'),
            element: input
          });
        }
      }
    });

    return params;
  },

  isContentTypeSelect(select) {
    const ariaLabel = (select.getAttribute('aria-label') || '').toLowerCase();
    if (ariaLabel.includes('content') || ariaLabel.includes('media')) {
      return true;
    }

    const options = Array.from(select.options);
    const hasContentType = options.some(opt => {
      const val = opt.value.toLowerCase();
      return val.includes('application/json') || val.includes('application/xml') ||
             val.includes('text/xml') || val.includes('text/plain');
    });

    return hasContentType;
  },

  getEditorContent(editor) {
    if (!editor) return null;

    if (editor.type === 'monaco') {
      try {
        if (window.monaco) {
          const editors = window.monaco.editor.getEditors();
          for (const ed of editors) {
            if (editor.container.contains(ed.getDomNode())) {
              return ed.getValue();
            }
          }
        }
        const textarea = editor.container.querySelector('textarea');
        if (textarea) return textarea.value;
      } catch (e) {}
      return null;
    }

    if (editor.type === 'ace') {
      try {
        if (window.ace && editor.container.id) {
          return window.ace.edit(editor.container.id).getValue();
        }
      } catch (e) {}
      return null;
    }

    if (editor.tagName === 'TEXTAREA' || editor instanceof HTMLTextAreaElement) {
      return editor.value;
    }

    return null;
  }
};

const SwaggerDataGenerator = {
  generateFromStructure(obj) {
    if (obj === null || obj === undefined) {
      return null;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return [];
      return [this.generateFromStructure(obj[0])];
    }

    if (typeof obj === 'object') {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.generateValueForKeyAndType(key, value);
      }
      return result;
    }

    return obj;
  },

  generateValueForKeyAndType(key, exampleValue) {
    if (Array.isArray(exampleValue)) {
      if (exampleValue.length === 0) return [];
      return [this.generateValueForKeyAndType(key, exampleValue[0])];
    }

    if (typeof exampleValue === 'object' && exampleValue !== null) {
      return this.generateFromStructure(exampleValue);
    }

    const keyLower = key.toLowerCase();

    if (keyLower === 'id' || keyLower.endsWith('id')) {
      if (typeof exampleValue === 'string' && exampleValue.includes('-')) {
        return this.generateUUID();
      }
      return this.randomInt(1, 10000);
    }

    if (keyLower.includes('email')) {
      return this.generateEmail();
    }

    if (keyLower.includes('phone') || keyLower.includes('mobile') || keyLower.includes('tel')) {
      return this.generatePhone();
    }

    if (keyLower.includes('password')) {
      return this.generatePassword();
    }

    if (keyLower.includes('uuid') || keyLower.includes('guid')) {
      return this.generateUUID();
    }

    if (keyLower === 'name' || keyLower === 'petname' || keyLower.endsWith('name')) {
      if (keyLower.includes('first')) return this.generateFirstName();
      if (keyLower.includes('last')) return this.generateLastName();
      if (keyLower.includes('user')) return this.generateUsername();
      if (keyLower.includes('company') || keyLower.includes('org')) return this.generateCompany();
      if (keyLower.includes('pet') || keyLower === 'name') {
        if (typeof exampleValue === 'string' && exampleValue.toLowerCase().includes('dog')) {
          return this.generatePetName();
        }
        return this.generateItemName();
      }
      return this.generateItemName();
    }

    if (keyLower.includes('url') || keyLower.includes('photo') || keyLower.includes('image') || keyLower.includes('link')) {
      return this.generateImageUrl();
    }

    if (keyLower.includes('status')) {
      if (typeof exampleValue === 'string') {
        const statuses = ['available', 'pending', 'sold', 'active', 'inactive'];
        return this.random(statuses);
      }
      return this.generateStatus();
    }

    if (keyLower.includes('tag')) {
      if (typeof exampleValue === 'string') {
        return this.generateTagName();
      }
      return this.generateTags();
    }

    if (keyLower.includes('category') || keyLower.includes('type')) {
      if (typeof exampleValue === 'string') {
        return this.generateCategoryName();
      }
      return this.generateType(exampleValue);
    }

    if (keyLower.includes('address') || keyLower.includes('street')) {
      return this.generateAddress();
    }

    if (keyLower.includes('city')) {
      return this.generateCity();
    }

    if (keyLower.includes('state') || keyLower.includes('province')) {
      return this.generateState();
    }

    if (keyLower.includes('zip') || keyLower.includes('postal')) {
      return this.generateZipCode();
    }

    if (keyLower.includes('country')) {
      return this.generateCountry();
    }

    if (keyLower.includes('date') || keyLower.includes('time') || keyLower.includes('created') || keyLower.includes('updated')) {
      return this.generateDate(exampleValue);
    }

    if (keyLower.includes('description') || keyLower.includes('bio') || keyLower.includes('about') || keyLower.includes('content')) {
      return this.generateDescription();
    }

    if (keyLower.includes('title') || keyLower.includes('subject')) {
      return this.generateTitle();
    }

    if (keyLower.includes('price') || keyLower.includes('amount') || keyLower.includes('cost')) {
      return this.generatePrice();
    }

    if (keyLower.includes('quantity') || keyLower.includes('count') || keyLower.includes('number')) {
      return this.generateQuantity();
    }

    if (keyLower.includes('active') || keyLower.includes('enabled') || keyLower.startsWith('is')) {
      return typeof exampleValue === 'boolean' ? Math.random() > 0.5 : exampleValue;
    }

    if (keyLower.includes('color') || keyLower.includes('colour')) {
      return this.generateColor();
    }

    if (keyLower.includes('age')) {
      return this.generateAge();
    }

    if (keyLower.includes('rating') || keyLower.includes('score')) {
      return this.generateRating();
    }

    if (keyLower.includes('lat')) {
      return this.generateLatitude();
    }

    if (keyLower.includes('lon') || keyLower.includes('lng')) {
      return this.generateLongitude();
    }

    if (keyLower.includes('ip')) {
      return this.generateIP();
    }

    if (keyLower.includes('token') || keyLower.includes('key') || keyLower.includes('secret')) {
      return this.generateToken();
    }

    return this.generateBasedOnType(exampleValue, key);
  },

  generateBasedOnType(value, key) {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return this.randomInt(1, 1000);
      }
      return parseFloat((Math.random() * 100).toFixed(2));
    }

    if (typeof value === 'boolean') {
      return Math.random() > 0.5;
    }

    if (typeof value === 'string') {
      if (value === 'string' || value === '') {
        return this.generateStringForKey(key);
      }
      return this.generateStringForKey(key);
    }

    return value;
  },

  generateStringForKey(key) {
    const keyLower = (key || '').toLowerCase();

    if (keyLower.includes('url') || keyLower.includes('photo') || keyLower.includes('image')) {
      return this.generateImageUrl();
    }
    if (keyLower.includes('name')) {
      return this.generateItemName();
    }
    if (keyLower.includes('tag')) {
      return this.generateTagName();
    }

    return `sample_${this.randomInt(1000, 9999)}`;
  },

  generateEmail() {
    const names = ['john', 'jane', 'mike', 'sarah', 'alex', 'emma', 'david', 'lisa'];
    const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];
    return `${this.random(names)}${this.randomInt(1, 99)}@${this.random(domains)}`;
  },

  generatePhone() {
    return `+1${this.randomInt(200, 999)}${this.randomInt(100, 999)}${this.randomInt(1000, 9999)}`;
  },

  generatePassword() {
    return `Test@${this.randomInt(1000, 9999)}!Pass`;
  },

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  generateFirstName() {
    const names = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica'];
    return this.random(names);
  },

  generateLastName() {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis', 'Miller', 'Wilson'];
    return this.random(names);
  },

  generateFullName() {
    return `${this.generateFirstName()} ${this.generateLastName()}`;
  },

  generateUsername() {
    return `user_${this.randomInt(1000, 9999)}`;
  },

  generateCompany() {
    const companies = ['Acme Corp', 'Tech Solutions', 'Global Industries', 'Innovative Systems'];
    return this.random(companies);
  },

  generatePetName() {
    const names = ['Buddy', 'Max', 'Charlie', 'Cooper', 'Rocky', 'Bear', 'Duke', 'Tucker', 'Jack', 'Teddy'];
    return this.random(names);
  },

  generateItemName() {
    const items = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Test Item', 'Sample', 'Demo', 'Example'];
    return this.random(items);
  },

  generateCategoryName() {
    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Pets', 'Sports', 'Home', 'Garden'];
    return this.random(categories);
  },

  generateTagName() {
    const tags = ['important', 'featured', 'new', 'sale', 'popular', 'trending', 'hot', 'limited'];
    return this.random(tags);
  },

  generateAddress() {
    return `${this.randomInt(100, 9999)} ${this.random(['Main', 'Oak', 'Maple', 'Cedar'])} ${this.random(['Street', 'Avenue', 'Boulevard', 'Drive'])}`;
  },

  generateCity() {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Seattle', 'Denver', 'Boston'];
    return this.random(cities);
  },

  generateState() {
    const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'];
    return this.random(states);
  },

  generateZipCode() {
    return String(this.randomInt(10000, 99999));
  },

  generateCountry() {
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France'];
    return this.random(countries);
  },

  generateImageUrl() {
    return `https://picsum.photos/seed/${this.randomInt(1, 1000)}/400/300`;
  },

  generateDate(format) {
    const date = new Date();
    date.setDate(date.getDate() - this.randomInt(0, 365));
    if (typeof format === 'string' && (format.includes('T') || format.includes('time'))) {
      return date.toISOString();
    }
    return date.toISOString().split('T')[0];
  },

  generateDescription() {
    const descriptions = [
      'This is a sample description for testing purposes.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'A detailed description that provides context and information.',
      'Test content generated for API testing and development.'
    ];
    return this.random(descriptions);
  },

  generateTitle() {
    const titles = ['Sample Title', 'Test Entry', 'Demo Item', 'Example Record', 'New Project'];
    return this.random(titles);
  },

  generateStatus() {
    const statuses = ['active', 'pending', 'completed', 'inactive', 'processing'];
    return this.random(statuses);
  },

  generateType(example) {
    if (typeof example === 'string' && example !== 'string') {
      return example;
    }
    const types = ['standard', 'premium', 'basic', 'enterprise', 'custom'];
    return this.random(types);
  },

  generatePrice() {
    return parseFloat((Math.random() * 1000).toFixed(2));
  },

  generateQuantity() {
    return this.randomInt(1, 100);
  },

  generateColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33', '#33FFF5'];
    return this.random(colors);
  },

  generateAge() {
    return this.randomInt(18, 80);
  },

  generateRating() {
    return parseFloat((Math.random() * 5).toFixed(1));
  },

  generateLatitude() {
    return parseFloat((Math.random() * 180 - 90).toFixed(6));
  },

  generateLongitude() {
    return parseFloat((Math.random() * 360 - 180).toFixed(6));
  },

  generateIP() {
    return `${this.randomInt(1, 255)}.${this.randomInt(0, 255)}.${this.randomInt(0, 255)}.${this.randomInt(1, 254)}`;
  },

  generateToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  },

  generateTags() {
    const allTags = ['important', 'featured', 'new', 'sale', 'popular', 'trending'];
    const count = this.randomInt(1, 3);
    const tags = [];
    for (let i = 0; i < count; i++) {
      const tag = this.random(allTags);
      if (!tags.includes(tag)) tags.push(tag);
    }
    return tags;
  },

  random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const SwaggerFiller = {
  fillOperation(operation) {
    const results = { body: false, params: false };

    if (operation.bodyEditor) {
      results.body = this.fillBodyEditor(operation.bodyEditor, operation.element);
    }

    if (operation.parameters && operation.parameters.length > 0) {
      results.params = this.fillParameters(operation.parameters);
    }

    return results;
  },

  fillBodyEditor(editor, block) {
    const currentContent = this.getEditorContentValue(editor);

    if (!currentContent) {
      console.log('No content found in editor');
      return false;
    }

    const isXmlContent = currentContent.trim().startsWith('<');
    const isJsonContent = currentContent.trim().startsWith('{') || currentContent.trim().startsWith('[');

    if (isXmlContent) {
      return this.fillWithXmlData(editor, currentContent);
    }

    if (isJsonContent) {
      return this.fillWithJsonData(editor, currentContent);
    }

    return false;
  },

  getEditorContentValue(editor) {
    if (editor.type === 'xml-textarea' || editor.type === 'json-from-schema') {
      return editor.textarea ? editor.textarea.value : null;
    }

    if (editor.type === 'monaco') {
      try {
        if (window.monaco) {
          const editors = window.monaco.editor.getEditors();
          for (const ed of editors) {
            if (editor.container.contains(ed.getDomNode())) {
              return ed.getValue();
            }
          }
        }
        const textarea = editor.container.querySelector('textarea');
        if (textarea) return textarea.value;
      } catch (e) {}
      return null;
    }

    if (editor.type === 'ace') {
      try {
        if (window.ace && editor.container.id) {
          return window.ace.edit(editor.container.id).getValue();
        }
      } catch (e) {}
      return null;
    }

    if (editor.tagName === 'TEXTAREA' || editor instanceof HTMLTextAreaElement) {
      return editor.value;
    }

    return null;
  },

  fillWithJsonData(editor, currentContent) {
    let parsedSchema;
    try {
      parsedSchema = JSON.parse(currentContent);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return false;
    }

    const generatedData = SwaggerDataGenerator.generateFromStructure(parsedSchema);
    const jsonString = JSON.stringify(generatedData, null, 2);

    return this.setEditorValue(editor, jsonString);
  },

  fillWithXmlData(editor, currentContent) {
    const schema = this.parseXmlToJsonStructure(currentContent);

    if (!schema) {
      console.log('Failed to parse XML schema');
      return false;
    }

    const generatedData = SwaggerDataGenerator.generateFromStructure(schema);
    const rootTag = this.extractXmlRootTag(currentContent);
    const xmlString = this.jsonToXml(generatedData, rootTag);

    return this.setEditorValue(editor, xmlString);
  },

  setEditorValue(editor, value) {
    if (editor.type === 'xml-textarea' || editor.type === 'json-from-schema') {
      return this.fillTextarea(editor.textarea, value);
    }

    if (editor.type === 'monaco') {
      return this.fillMonacoEditor(editor.container, value);
    }

    if (editor.type === 'ace') {
      return this.fillAceEditor(editor.container, value);
    }

    if (editor.tagName === 'TEXTAREA' || editor instanceof HTMLTextAreaElement) {
      return this.fillTextarea(editor, value);
    }

    return false;
  },

  fillJsonFromSchema(editor) {
    const { textarea, jsonSchema } = editor;

    let schema = jsonSchema;

    if (!schema) {
      const xmlContent = (textarea.value || '').trim();
      if (xmlContent.startsWith('<')) {
        schema = this.parseXmlToJsonStructure(xmlContent);
      }
    }

    if (!schema) {
      console.log('No schema found');
      return false;
    }

    const generatedData = SwaggerDataGenerator.generateFromStructure(schema);
    const jsonString = JSON.stringify(generatedData, null, 2);

    return this.fillTextarea(textarea, jsonString);
  },

  parseXmlToJsonStructure(xml) {
    try {
      const cleanXml = xml.replace(/<\?xml[^?]*\?>\s*/gi, '').trim();
      return this.xmlNodeToJson(cleanXml);
    } catch (e) {
      console.error('Failed to parse XML:', e);
      return null;
    }
  },

  xmlNodeToJson(xml) {
    const rootMatch = xml.match(/^<([A-Za-z][A-Za-z0-9_]*)([^>]*)>([\s\S]*)<\/\1>$/);
    if (!rootMatch) {
      const selfClosing = xml.match(/^<([A-Za-z][A-Za-z0-9_]*)([^/]*)\/?>$/);
      if (selfClosing) {
        return {};
      }
      return xml.trim();
    }

    const [, tagName, , innerContent] = rootMatch;
    const content = innerContent.trim();

    if (!content.includes('<')) {
      return this.parseXmlValue(content, tagName);
    }

    const result = {};
    const childPattern = /<([A-Za-z][A-Za-z0-9_]*)(?:[^>]*)>[\s\S]*?<\/\1>|<([A-Za-z][A-Za-z0-9_]*)(?:[^/]*)\/>/g;
    let match;
    const children = [];

    while ((match = childPattern.exec(content)) !== null) {
      children.push(match[0]);
    }

    const tagCounts = {};
    for (const child of children) {
      const childTagMatch = child.match(/^<([A-Za-z][A-Za-z0-9_]*)/);
      if (childTagMatch) {
        const childTag = childTagMatch[1];
        tagCounts[childTag] = (tagCounts[childTag] || 0) + 1;
      }
    }

    const processedTags = {};
    for (const child of children) {
      const childTagMatch = child.match(/^<([A-Za-z][A-Za-z0-9_]*)/);
      if (!childTagMatch) continue;

      const childTag = childTagMatch[1];
      const childValue = this.xmlNodeToJson(child);
      const jsonKey = childTag.charAt(0).toLowerCase() + childTag.slice(1);

      if (tagCounts[childTag] > 1 || this.isLikelyArrayTag(childTag, tagName)) {
        if (!result[jsonKey]) {
          result[jsonKey] = [];
        }
        result[jsonKey].push(childValue);
      } else if (processedTags[childTag]) {
        if (!Array.isArray(result[jsonKey])) {
          result[jsonKey] = [result[jsonKey]];
        }
        result[jsonKey].push(childValue);
      } else {
        result[jsonKey] = childValue;
        processedTags[childTag] = true;
      }
    }

    return result;
  },

  isLikelyArrayTag(childTag, parentTag) {
    const parentLower = parentTag.toLowerCase();
    const childLower = childTag.toLowerCase();

    if (parentLower.endsWith('s') && !parentLower.endsWith('ss')) {
      const singular = parentLower.slice(0, -1);
      if (childLower === singular || childLower.includes(singular)) {
        return true;
      }
    }

    if (parentLower === 'photourls' && childLower === 'photourl') return true;
    if (parentLower === 'tags' && childLower === 'tag') return true;

    return false;
  },

  parseXmlValue(value, tagName) {
    const trimmed = value.trim();
    const tagLower = tagName.toLowerCase();

    if (trimmed === '' || trimmed === 'string') {
      return tagLower;
    }

    if (trimmed === '0' || /^\d+$/.test(trimmed)) {
      return tagLower.includes('id') ? 0 : parseInt(trimmed, 10);
    }

    if (trimmed === 'true' || trimmed === 'false') {
      return trimmed === 'true';
    }

    return trimmed;
  },

  fillXmlTextarea(editor) {
    const { textarea, jsonSchema } = editor;
    const currentXml = (textarea.value || '').trim();

    let schema = jsonSchema;
    if (!schema && currentXml.startsWith('<')) {
      schema = this.parseXmlToJsonStructure(currentXml);
    }

    if (!schema) {
      console.log('No schema found for XML conversion');
      return false;
    }

    const generatedData = SwaggerDataGenerator.generateFromStructure(schema);
    const rootTag = this.extractXmlRootTag(currentXml);
    const xmlString = this.jsonToXml(generatedData, rootTag);

    return this.fillTextarea(textarea, xmlString);
  },

  extractXmlRootTag(xml) {
    const match = xml.match(/<([A-Za-z][A-Za-z0-9]*)/);
    if (match && match[1] !== '?xml') {
      return match[1];
    }
    return 'root';
  },

  jsonToXml(obj, rootTag = 'root', indent = '') {
    const lines = ['<?xml version="1.0" encoding="UTF-8"?>'];
    lines.push(this.objectToXml(obj, rootTag, ''));
    return lines.join('\n');
  },

  objectToXml(obj, tagName, indent) {
    if (obj === null || obj === undefined) {
      return `${indent}<${tagName}></${tagName}>`;
    }

    if (Array.isArray(obj)) {
      const singularTag = tagName.endsWith('s') ? tagName.slice(0, -1) : tagName;
      const items = obj.map(item => this.objectToXml(item, this.capitalizeFirst(singularTag), indent + '\t')).join('\n');
      return `${indent}<${tagName}>\n${items}\n${indent}</${tagName}>`;
    }

    if (typeof obj === 'object') {
      const children = Object.entries(obj).map(([key, value]) => {
        const xmlTag = this.capitalizeFirst(key);
        return this.objectToXml(value, xmlTag, indent + '\t');
      }).join('\n');
      return `${indent}<${tagName}>\n${children}\n${indent}</${tagName}>`;
    }

    return `${indent}<${tagName}>${this.escapeXml(String(obj))}</${tagName}>`;
  },

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  escapeXml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  },

  fillTextarea(textarea, value) {
    try {
      textarea.focus();
      textarea.select();
      textarea.value = value;

      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      textarea.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

      const inputEvent = new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertText',
        data: value
      });
      textarea.dispatchEvent(inputEvent);

      return true;
    } catch (e) {
      console.error('Error filling textarea:', e);
      return false;
    }
  },

  fillMonacoEditor(container, value) {
    try {
      if (window.monaco) {
        const editors = window.monaco.editor.getEditors();
        for (const editor of editors) {
          if (container.contains(editor.getDomNode())) {
            editor.setValue(value);
            return true;
          }
        }
      }

      const textarea = container.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, value);
        return true;
      }
    } catch (e) {
      console.error('Error filling Monaco editor:', e);
    }
    return false;
  },

  fillAceEditor(container, value) {
    try {
      const editorId = container.id;
      if (window.ace && editorId) {
        const editor = window.ace.edit(editorId);
        editor.setValue(value, -1);
        return true;
      }
    } catch (e) {
      console.error('Error filling Ace editor:', e);
    }
    return false;
  },

  fillParameters(parameters) {
    let filled = 0;

    for (const param of parameters) {
      if (param.element) {
        const value = SwaggerDataGenerator.generateValueForKeyAndType(param.name, param.type);

        if (param.element.tagName === 'SELECT') {
          this.fillSelect(param.element);
          filled++;
        } else if (param.element.tagName === 'INPUT' || param.element.tagName === 'TEXTAREA') {
          param.element.value = String(value);
          param.element.dispatchEvent(new Event('input', { bubbles: true }));
          param.element.dispatchEvent(new Event('change', { bubbles: true }));
          filled++;
        }
      }
    }

    return filled > 0;
  },

  fillSelect(select) {
    if (this.isContentTypeDropdown(select)) {
      return;
    }

    const options = select.querySelectorAll('option');
    if (options.length > 1) {
      const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
      select.selectedIndex = randomIndex;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },

  isContentTypeDropdown(select) {
    const ariaLabel = (select.getAttribute('aria-label') || '').toLowerCase();
    if (ariaLabel.includes('content') || ariaLabel.includes('media')) {
      return true;
    }

    const options = Array.from(select.options);
    const hasJsonOption = options.some(opt =>
      opt.value.toLowerCase().includes('json') ||
      opt.value.toLowerCase().includes('application/')
    );
    const hasXmlOption = options.some(opt =>
      opt.value.toLowerCase().includes('xml')
    );

    if (hasJsonOption && hasXmlOption) {
      return true;
    }

    const parent = select.closest('.body-param, .content-type, .body-param-content-type');
    if (parent) {
      return true;
    }

    return false;
  },

  fillAllExpandedOperations() {
    const operations = SwaggerDetector.getExpandedOperations();
    const results = [];

    for (const op of operations) {
      const result = this.fillOperation(op);
      results.push({
        path: op.path,
        method: op.method,
        filled: result.body || result.params
      });
    }

    return results;
  }
};

if (typeof window !== 'undefined') {
  window.SwaggerDetector = SwaggerDetector;
  window.SwaggerDataGenerator = SwaggerDataGenerator;
  window.SwaggerFiller = SwaggerFiller;
}
