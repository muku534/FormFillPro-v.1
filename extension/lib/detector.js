const FieldDetector = {
  patterns: {
    email: {
      attributes: ['email', 'e-mail', 'mail'],
      types: ['email'],
      autocomplete: ['email', 'username']
    },
    password: {
      attributes: ['password', 'passwd', 'pwd', 'pass'],
      types: ['password'],
      autocomplete: ['current-password', 'new-password']
    },
    confirmPassword: {
      attributes: ['confirm', 'verify', 'retype', 'repeat'],
      types: ['password'],
      autocomplete: ['new-password']
    },
    firstName: {
      attributes: ['firstname', 'first-name', 'first_name', 'fname', 'given-name', 'givenname'],
      types: ['text'],
      autocomplete: ['given-name']
    },
    lastName: {
      attributes: ['lastname', 'last-name', 'last_name', 'lname', 'surname', 'family-name', 'familyname'],
      types: ['text'],
      autocomplete: ['family-name']
    },
    fullName: {
      attributes: ['fullname', 'full-name', 'full_name', 'name', 'displayname'],
      types: ['text'],
      autocomplete: ['name']
    },
    phone: {
      attributes: ['phone', 'telephone', 'tel', 'mobile', 'cell', 'phonenumber'],
      types: ['tel', 'text'],
      autocomplete: ['tel', 'tel-national']
    },
    address: {
      attributes: ['address', 'street', 'address1', 'address-line-1', 'streetaddress'],
      types: ['text'],
      autocomplete: ['street-address', 'address-line1']
    },
    address2: {
      attributes: ['address2', 'apt', 'suite', 'unit', 'address-line-2'],
      types: ['text'],
      autocomplete: ['address-line2']
    },
    city: {
      attributes: ['city', 'town', 'locality'],
      types: ['text'],
      autocomplete: ['address-level2']
    },
    state: {
      attributes: ['state', 'province', 'region'],
      types: ['text', 'select'],
      autocomplete: ['address-level1']
    },
    zipCode: {
      attributes: ['zip', 'zipcode', 'postal', 'postalcode', 'postcode'],
      types: ['text'],
      autocomplete: ['postal-code']
    },
    country: {
      attributes: ['country', 'nation'],
      types: ['text', 'select'],
      autocomplete: ['country', 'country-name']
    },
    username: {
      attributes: ['username', 'user-name', 'user_name', 'userid', 'login'],
      types: ['text'],
      autocomplete: ['username']
    },
    company: {
      attributes: ['company', 'organization', 'org', 'employer', 'business'],
      types: ['text'],
      autocomplete: ['organization']
    },
    jobTitle: {
      attributes: ['jobtitle', 'job-title', 'job_title', 'title', 'position', 'role', 'occupation'],
      types: ['text'],
      autocomplete: ['organization-title']
    },
    website: {
      attributes: ['website', 'url', 'web', 'homepage', 'site'],
      types: ['url', 'text'],
      autocomplete: ['url']
    },
    birthDate: {
      attributes: ['birthdate', 'birth-date', 'birth_date', 'dob', 'dateofbirth', 'birthday'],
      types: ['date', 'text'],
      autocomplete: ['bday']
    },
    age: {
      attributes: ['age'],
      types: ['number', 'text'],
      autocomplete: []
    },
    gender: {
      attributes: ['gender', 'sex'],
      types: ['select', 'radio'],
      autocomplete: ['sex']
    },
    creditCard: {
      attributes: ['creditcard', 'credit-card', 'cardnumber', 'card-number', 'ccnumber', 'ccnum'],
      types: ['text'],
      autocomplete: ['cc-number']
    },
    cvv: {
      attributes: ['cvv', 'cvc', 'securitycode', 'security-code', 'csc'],
      types: ['text', 'number'],
      autocomplete: ['cc-csc']
    },
    expirationDate: {
      attributes: ['expiration', 'expiry', 'exp-date', 'expdate', 'cc-exp'],
      types: ['text', 'month'],
      autocomplete: ['cc-exp']
    },
    expirationMonth: {
      attributes: ['exp-month', 'expmonth', 'expirationmonth'],
      types: ['text', 'select', 'number'],
      autocomplete: ['cc-exp-month']
    },
    expirationYear: {
      attributes: ['exp-year', 'expyear', 'expirationyear'],
      types: ['text', 'select', 'number'],
      autocomplete: ['cc-exp-year']
    },
    ssn: {
      attributes: ['ssn', 'social-security', 'socialsecurity', 'social'],
      types: ['text'],
      autocomplete: []
    },
    message: {
      attributes: ['message', 'comment', 'comments', 'description', 'bio', 'about', 'notes'],
      types: ['textarea'],
      autocomplete: []
    },
    search: {
      attributes: ['search', 'query', 'q', 'keyword'],
      types: ['search', 'text'],
      autocomplete: []
    },
    // Work Experience fields - marked with isWorkExp for container-based indexing
    workExpTitle: {
      attributes: ['jobtitle', 'job-title', 'job_title', 'position', 'role', 'title'],
      types: ['text'],
      autocomplete: ['organization-title'],
      isWorkExp: true
    },
    workExpCompany: {
      attributes: ['company', 'employer', 'organization', 'business', 'firm'],
      types: ['text'],
      autocomplete: ['organization'],
      isWorkExp: true
    },
    workExpLocation: {
      attributes: ['location', 'city', 'office'],
      types: ['text'],
      autocomplete: [],
      isWorkExp: true
    },
    workExpStartDate: {
      attributes: ['startdate', 'start-date', 'from', 'begin', 'since'],
      types: ['text', 'date', 'month'],
      autocomplete: [],
      isWorkExp: true
    },
    workExpEndDate: {
      attributes: ['enddate', 'end-date', 'to', 'until', 'through'],
      types: ['text', 'date', 'month'],
      autocomplete: [],
      isWorkExp: true
    },
    workExpDescription: {
      attributes: ['description', 'responsibilities', 'duties', 'accomplishments', 'summary'],
      types: ['textarea'],
      autocomplete: [],
      isWorkExp: true
    },
    // Education fields - marked with isEdu for container-based indexing
    eduSchool: {
      attributes: ['school', 'university', 'college', 'institution', 'academy'],
      types: ['text'],
      autocomplete: ['organization'],
      isEdu: true
    },
    eduDegree: {
      attributes: ['degree', 'qualification', 'diploma', 'certification'],
      types: ['text', 'select'],
      autocomplete: [],
      isEdu: true
    },
    eduField: {
      attributes: ['field', 'major', 'study', 'discipline', 'subject', 'specialization'],
      types: ['text'],
      autocomplete: [],
      isEdu: true
    },
    eduGradYear: {
      attributes: ['gradyear', 'graduation', 'completed', 'finished'],
      types: ['text', 'number', 'select'],
      autocomplete: [],
      isEdu: true
    },
    eduStartDate: {
      attributes: ['edustart', 'edu-start', 'edu_start'],
      types: ['text', 'date', 'month'],
      autocomplete: [],
      isEdu: true
    },
    eduEndDate: {
      attributes: ['eduend', 'edu-end', 'edu_end'],
      types: ['text', 'date', 'month'],
      autocomplete: [],
      isEdu: true
    }
  },

  getFieldAttributes(element) {
    const attrs = {
      id: (element.id || '').toLowerCase(),
      name: (element.name || '').toLowerCase(),
      type: (element.type || '').toLowerCase(),
      placeholder: (element.placeholder || '').toLowerCase(),
      autocomplete: (element.autocomplete || '').toLowerCase(),
      className: (element.className || '').toLowerCase(),
      ariaLabel: (element.getAttribute('aria-label') || '').toLowerCase(),
      dataTestId: (element.getAttribute('data-testid') || '').toLowerCase(),
      label: ''
    };

    const labelElement = this.findAssociatedLabel(element);
    if (labelElement) {
      attrs.label = labelElement.textContent.toLowerCase().trim();
    }

    return attrs;
  },

  findAssociatedLabel(element) {
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) return label;
    }

    const parentLabel = element.closest('label');
    if (parentLabel) return parentLabel;

    const parent = element.parentElement;
    if (parent) {
      const siblingLabel = parent.querySelector('label');
      if (siblingLabel) return siblingLabel;

      const prevSibling = element.previousElementSibling;
      if (prevSibling) {
        if (prevSibling.tagName === 'LABEL') return prevSibling;
        const nestedLabel = prevSibling.querySelector('label');
        if (nestedLabel) return nestedLabel;
      }
    }

    const wrapper = element.closest('.form-group, .form-field, .field, .input-group, [class*="form"], [class*="field"], [class*="input"]');
    if (wrapper) {
      const wrapperLabel = wrapper.querySelector('label');
      if (wrapperLabel) return wrapperLabel;

      const textElements = wrapper.querySelectorAll('span, div, p');
      for (const el of textElements) {
        const text = el.textContent.trim().toLowerCase();
        if (text && text.length < 50 && !el.querySelector('input, select, textarea')) {
          return el;
        }
      }
    }

    let prev = element.previousElementSibling;
    let attempts = 0;
    while (prev && attempts < 3) {
      if (prev.tagName === 'LABEL') return prev;
      const text = prev.textContent.trim();
      if (text && text.length < 50 && !prev.querySelector('input, select, textarea')) {
        return prev;
      }
      prev = prev.previousElementSibling;
      attempts++;
    }

    return null;
  },

  stateNames: [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
    'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
    'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
    'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire',
    'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio',
    'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina', 'south dakota',
    'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west virginia',
    'wisconsin', 'wyoming'
  ],

  stateAbbreviations: [
    'al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in',
    'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv',
    'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn',
    'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'
  ],

  detectSelectFieldByOptions(selectElement) {
    const options = Array.from(selectElement.options);
    if (options.length < 3) return null;

    const optionTexts = options.map(opt => opt.text.toLowerCase().trim());
    const optionValues = options.map(opt => opt.value.toLowerCase().trim());

    let stateMatches = 0;
    for (const text of optionTexts) {
      if (this.stateNames.includes(text) || this.stateAbbreviations.includes(text)) {
        stateMatches++;
      }
    }
    for (const val of optionValues) {
      if (this.stateAbbreviations.includes(val)) {
        stateMatches++;
      }
    }
    if (stateMatches >= 3) return 'state';

    const countryKeywords = ['united states', 'united kingdom', 'canada', 'australia', 'germany', 'france', 'usa', 'uk'];
    let countryMatches = 0;
    for (const text of optionTexts) {
      if (countryKeywords.some(k => text.includes(k))) {
        countryMatches++;
      }
    }
    if (countryMatches >= 2 || options.length > 50) {
      const hasCountryLikeOptions = optionTexts.some(t =>
        countryKeywords.some(k => t.includes(k)) ||
        t.length > 3 && t.length < 30
      );
      if (hasCountryLikeOptions && countryMatches >= 1) return 'country';
    }

    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let monthMatches = optionTexts.filter(t => months.includes(t)).length;
    if (monthMatches >= 6) return 'expirationMonth';

    const currentYear = new Date().getFullYear();
    let yearMatches = optionValues.filter(v => {
      const num = parseInt(v);
      return num >= currentYear - 5 && num <= currentYear + 20;
    }).length;
    if (yearMatches >= 5) return 'expirationYear';

    return null;
  },

  detectFieldType(element) {
    const attrs = this.getFieldAttributes(element);
    const searchString = `${attrs.id} ${attrs.name} ${attrs.placeholder} ${attrs.className} ${attrs.ariaLabel} ${attrs.dataTestId} ${attrs.label}`;

    if (attrs.autocomplete) {
      for (const [fieldType, pattern] of Object.entries(this.patterns)) {
        if (pattern.autocomplete.includes(attrs.autocomplete)) {
          // Check if there's a prioritized version (work or edu) that also matches
          if (!pattern.isWorkExp && !pattern.isEdu) {
            const priorityMatch = this.findPriorityMatch(searchString);
            if (priorityMatch) return priorityMatch;
          }
          return fieldType;
        }
      }
    }

    if (attrs.type === 'email') return 'email';
    if (attrs.type === 'password') {
      if (this.matchesPattern(searchString, this.patterns.confirmPassword.attributes)) {
        return 'confirmPassword';
      }
      return 'password';
    }
    if (attrs.type === 'tel') return 'phone';
    if (attrs.type === 'url') return 'website';
    if (attrs.type === 'date' && this.matchesPattern(searchString, this.patterns.birthDate.attributes)) {
      return 'birthDate';
    }

    // PRIORITY: Check prioritized patterns FIRST (work experience or education)
    // This ensures specialized fields win over generic attributes (e.g. eduSchool over company)
    const priorityMatch = this.findPriorityMatch(searchString);
    if (priorityMatch) {
      return priorityMatch;
    }

    // Then check regular patterns
    for (const [fieldType, pattern] of Object.entries(this.patterns)) {
      if (pattern.isWorkExp || pattern.isEdu) continue; // Skip - already checked above
      if (this.matchesPattern(searchString, pattern.attributes)) {
        return fieldType;
      }
    }

    if (element.tagName.toLowerCase() === 'select') {
      const detectedByOptions = this.detectSelectFieldByOptions(element);
      if (detectedByOptions) return detectedByOptions;
    }

    if (element.tagName.toLowerCase() === 'textarea') {
      return 'message';
    }

    return 'text';
  },

  matchesWordBoundary(searchString, patterns) {
    const words = searchString.toLowerCase().split(/[\s_\-.,]+/);
    return patterns.some(pattern => {
      const patternLower = pattern.toLowerCase();
      if (words.includes(patternLower)) return true;
      if (searchString.toLowerCase().includes(patternLower)) {
        const regex = new RegExp(`(^|[^a-z])${patternLower}([^a-z]|$)`, 'i');
        return regex.test(searchString);
      }
      return false;
    });
  },

  // Find matching prioritized pattern (work experience or education)
  findPriorityMatch(searchString) {
    for (const [fieldType, pattern] of Object.entries(this.patterns)) {
      if (!pattern.isWorkExp && !pattern.isEdu) continue;
      if (this.matchesWordBoundary(searchString, pattern.attributes)) {
        return fieldType;
      }
    }
    return null;
  },

  matchesPattern(searchString, patterns) {
    return patterns.some(pattern => searchString.includes(pattern.toLowerCase()));
  },

  analyzeForm(form) {
    const fields = [];
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach((input, index) => {
      if (this.shouldSkipField(input)) return;

      const fieldType = this.detectFieldType(input);
      const attrs = this.getFieldAttributes(input);
      // Check if this field type is a work experience or education field
      const pattern = this.patterns[fieldType] || {};
      const isWorkExp = !!pattern.isWorkExp;
      const isEdu = !!pattern.isEdu;

      fields.push({
        index,
        element: input,
        tagName: input.tagName.toLowerCase(),
        type: input.type || 'text',
        detectedType: fieldType,
        isWorkExp: isWorkExp,
        isEdu: isEdu,
        id: input.id,
        name: input.name,
        label: attrs.label,
        required: input.required,
        value: input.value,
        options: input.tagName.toLowerCase() === 'select' ? this.getSelectOptions(input) : null
      });
    });

    return fields;
  },

  shouldSkipField(input) {
    const skipTypes = ['hidden', 'submit', 'button', 'reset', 'image', 'file'];
    if (skipTypes.includes(input.type)) return true;

    const style = window.getComputedStyle(input);
    if (style.display === 'none' || style.visibility === 'hidden') return true;

    if (input.disabled || input.readOnly) return true;

    return false;
  },

  getSelectOptions(select) {
    return Array.from(select.options).map(option => ({
      value: option.value,
      text: option.text
    }));
  },

  findAllForms() {
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
      return Array.from(forms);
    }

    const orphanInputs = document.querySelectorAll('input:not(form input), select:not(form select), textarea:not(form textarea)');
    if (orphanInputs.length > 0) {
      return [{ orphan: true, elements: orphanInputs }];
    }

    return [];
  },

  getAllFields() {
    const allFields = [];
    const forms = this.findAllForms();

    forms.forEach((form, formIndex) => {
      if (form.orphan) {
        form.elements.forEach((element, fieldIndex) => {
          if (this.shouldSkipField(element)) return;
          allFields.push({
            formIndex,
            fieldIndex,
            element,
            ...this.analyzeField(element)
          });
        });
      } else {
        const fields = this.analyzeForm(form);
        fields.forEach(field => {
          allFields.push({
            formIndex,
            ...field
          });
        });
      }
    });

    return allFields;
  },

  analyzeField(element) {
    const fieldType = this.detectFieldType(element);
    const attrs = this.getFieldAttributes(element);
    // Check if this field type is a work experience or education field
    const pattern = this.patterns[fieldType] || {};
    const isWorkExp = !!pattern.isWorkExp;
    const isEdu = !!pattern.isEdu;

    return {
      tagName: element.tagName.toLowerCase(),
      type: element.type || 'text',
      detectedType: fieldType,
      isWorkExp: isWorkExp,
      isEdu: isEdu,
      id: element.id,
      name: element.name,
      label: attrs.label,
      required: element.required,
      value: element.value,
      options: element.tagName.toLowerCase() === 'select' ? this.getSelectOptions(element) : null
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FieldDetector;
}
