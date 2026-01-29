const FieldMapper = {
  commonAliases: {
    'firstname': ['first_name', 'fname', 'given_name', 'givenname', 'first'],
    'lastname': ['last_name', 'lname', 'family_name', 'familyname', 'surname', 'last'],
    'fullname': ['full_name', 'name', 'your_name', 'yourname', 'complete_name'],
    'email': ['email_address', 'emailaddress', 'e_mail', 'mail', 'user_email', 'useremail'],
    'phone': ['phone_number', 'phonenumber', 'telephone', 'tel', 'mobile', 'cell', 'contact_number'],
    'address': ['street_address', 'streetaddress', 'address_line_1', 'addressline1', 'street'],
    'address2': ['address_line_2', 'addressline2', 'apt', 'suite', 'unit'],
    'city': ['town', 'locality'],
    'state': ['province', 'region', 'state_province'],
    'zip': ['zipcode', 'zip_code', 'postal_code', 'postalcode', 'postcode'],
    'country': ['nation', 'country_code'],
    'company': ['company_name', 'companyname', 'organization', 'org', 'business', 'employer'],
    'jobtitle': ['job_title', 'title', 'position', 'role', 'designation'],
    'website': ['url', 'site', 'homepage', 'web'],
    'username': ['user_name', 'user', 'login', 'account', 'handle'],
    'password': ['pass', 'pwd', 'secret'],
    'dob': ['date_of_birth', 'dateofbirth', 'birthdate', 'birth_date', 'birthday'],
    'age': ['years_old'],
    'gender': ['sex'],
    'message': ['comment', 'comments', 'description', 'note', 'notes', 'feedback', 'body', 'content'],
    'subject': ['topic', 'title', 'regarding'],
    'cardnumber': ['card_number', 'cc_number', 'ccnumber', 'credit_card'],
    'cvv': ['cvc', 'security_code', 'securitycode', 'card_code'],
    'expiry': ['expiration', 'exp_date', 'expdate', 'card_expiry'],
    'amount': ['price', 'total', 'cost', 'value', 'sum'],
    'quantity': ['qty', 'count', 'number'],
    'id': ['identifier', 'code', 'reference', 'ref'],
    'status': ['state', 'condition'],
    'category': ['cat', 'type', 'group', 'classification'],
    'tags': ['tag', 'labels', 'keywords']
  },

  normalize(str) {
    return (str || '')
      .toLowerCase()
      .trim()
      .replace(/[\s_\-\.]+/g, '')
      .replace(/[^a-z0-9]/g, '');
  },

  getFieldIdentifiers(element) {
    const identifiers = new Set();

    const attrs = ['name', 'id', 'placeholder', 'aria-label', 'data-field', 'data-name'];
    attrs.forEach(attr => {
      const value = element.getAttribute(attr);
      if (value) {
        identifiers.add(this.normalize(value));
        identifiers.add(value.toLowerCase().trim());
      }
    });

    const label = this.findLabelForElement(element);
    if (label) {
      identifiers.add(this.normalize(label));
      identifiers.add(label.toLowerCase().trim());
    }

    const autocomplete = element.getAttribute('autocomplete');
    if (autocomplete && autocomplete !== 'off') {
      identifiers.add(this.normalize(autocomplete));
    }

    return Array.from(identifiers).filter(id => id.length > 0);
  },

  findLabelForElement(element) {
    const id = element.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) {
        return label.textContent.replace(/[*:]/g, '').trim();
      }
    }

    const parentLabel = element.closest('label');
    if (parentLabel) {
      const clone = parentLabel.cloneNode(true);
      clone.querySelectorAll('input, select, textarea').forEach(el => el.remove());
      return clone.textContent.replace(/[*:]/g, '').trim();
    }

    const wrapper = element.closest('.form-group, .field, .input-group, [class*="field"], [class*="input"]');
    if (wrapper) {
      const label = wrapper.querySelector('label, .label, [class*="label"]');
      if (label) {
        return label.textContent.replace(/[*:]/g, '').trim();
      }
    }

    const prev = element.previousElementSibling;
    if (prev && (prev.tagName === 'LABEL' || prev.classList.contains('label'))) {
      return prev.textContent.replace(/[*:]/g, '').trim();
    }

    return null;
  },

  findBestMatch(fieldIdentifiers, dataHeaders) {
    const normalizedHeaders = dataHeaders.map(h => ({
      original: h,
      normalized: this.normalize(h)
    }));

    for (const identifier of fieldIdentifiers) {
      const normalized = this.normalize(identifier);

      for (const header of normalizedHeaders) {
        if (header.normalized === normalized) {
          return header.original;
        }
      }
    }

    for (const identifier of fieldIdentifiers) {
      const normalized = this.normalize(identifier);

      for (const [canonical, aliases] of Object.entries(this.commonAliases)) {
        const allVariants = [canonical, ...aliases];
        const identifierMatches = allVariants.some(v => this.normalize(v) === normalized);

        if (identifierMatches) {
          for (const header of normalizedHeaders) {
            if (allVariants.some(v => this.normalize(v) === header.normalized)) {
              return header.original;
            }
          }
        }
      }
    }

    for (const identifier of fieldIdentifiers) {
      const normalized = this.normalize(identifier);

      for (const header of normalizedHeaders) {
        if (header.normalized.includes(normalized) || normalized.includes(header.normalized)) {
          if (normalized.length >= 3 && header.normalized.length >= 3) {
            return header.original;
          }
        }
      }
    }

    for (const identifier of fieldIdentifiers) {
      for (const header of normalizedHeaders) {
        const similarity = this.calculateSimilarity(identifier, header.original);
        if (similarity > 0.8) {
          return header.original;
        }
      }
    }

    return null;
  },

  calculateSimilarity(str1, str2) {
    const s1 = this.normalize(str1);
    const s2 = this.normalize(str2);

    if (s1 === s2) return 1;
    if (s1.length === 0 || s2.length === 0) return 0;

    const len1 = s1.length;
    const len2 = s2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const maxLen = Math.max(len1, len2);
    return 1 - matrix[len1][len2] / maxLen;
  },

  mapFieldsToData(fields, dataRow, dataHeaders) {
    const mappings = [];

    for (const field of fields) {
      const identifiers = this.getFieldIdentifiers(field.element);
      const matchedHeader = this.findBestMatch(identifiers, dataHeaders);

      if (matchedHeader && dataRow[matchedHeader] !== undefined) {
        mappings.push({
          element: field.element,
          field: field,
          header: matchedHeader,
          value: dataRow[matchedHeader],
          identifiers: identifiers
        });
      }
    }

    return mappings;
  },

  createMappingUI(fields, dataHeaders, currentMappings = {}) {
    const container = document.createElement('div');
    container.className = 'field-mapping-ui';

    for (const field of fields) {
      const identifiers = this.getFieldIdentifiers(field.element);
      const label = identifiers[0] || 'Unknown Field';
      const currentMatch = currentMappings[label] || this.findBestMatch(identifiers, dataHeaders);

      const row = document.createElement('div');
      row.className = 'mapping-row';

      const fieldLabel = document.createElement('span');
      fieldLabel.textContent = label;
      fieldLabel.className = 'field-label';

      const select = document.createElement('select');
      select.className = 'header-select';
      select.dataset.fieldLabel = label;

      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = '-- Skip --';
      select.appendChild(emptyOption);

      for (const header of dataHeaders) {
        const option = document.createElement('option');
        option.value = header;
        option.textContent = header;
        if (header === currentMatch) {
          option.selected = true;
        }
        select.appendChild(option);
      }

      row.appendChild(fieldLabel);
      row.appendChild(select);
      container.appendChild(row);
    }

    return container;
  },

  getMappingsFromUI(container) {
    const mappings = {};
    const selects = container.querySelectorAll('.header-select');

    selects.forEach(select => {
      const fieldLabel = select.dataset.fieldLabel;
      const selectedHeader = select.value;
      if (selectedHeader) {
        mappings[fieldLabel] = selectedHeader;
      }
    });

    return mappings;
  }
};

if (typeof window !== 'undefined') {
  window.FieldMapper = FieldMapper;
}
