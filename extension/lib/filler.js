const FormFiller = {
  lastGeneratedPassword: null,

  getValueForField(fieldType, profile) {
    const valueMap = {
      email: profile.email,
      password: profile.password,
      confirmPassword: profile.password,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName: profile.fullName,
      phone: profile.phone,
      address: profile.address.street,
      address2: '',
      city: profile.address.city,
      state: profile.address.state,
      stateAbbr: profile.address.stateAbbr,
      zipCode: profile.address.zipCode,
      country: profile.address.country,
      username: profile.username,
      company: profile.company,
      jobTitle: profile.jobTitle,
      website: profile.website,
      birthDate: profile.birthDate,
      age: String(profile.age),
      gender: profile.gender,
      creditCard: FakeDataGenerator.creditCard(),
      cvv: FakeDataGenerator.cvv(),
      expirationDate: FakeDataGenerator.expirationDate(),
      expirationMonth: String(FakeDataGenerator.randomInt(1, 12)).padStart(2, '0'),
      expirationYear: String(FakeDataGenerator.randomInt(25, 30)),
      ssn: FakeDataGenerator.ssn(),
      message: FakeDataGenerator.paragraph(),
      search: FakeDataGenerator.sentence(),
      text: FakeDataGenerator.sentence()
    };

    return valueMap[fieldType] || '';
  },

  triggerReactChange(element, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set;

    const setter = element.tagName === 'TEXTAREA' ? nativeTextAreaValueSetter : nativeInputValueSetter;

    if (setter) {
      setter.call(element, value);
    } else {
      element.value = value;
    }

    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    element.dispatchEvent(inputEvent);

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);
  },

  triggerVueChange(element, value) {
    element.value = value;

    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    Object.defineProperty(inputEvent, 'target', { writable: false, value: element });
    element.dispatchEvent(inputEvent);

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    if (element._vei || element.__vueParentComponent) {
      const compositionStart = new CompositionEvent('compositionstart', { bubbles: true });
      const compositionEnd = new CompositionEvent('compositionend', { bubbles: true, data: value });
      element.dispatchEvent(compositionStart);
      element.dispatchEvent(compositionEnd);
    }
  },

  triggerAngularChange(element, value) {
    element.value = value;

    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    element.dispatchEvent(inputEvent);

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    element.dispatchEvent(new Event('blur', { bubbles: true }));
  },

  detectFramework(element) {
    if (element._reactRootContainer || element.__reactFiber$ ||
        document.querySelector('[data-reactroot]') ||
        Object.keys(element).some(key => key.startsWith('__react'))) {
      return 'react';
    }

    if (element.__vue__ || element._vei || element.__vueParentComponent ||
        document.querySelector('[data-v-]')) {
      return 'vue';
    }

    if (element.getAttribute('ng-model') || element.getAttribute('[(ngModel)]') ||
        document.querySelector('[ng-app]') || document.querySelector('[ng-controller]')) {
      return 'angular';
    }

    return 'vanilla';
  },

  setFieldValue(element, value) {
    const framework = this.detectFramework(element);

    element.focus();

    const focusEvent = new FocusEvent('focus', { bubbles: true });
    element.dispatchEvent(focusEvent);

    switch (framework) {
      case 'react':
        this.triggerReactChange(element, value);
        break;
      case 'vue':
        this.triggerVueChange(element, value);
        break;
      case 'angular':
        this.triggerAngularChange(element, value);
        break;
      default:
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const blurEvent = new FocusEvent('blur', { bubbles: true });
    element.dispatchEvent(blurEvent);
  },

  stateMapping: {
    'alabama': 'al', 'alaska': 'ak', 'arizona': 'az', 'arkansas': 'ar', 'california': 'ca',
    'colorado': 'co', 'connecticut': 'ct', 'delaware': 'de', 'florida': 'fl', 'georgia': 'ga',
    'hawaii': 'hi', 'idaho': 'id', 'illinois': 'il', 'indiana': 'in', 'iowa': 'ia',
    'kansas': 'ks', 'kentucky': 'ky', 'louisiana': 'la', 'maine': 'me', 'maryland': 'md',
    'massachusetts': 'ma', 'michigan': 'mi', 'minnesota': 'mn', 'mississippi': 'ms',
    'missouri': 'mo', 'montana': 'mt', 'nebraska': 'ne', 'nevada': 'nv', 'new hampshire': 'nh',
    'new jersey': 'nj', 'new mexico': 'nm', 'new york': 'ny', 'north carolina': 'nc',
    'north dakota': 'nd', 'ohio': 'oh', 'oklahoma': 'ok', 'oregon': 'or', 'pennsylvania': 'pa',
    'rhode island': 'ri', 'south carolina': 'sc', 'south dakota': 'sd', 'tennessee': 'tn',
    'texas': 'tx', 'utah': 'ut', 'vermont': 'vt', 'virginia': 'va', 'washington': 'wa',
    'west virginia': 'wv', 'wisconsin': 'wi', 'wyoming': 'wy'
  },

  getStateVariants(value) {
    const lower = value.toLowerCase();
    const variants = [lower];

    if (this.stateMapping[lower]) {
      variants.push(this.stateMapping[lower]);
    }

    for (const [name, abbr] of Object.entries(this.stateMapping)) {
      if (abbr === lower) {
        variants.push(name);
        break;
      }
    }

    return variants;
  },

  setSelectValue(selectElement, value, fieldType) {
    const options = Array.from(selectElement.options);
    const valueLower = value.toLowerCase();

    let matchedOption = options.find(opt =>
      opt.value.toLowerCase() === valueLower ||
      opt.text.toLowerCase() === valueLower
    );

    if (!matchedOption && (fieldType === 'state' || fieldType === 'stateAbbr')) {
      const variants = this.getStateVariants(value);
      matchedOption = options.find(opt => {
        const optVal = opt.value.toLowerCase();
        const optText = opt.text.toLowerCase();
        return variants.some(v => v === optVal || v === optText);
      });

      if (!matchedOption) {
        matchedOption = options.find(opt => {
          const optVal = opt.value.toLowerCase();
          const optText = opt.text.toLowerCase();
          return variants.some(v => optVal.includes(v) || optText.includes(v) || v.includes(optVal) || v.includes(optText));
        });
      }
    }

    if (!matchedOption) {
      matchedOption = options.find(opt =>
        opt.value.toLowerCase().includes(valueLower) ||
        opt.text.toLowerCase().includes(valueLower) ||
        valueLower.includes(opt.value.toLowerCase()) ||
        valueLower.includes(opt.text.toLowerCase())
      );
    }

    if (!matchedOption && options.length > 1) {
      const nonEmptyOptions = options.filter(opt => opt.value && opt.value.trim() !== '');
      if (nonEmptyOptions.length > 0) {
        matchedOption = nonEmptyOptions[Math.floor(Math.random() * nonEmptyOptions.length)];
      } else {
        matchedOption = options[1];
      }
    }

    if (matchedOption) {
      selectElement.value = matchedOption.value;
      this.triggerReactChange(selectElement, matchedOption.value);
    }
  },

  setCheckboxValue(checkbox, checked = true) {
    checkbox.checked = checked;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    checkbox.dispatchEvent(new Event('input', { bubbles: true }));

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    checkbox.dispatchEvent(clickEvent);
  },

  setRadioValue(radioGroup, value) {
    const radios = Array.from(radioGroup);

    let matchedRadio = radios.find(radio =>
      radio.value.toLowerCase() === value.toLowerCase() ||
      (radio.labels && radio.labels[0]?.textContent.toLowerCase().includes(value.toLowerCase()))
    );

    if (!matchedRadio && radios.length > 0) {
      matchedRadio = radios[0];
    }

    if (matchedRadio) {
      matchedRadio.checked = true;
      matchedRadio.dispatchEvent(new Event('change', { bubbles: true }));
      matchedRadio.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },

  fillField(element, fieldType, profile) {
    const tagName = element.tagName.toLowerCase();
    const inputType = element.type?.toLowerCase();

    if (tagName === 'select') {
      const value = this.getValueForField(fieldType, profile);
      this.setSelectValue(element, value, fieldType);
      return { success: true, value };
    }

    if (inputType === 'checkbox') {
      this.setCheckboxValue(element, true);
      return { success: true, value: 'checked' };
    }

    if (inputType === 'radio') {
      const name = element.name;
      if (name) {
        const radioGroup = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
        const value = this.getValueForField(fieldType, profile);
        this.setRadioValue(radioGroup, value);
        return { success: true, value };
      }
      return { success: false, value: null };
    }

    const value = this.getValueForField(fieldType, profile);
    this.setFieldValue(element, value);
    return { success: true, value };
  },

  fillForm(fields, profile) {
    const results = [];
    const passwordFields = fields.filter(f =>
      f.detectedType === 'password' || f.detectedType === 'confirmPassword'
    );

    if (passwordFields.length > 0) {
      this.lastGeneratedPassword = profile.password;
    }

    fields.forEach((field, index) => {
      setTimeout(() => {
        const result = this.fillField(field.element, field.detectedType, profile);
        results.push({
          field: field.name || field.id || `field-${index}`,
          type: field.detectedType,
          ...result
        });
      }, index * 50);
    });

    return results;
  },

  async fillAllForms(profile) {
    const allFields = FieldDetector.getAllFields();
    if (allFields.length === 0) {
      return { success: false, message: 'No form fields found' };
    }

    const results = this.fillForm(allFields, profile);

    return {
      success: true,
      fieldsCount: allFields.length,
      results
    };
  },

  fillSingleField(element, customValue) {
    if (customValue !== undefined) {
      this.setFieldValue(element, customValue);
      return { success: true, value: customValue };
    }

    const fieldType = FieldDetector.detectFieldType(element);
    const profile = FakeDataGenerator.generateProfile();
    return this.fillField(element, fieldType, profile);
  },

  async applyTemplate(template, profile) {
    const fields = FieldDetector.getAllFields();
    const results = [];

    for (const mapping of template.mappings) {
      const field = fields.find(f =>
        f.id === mapping.fieldId ||
        f.name === mapping.fieldName ||
        f.detectedType === mapping.fieldType
      );

      if (field) {
        let value;
        if (mapping.customValue) {
          value = mapping.customValue;
        } else if (mapping.fakerMethod && FakeDataGenerator[mapping.fakerMethod]) {
          value = FakeDataGenerator[mapping.fakerMethod]();
        } else {
          value = this.getValueForField(mapping.fieldType, profile);
        }

        this.setFieldValue(field.element, value);
        results.push({
          field: mapping.fieldId || mapping.fieldName,
          success: true,
          value
        });
      }
    }

    return results;
  },

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
    'subject': ['topic', 'title', 'regarding']
  },

  normalizeString(str) {
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
        identifiers.add(this.normalizeString(value));
        identifiers.add(value.toLowerCase().trim());
      }
    });

    const label = this.findLabelForElement(element);
    if (label) {
      identifiers.add(this.normalizeString(label));
      identifiers.add(label.toLowerCase().trim());
    }

    const autocomplete = element.getAttribute('autocomplete');
    if (autocomplete && autocomplete !== 'off') {
      identifiers.add(this.normalizeString(autocomplete));
    }

    return Array.from(identifiers).filter(id => id.length > 0);
  },

  findLabelForElement(element) {
    const id = element.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent.replace(/[*:]/g, '').trim();
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
      if (label) return label.textContent.replace(/[*:]/g, '').trim();
    }

    return null;
  },

  findBestMatch(fieldIdentifiers, dataHeaders) {
    const normalizedHeaders = dataHeaders.map(h => ({
      original: h,
      normalized: this.normalizeString(h)
    }));

    for (const identifier of fieldIdentifiers) {
      const normalized = this.normalizeString(identifier);
      for (const header of normalizedHeaders) {
        if (header.normalized === normalized) return header.original;
      }
    }

    for (const identifier of fieldIdentifiers) {
      const normalized = this.normalizeString(identifier);
      for (const [canonical, aliases] of Object.entries(this.commonAliases)) {
        const allVariants = [canonical, ...aliases];
        const identifierMatches = allVariants.some(v => this.normalizeString(v) === normalized);
        if (identifierMatches) {
          for (const header of normalizedHeaders) {
            if (allVariants.some(v => this.normalizeString(v) === header.normalized)) {
              return header.original;
            }
          }
        }
      }
    }

    for (const identifier of fieldIdentifiers) {
      const normalized = this.normalizeString(identifier);
      for (const header of normalizedHeaders) {
        if (header.normalized.includes(normalized) || normalized.includes(header.normalized)) {
          if (normalized.length >= 3 && header.normalized.length >= 3) {
            return header.original;
          }
        }
      }
    }

    return null;
  },

  fillFromImportedData(dataRow, dataHeaders) {
    const allFields = FieldDetector.getAllFields();
    if (allFields.length === 0) {
      return { success: false, message: 'No form fields found' };
    }

    const results = [];

    allFields.forEach((field, index) => {
      setTimeout(() => {
        const element = field.element;
        const identifiers = this.getFieldIdentifiers(element);
        const matchedHeader = this.findBestMatch(identifiers, dataHeaders);

        if (matchedHeader && dataRow[matchedHeader] !== undefined && dataRow[matchedHeader] !== '') {
          const value = String(dataRow[matchedHeader]);
          const tagName = element.tagName.toLowerCase();
          const inputType = element.type?.toLowerCase();

          if (tagName === 'select') {
            this.setSelectValue(element, value, field.detectedType);
          } else if (inputType === 'checkbox') {
            const shouldCheck = value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
            this.setCheckboxValue(element, shouldCheck);
          } else if (inputType === 'radio') {
            const name = element.name;
            if (name) {
              const radioGroup = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
              this.setRadioValue(radioGroup, value);
            }
          } else {
            this.setFieldValue(element, value);
          }

          results.push({
            field: field.name || field.id || `field-${index}`,
            header: matchedHeader,
            value,
            success: true
          });
        }
      }, index * 50);
    });

    return {
      success: true,
      fieldsCount: allFields.length,
      results
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormFiller;
}
