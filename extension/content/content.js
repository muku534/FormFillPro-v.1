const FakeDataGenerator = {
  firstNames: [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
    'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Lisa', 'Daniel', 'Nancy',
    'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa'
  ],

  lastNames: [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
  ],

  streetNames: [
    'Main', 'Oak', 'Cedar', 'Maple', 'Pine', 'Elm', 'Washington', 'Lake', 'Hill',
    'Park', 'River', 'Forest', 'Spring', 'Valley', 'Sunset', 'Highland', 'Meadow'
  ],

  streetTypes: ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Ct'],

  cities: [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle'
  ],

  states: [
    { name: 'California', abbr: 'CA' }, { name: 'Texas', abbr: 'TX' },
    { name: 'Florida', abbr: 'FL' }, { name: 'New York', abbr: 'NY' },
    { name: 'Pennsylvania', abbr: 'PA' }, { name: 'Illinois', abbr: 'IL' },
    { name: 'Ohio', abbr: 'OH' }, { name: 'Georgia', abbr: 'GA' },
    { name: 'North Carolina', abbr: 'NC' }, { name: 'Michigan', abbr: 'MI' }
  ],

  companies: [
    'Acme Corp', 'GlobalTech Solutions', 'Innovate Inc', 'TechVentures', 'DataFlow Systems',
    'CloudScale', 'NextGen Software', 'Digital Dynamics', 'CyberCore', 'FutureTech'
  ],

  domains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'mail.com'],

  jobTitles: [
    'Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer', 'DevOps Engineer',
    'QA Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Project Manager', 'Business Analyst', 'Technical Lead', 'System Administrator'
  ],

  random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  firstName() {
    return this.random(this.firstNames);
  },

  lastName() {
    return this.random(this.lastNames);
  },

  fullName() {
    return `${this.firstName()} ${this.lastName()}`;
  },

  email(firstName, lastName) {
    const fn = (firstName || this.firstName()).toLowerCase();
    const ln = (lastName || this.lastName()).toLowerCase();
    const domain = this.random(this.domains);
    const patterns = [`${fn}.${ln}`, `${fn}${ln}`, `${fn}_${ln}`, `${fn}${this.randomInt(1, 99)}`];
    return `${this.random(patterns)}@${domain}`;
  },

  phone() {
    return `(${this.randomInt(200, 999)}) ${this.randomInt(200, 999)}-${this.randomInt(1000, 9999)}`;
  },

  streetAddress() {
    return `${this.randomInt(100, 9999)} ${this.random(this.streetNames)} ${this.random(this.streetTypes)}`;
  },

  city() {
    return this.random(this.cities);
  },

  state(abbreviated = false) {
    const state = this.random(this.states);
    return abbreviated ? state.abbr : state.name;
  },

  zipCode() {
    return String(this.randomInt(10000, 99999));
  },

  company() {
    return this.random(this.companies);
  },

  jobTitle() {
    return this.random(this.jobTitles);
  },

  username(firstName, lastName) {
    const fn = (firstName || this.firstName()).toLowerCase();
    const ln = (lastName || this.lastName()).toLowerCase();
    const patterns = [`${fn}${ln}`, `${fn}_${ln}`, `${fn}${this.randomInt(1, 999)}`];
    return this.random(patterns);
  },

  password(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.randomInt(0, 25)];
    password += 'abcdefghijklmnopqrstuvwxyz'[this.randomInt(0, 25)];
    password += '0123456789'[this.randomInt(0, 9)];
    password += '!@#$%^&*'[this.randomInt(0, 7)];
    for (let i = 4; i < length; i++) {
      password += chars[this.randomInt(0, chars.length - 1)];
    }
    return password.split('').sort(() => Math.random() - 0.5).join('');
  },

  date(startYear = 1950, endYear = 2005) {
    const year = this.randomInt(startYear, endYear);
    const month = String(this.randomInt(1, 12)).padStart(2, '0');
    const day = String(this.randomInt(1, 28)).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  birthDate() {
    return this.date(1960, 2000);
  },

  creditCard() {
    let num = '4';
    for (let i = 0; i < 15; i++) {
      num += this.randomInt(0, 9);
    }
    return num;
  },

  cvv() {
    return String(this.randomInt(100, 999));
  },

  expirationDate() {
    const month = String(this.randomInt(1, 12)).padStart(2, '0');
    const year = this.randomInt(25, 30);
    return `${month}/${year}`;
  },

  ssn() {
    return `${this.randomInt(100, 999)}-${this.randomInt(10, 99)}-${this.randomInt(1000, 9999)}`;
  },

  website() {
    const tlds = ['.com', '.net', '.org', '.io'];
    const name = this.random(this.companies).toLowerCase().replace(/\s+/g, '');
    return `https://www.${name}${this.random(tlds)}`;
  },

  linkedIn(firstName, lastName) {
    const fn = (firstName || this.firstName()).toLowerCase();
    const ln = (lastName || this.lastName()).toLowerCase();
    return `https://linkedin.com/in/${fn}-${ln}-${this.randomInt(100, 999)}`;
  },

  paragraph() {
    const sentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'
    ];
    return sentences.slice(0, this.randomInt(2, 4)).join(' ');
  },

  sentence() {
    const subjects = ['The developer', 'A user', 'The system', 'An engineer'];
    const verbs = ['creates', 'updates', 'manages', 'processes'];
    const objects = ['data efficiently', 'forms automatically', 'tests quickly'];
    return `${this.random(subjects)} ${this.random(verbs)} ${this.random(objects)}.`;
  },

  subject() {
    const subjects = [
      'General Inquiry',
      'Product Question',
      'Support Request',
      'Feedback',
      'Partnership Opportunity',
      'Technical Issue',
      'Feature Request',
      'Account Question',
      'Billing Inquiry',
      'Service Information'
    ];
    return this.random(subjects);
  },

  age(min = 18, max = 80) {
    return this.randomInt(min, max);
  },

  gender() {
    return this.random(['Male', 'Female', 'Other', 'Prefer not to say']);
  },

  country() {
    return this.random(['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France']);
  },

  generateProfile() {
    const firstName = this.firstName();
    const lastName = this.lastName();
    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: this.email(firstName, lastName),
      phone: this.phone(),
      username: this.username(firstName, lastName),
      password: this.password(),
      birthDate: this.birthDate(),
      age: this.age(),
      gender: this.gender(),
      address: {
        street: this.streetAddress(),
        city: this.city(),
        state: this.state(),
        stateAbbr: this.state(true),
        zipCode: this.zipCode(),
        country: this.country()
      },
      company: this.company(),
      jobTitle: this.jobTitle(),
      website: this.website(),
      linkedIn: this.linkedIn(firstName, lastName)
    };
  }
};

/* const FieldDetector = {
  patterns: {
    email: { attributes: ['email', 'e-mail', 'mail'], validFor: ['input'], autocomplete: ['email'] },
    password: { attributes: ['password', 'passwd', 'pwd'], validFor: ['input'], autocomplete: ['current-password', 'new-password'] },
    confirmPassword: { attributes: ['confirm-password', 'confirmpassword', 'verify-password', 'retype-password', 'repeat-password'], validFor: ['input'], autocomplete: ['new-password'] },
    firstName: { attributes: ['firstname', 'first-name', 'first_name', 'fname', 'given-name', 'givenname'], validFor: ['input'], autocomplete: ['given-name'] },
    lastName: { attributes: ['lastname', 'last-name', 'last_name', 'lname', 'surname', 'family-name', 'familyname'], validFor: ['input'], autocomplete: ['family-name'] },
    fullName: { attributes: ['fullname', 'full-name', 'full_name', 'your-name', 'yourname'], validFor: ['input'], autocomplete: ['name'] },
    phone: { attributes: ['phone', 'telephone', 'mobile', 'cell', 'phonenumber'], validFor: ['input'], autocomplete: ['tel', 'tel-national'] },
    address: { attributes: ['address', 'street', 'address1', 'streetaddress', 'address-line'], validFor: ['input', 'textarea'], autocomplete: ['street-address', 'address-line1'] },
    city: { attributes: ['city', 'town', 'locality'], validFor: ['input'], autocomplete: ['address-level2'] },
    state: { attributes: ['state', 'province', 'region'], validFor: ['input', 'select'], autocomplete: ['address-level1'] },
    zipCode: { attributes: ['zip', 'zipcode', 'postal', 'postalcode', 'postcode'], validFor: ['input'], autocomplete: ['postal-code'] },
    country: { attributes: ['country', 'nation'], validFor: ['input', 'select'], autocomplete: ['country', 'country-name'] },
    username: { attributes: ['username', 'user-name', 'userid', 'login-id', 'loginid'], validFor: ['input'], autocomplete: ['username'] },
    company: { attributes: ['company', 'organization', 'employer', 'business', 'companyname'], validFor: ['input'], autocomplete: ['organization'] },
    jobTitle: { attributes: ['jobtitle', 'job-title', 'job_title', 'position', 'occupation', 'title', 'role'], validFor: ['input'], autocomplete: ['organization-title'] },
    website: { attributes: ['website', 'url', 'homepage', 'site-url', 'webpage', 'portfolio'], validFor: ['input'], autocomplete: ['url'] },
    linkedIn: { attributes: ['linkedin', 'linked-in', 'linkedin-url', 'linkedinurl'], validFor: ['input'], autocomplete: [] },
    birthDate: { attributes: ['birthdate', 'birth-date', 'dob', 'dateofbirth', 'birthday'], validFor: ['input'], autocomplete: ['bday'] },
    age: { attributes: ['age', 'years-old'], validFor: ['input'], autocomplete: [] },
    gender: { attributes: ['gender', 'sex'], validFor: ['select', 'input'], autocomplete: ['sex'] },
    creditCard: { attributes: ['creditcard', 'cardnumber', 'card-number', 'ccnum', 'cc-number'], validFor: ['input'], autocomplete: ['cc-number'] },
    cvv: { attributes: ['cvv', 'cvc', 'securitycode', 'security-code', 'csc'], validFor: ['input'], autocomplete: ['cc-csc'] },
    expirationDate: { attributes: ['expiration', 'expiry', 'exp-date', 'expdate'], validFor: ['input'], autocomplete: ['cc-exp'] },
    expirationMonth: { attributes: ['exp-month', 'expmonth', 'expirationmonth'], validFor: ['input', 'select'], autocomplete: ['cc-exp-month'] },
    expirationYear: { attributes: ['exp-year', 'expyear', 'expirationyear'], validFor: ['input', 'select'], autocomplete: ['cc-exp-year'] },
    ssn: { attributes: ['ssn', 'social-security', 'socialsecurity'], validFor: ['input'], autocomplete: [] },
    subject: { attributes: ['subject', 'topic', 'inquiry', 'regarding'], validFor: ['input'], autocomplete: [] },
    message: { attributes: ['message', 'comment', 'comments', 'description', 'body', 'content', 'inquiry', 'feedback', 'question', 'details', 'cover-letter', 'coverletter', 'summary', 'about', 'bio'], validFor: ['textarea', 'input'], autocomplete: [] },
    resumeFile: { attributes: ['resume', 'cv', 'curriculum', 'upload-resume', 'resume-upload', 'attachment', 'file-upload', 'document'], validFor: ['file'], autocomplete: [] },
    coverLetterFile: { attributes: ['cover-letter', 'coverletter', 'cover_letter', 'letter'], validFor: ['file'], autocomplete: [] },
    workExpTitle: { attributes: ['job-title', 'jobtitle', 'position-title', 'role-title', 'work-title', 'employment-title', 'title'], validFor: ['input'], autocomplete: [], isWorkExp: true },
    workExpCompany: { attributes: ['company-name', 'companyname', 'employer-name', 'employername', 'organization-name', 'company', 'employer'], validFor: ['input'], autocomplete: [], isWorkExp: true },
    workExpLocation: { attributes: ['job-location', 'work-location', 'employment-location', 'office-location', 'work-city', 'location', 'city'], validFor: ['input'], autocomplete: [], isWorkExp: true },
    workExpStartDate: { attributes: ['start-date', 'startdate', 'from-date', 'fromdate', 'begin-date', 'begindate', 'date-from', 'datefrom', 'employment-start', 'work-start', 'from'], validFor: ['input'], autocomplete: [], isWorkExp: true },
    workExpEndDate: { attributes: ['end-date', 'enddate', 'to-date', 'todate', 'finish-date', 'date-to', 'dateto', 'employment-end', 'work-end', 'leave-date', 'to'], validFor: ['input'], autocomplete: [], isWorkExp: true },
    workExpDescription: { attributes: ['job-description', 'role-description', 'work-description', 'responsibilities', 'duties', 'job-duties', 'role-summary', 'work-summary', 'accomplishments', 'achievements', 'description'], validFor: ['textarea', 'input'], autocomplete: [], isWorkExp: true },
    workExpCurrentJob: { attributes: ['current-job', 'currentjob', 'currently-working', 'currentlyworking', 'present', 'i-currently-work', 'still-working'], validFor: ['input'], autocomplete: [], isWorkExp: true },

    // Education fields
    eduSchool: { attributes: ['school', 'university', 'college', 'institution', 'academy', 'education'], validFor: ['input'], autocomplete: ['organization'], isEdu: true },
    eduDegree: { attributes: ['degree', 'qualification', 'diploma', 'certification'], validFor: ['input', 'select'], autocomplete: [], isEdu: true },
    eduField: { attributes: ['field', 'major', 'study', 'discipline', 'subject', 'specialization'], validFor: ['input'], autocomplete: [], isEdu: true },
    eduGradYear: { attributes: ['gradyear', 'graduation', 'completed', 'finished'], validFor: ['input', 'number', 'select'], autocomplete: [], isEdu: true },
    eduStartDate: { attributes: ['edustart', 'edu-start', 'edu_start'], validFor: ['input', 'date', 'month'], autocomplete: [], isEdu: true },
    eduEndDate: { attributes: ['eduend', 'edu-end', 'edu_end'], validFor: ['input', 'date', 'month'], autocomplete: [], isEdu: true }
  },

  getFieldAttributes(element) {
    const dataAttrs = [];
    for (const attr of element.attributes) {
      if (attr.name.startsWith('data-')) {
        dataAttrs.push(attr.value.toLowerCase());
      }
    }

    const attrs = {
      id: (element.id || '').toLowerCase(),
      name: (element.name || '').toLowerCase(),
      type: (element.type || '').toLowerCase(),
      placeholder: (element.placeholder || '').toLowerCase(),
      autocomplete: (element.autocomplete || '').toLowerCase(),
      className: (typeof element.className === 'string' ? element.className : '').toLowerCase(),
      ariaLabel: (element.getAttribute('aria-label') || '').toLowerCase(),
      ariaDescribedby: (element.getAttribute('aria-describedby') || '').toLowerCase(),
      dataAttrs: dataAttrs.join(' '),
      label: ''
    };

    const labelElement = this.findAssociatedLabel(element);
    if (labelElement) {
      attrs.label = labelElement.textContent.toLowerCase().trim();
    }

    if (element.getAttribute('aria-describedby')) {
      const describedById = element.getAttribute('aria-describedby');
      const describedByEl = document.getElementById(describedById);
      if (describedByEl) {
        attrs.label += ' ' + describedByEl.textContent.toLowerCase().trim();
      }
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

    const wrapper = element.closest('div, span, fieldset, section');
    if (wrapper) {
      const label = wrapper.querySelector('label');
      if (label) return label;

      const spans = wrapper.querySelectorAll('span, p, div');
      for (const span of spans) {
        const text = span.textContent?.trim();
        if (text && text.length < 100 && span !== element && !span.contains(element)) {
          return span;
        }
      }
    }

    let prev = element.previousElementSibling;
    while (prev) {
      if (prev.tagName === 'LABEL' || (prev.textContent?.trim().length < 100)) {
        return prev;
      }
      prev = prev.previousElementSibling;
    }

    return null;
  },

  detectFieldType(element) {
    const attrs = this.getFieldAttributes(element);
    const tagName = element.tagName.toLowerCase();
    const elementType = tagName === 'input' ? 'input' : tagName;

    if (attrs.autocomplete) {
      for (const [fieldType, pattern] of Object.entries(this.patterns)) {
        if (pattern.autocomplete.includes(attrs.autocomplete) && this.isValidForElement(pattern, elementType)) {
          return fieldType;
        }
      }
    }

    if (attrs.type === 'email') return 'email';
    if (attrs.type === 'password') {
      const searchString = `${attrs.id} ${attrs.name} ${attrs.placeholder} ${attrs.label}`;
      if (this.matchesWordBoundary(searchString, this.patterns.confirmPassword.attributes)) {
        return 'confirmPassword';
      }
      return 'password';
    }
    if (attrs.type === 'tel') return 'phone';
    if (attrs.type === 'url') return 'website';

    const primaryFields = `${attrs.id} ${attrs.name}`.toLowerCase();
    const secondaryFields = `${attrs.placeholder} ${attrs.label}`.toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    // PRIORITY: Check prioritized patterns FIRST (work experience or education)
    // This solves the shadowing bug where generic 'jobTitle' might steal from 'workExpTitle'
    for (const [fieldType, pattern] of Object.entries(this.patterns)) {
      if (!pattern.isWorkExp && !pattern.isEdu) continue;
      if (!this.isValidForElement(pattern, elementType)) continue;

      let score = 0;
      for (const attr of pattern.attributes) {
        if (this.matchesWordBoundary(primaryFields, [attr])) score += 10;
        if (this.matchesWordBoundary(secondaryFields, [attr])) score += 5;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = fieldType;
      }
    }

    // If we found a solid priority match, return it immediately
    if (bestMatch && bestScore >= 5) return bestMatch;

    // Reset for regular patterns if no high-confidence priority match found
    bestMatch = null;
    bestScore = 0;

    for (const [fieldType, pattern] of Object.entries(this.patterns)) {
      if (pattern.isWorkExp || pattern.isEdu) continue; // Already checked above
      if (!this.isValidForElement(pattern, elementType)) continue;

      let score = 0;
      for (const attr of pattern.attributes) {
        if (this.matchesWordBoundary(primaryFields, [attr])) score += 10;
        if (this.matchesWordBoundary(secondaryFields, [attr])) score += 5;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = fieldType;
      }
    }

    if (bestMatch && bestScore >= 5) {
      return bestMatch;
    }

    if (tagName === 'textarea') {
      return 'message';
    }

    const labelLower = attrs.label.toLowerCase();
    if (labelLower.includes('name') && !labelLower.includes('user')) {
      if (labelLower.includes('full') || labelLower.includes('your')) {
        return 'fullName';
      }
      if (labelLower.includes('first')) return 'firstName';
      if (labelLower.includes('last')) return 'lastName';
      return 'fullName';
    }

    return 'text';
  },

  isValidForElement(pattern, elementType) {
    if (!pattern.validFor) return true;
    return pattern.validFor.includes(elementType);
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

  shouldSkipField(input, includeFileInputs = false) {
    const skipTypes = ['hidden', 'submit', 'button', 'reset', 'image'];
    if (!includeFileInputs) {
      skipTypes.push('file');
    }
    if (input.type && skipTypes.includes(input.type)) return true;

    if (input.disabled || input.readOnly) return true;

    try {
      const style = window.getComputedStyle(input);
      if (style.display === 'none') return true;
      if (style.visibility === 'hidden' && style.position !== 'absolute') return true;
    } catch (e) { }

    const rect = input.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return true;

    return false;
  },

  getSelectOptions(select) {
    return Array.from(select.options).map(option => ({
      value: option.value,
      text: option.text
    }));
  },

  getFileInputs() {
    const fileInputs = [];
    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(input => {
      if (input.disabled) return;

      const attrs = this.getFieldAttributes(input);

      let label = attrs.label;
      if (!label || label.trim() === '') {
        const dropZone = input.closest('[data-automation-id*="upload"], [class*="upload"], [class*="drop"]');
        if (dropZone) {
          const labelEl = dropZone.closest('div, section')?.querySelector('label, h3, h4, p, span');
          if (labelEl) label = labelEl.textContent.toLowerCase().trim();
        }

        if (!label) {
          const wrapper = input.closest('div[class*="upload"], div[class*="file"], div[class*="drop"], section');
          if (wrapper) {
            const prevSibling = wrapper.previousElementSibling;
            if (prevSibling && (prevSibling.tagName === 'LABEL' || prevSibling.tagName === 'H3' || prevSibling.tagName === 'P')) {
              label = prevSibling.textContent.toLowerCase().trim();
            }
          }
        }
      }

      const searchString = `${attrs.id} ${attrs.name} ${attrs.placeholder} ${attrs.className} ${attrs.ariaLabel} ${label} ${attrs.dataAttrs}`.toLowerCase();

      let fileType = 'unknown';

      const resumePatterns = ['resume', 'cv', 'curriculum', 'curriculum-vitae', 'upload-resume', 'upload a file', 'attachments'];
      const coverLetterPatterns = ['cover-letter', 'coverletter', 'cover_letter', 'cover letter'];

      if (resumePatterns.some(p => searchString.includes(p))) {
        fileType = 'resumeFile';
      } else if (coverLetterPatterns.some(p => searchString.includes(p))) {
        fileType = 'coverLetterFile';
      } else {
        const acceptAttr = input.accept || '';
        if (acceptAttr.includes('.pdf') || acceptAttr.includes('.doc') || acceptAttr.includes('application/')) {
          fileType = 'resumeFile';
        }
      }

      fileInputs.push({
        element: input,
        fileType,
        id: input.id,
        name: input.name,
        label: label || attrs.label,
        accept: input.accept
      });
    });

    return fileInputs;
  },

  getAllFields(includeFileInputs = true) {
    const allFields = [];
    const elements = this.findAllInputElements();
    const seen = new WeakSet();
    let fieldIndex = 0;

    elements.forEach((element) => {
      if (seen.has(element)) return;
      seen.add(element);

      if (this.shouldSkipField(element, includeFileInputs)) return;

      const fieldType = this.detectFieldType(element);
      const attrs = this.getFieldAttributes(element);

      const tagName = element.tagName.toLowerCase();
      const isContentEditable = element.contentEditable === 'true' || element.getAttribute('contenteditable') === 'true';

      const pattern = this.patterns[fieldType] || {};
      const isWorkExp = !!pattern.isWorkExp;
      const isEdu = !!pattern.isEdu;

      allFields.push({
        index: fieldIndex++,
        element,
        tagName,
        type: element.type || (isContentEditable ? 'contenteditable' : 'text'),
        detectedType: fieldType,
        isWorkExp: isWorkExp,
        isEdu: isEdu,
        id: element.id,
        name: element.name || element.getAttribute('name'),
        label: attrs.label,
        required: element.required || element.getAttribute('aria-required') === 'true',
        options: tagName === 'select' ? this.getSelectOptions(element) : null,
        isContentEditable
      });
    });

    if (includeFileInputs) {
      const fileInputs = this.getFileInputs();
      fileInputs.forEach(fi => {
        if (!seen.has(fi.element)) {
          allFields.push({
            index: fieldIndex++,
            element: fi.element,
            tagName: 'input',
            type: 'file',
            detectedType: fi.fileType,
            id: fi.id,
            name: fi.name,
            label: fi.label || 'File Upload',
            required: fi.element.required,
            options: null,
            isContentEditable: false,
            accept: fi.accept,
            fileType: fi.fileType
          });
        }
      });
    }

    const workdayQuestions = this.detectApplicationQuestions();
    allFields.push(...workdayQuestions);

    return allFields;
  },

  detectApplicationQuestions(root = document) {
    // 🧠 WORKDAY INSIGHT: Questions are UI blocks (fieldset), not inputs.
    const questions = [];

    // Find all potential question containers
    const containers = Array.from(root.querySelectorAll('fieldset legend, fieldset [data-automation-id="richText"]'));

    containers.forEach((container) => {
      const fieldset = container.closest('fieldset');
      if (!fieldset) return;

      const button = fieldset.querySelector('button[aria-haspopup="listbox"], button[aria-haspopup="true"]');
      if (!button) return;

      // Extract clean question text
      const text = container.innerText
        .replace(/\u002A/g, '')
        .replace(/\s+/g, ' ')
  .trim();

if (text.length < 15) return;

// Avoid duplicates
if (questions.some(q => q.button === button)) return;

questions.push({
  fieldset: fieldset,
  button: button,
  questionText: text,
  tagName: 'button'
});
    });

// Fallback for solo listbox buttons
const soloButtons = Array.from(root.querySelectorAll('button[aria-haspopup="listbox"]'))
  .filter(btn => !questions.some(q => q.element === btn));

soloButtons.forEach((button, index) => {
  const labelText = typeof extractQuestionText !== 'undefined' ? extractQuestionText(button) : '';
  if (labelText && labelText.length > 15) {
    questions.push({
      index: 9500 + index,
      element: button,
      tagName: 'button',
      type: 'applicationQuestion',
      detectedType: 'applicationQuestion',
      automationId: button.getAttribute('data-automation-id'),
      id: button.id || `solo-q-${index}`,
      name: button.name || button.getAttribute('name'),
      label: labelText,
      required: button.getAttribute('aria-label')?.includes('Required'),
      value: button.innerText
    });
  }
});

if (questions.length > 0) {
  console.log(`[FormFill] Detected ${questions.length} application questions in frame:`, window.location.href);
}

return questions;
  },

findAllInputElements() {
  const elements = [];
  const selector = 'input, select, textarea, [contenteditable="true"], [role="textbox"], [role="combobox"]';

  elements.push(...document.querySelectorAll(selector));

  this.traverseShadowDOM(document.body, elements, selector);

  return elements;
},

traverseShadowDOM(root, elements, selector = 'input, select, textarea') {
  if (!root) return;

  const allElements = root.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.shadowRoot) {
      elements.push(...el.shadowRoot.querySelectorAll(selector));
      this.traverseShadowDOM(el.shadowRoot, elements, selector);
    }
  });
}
}; */

// Container-based block indexing (Work Experience, Education)
// Groups form fields by their parent container and assigns data index per container
const BlockContainerMapper = {
  // Use separate maps for different block types
  maps: {
    work: { containerInfoMap: new WeakMap(), containerList: [], data: [] },
    edu: { containerInfoMap: new WeakMap(), containerList: [], data: [] }
  },
  debugMode: true,

  // Reset a specific block type mapper
  reset(type, data) {
    if (!this.maps[type]) return;
    this.maps[type].containerInfoMap = new WeakMap();
    this.maps[type].containerList = [];
    this.maps[type].data = data || [];
    // Reset counters and list order
    this.maps[type].counter = 0;

    if (this.debugMode) {
      console.log(`=== FormFill Pro: BlockContainerMapper RESET [${type}] ===`);
      console.log(`Total ${type} entries:`, this.maps[type].data.length);
      this.maps[type].data.forEach((item, i) => {
        if (type === 'work') {
          console.log(`  Work[${i}]: ${item.title || 'No title'} @ ${item.company || 'No company'}`);
        } else {
          console.log(`  Edu[${i}]: ${item.degree || 'No degree'} - ${item.school || 'No school'}`);
        }
      });
      console.log('=====================================================');
    }
  },

  // Find the container for an element based on block type
  findContainer(element, type) {
    if (!element) return null;

    const blockPatterns = type === 'work'
      ? ['[role="group"][aria-labelledby*="Work-Experience"]', '[role="group"][aria-labelledby*="Work Experience"]']
      : ['[role="group"][aria-labelledby*="Education"]', '[data-fkit-id^="education-"]'];

    for (const pattern of blockPatterns) {
      const block = element.closest(pattern);
      if (block) return block;
    }

    const sectionPatterns = type === 'work'
      ? ['[data-automation-id="workExperienceSection"]', '[data-automation-id*="workExperience"]']
      : ['[data-automation-id="educationSection"]', '[data-automation-id*="education"]'];

    let sectionRoot = null;
    for (const selector of sectionPatterns) {
      const candidate = element.closest(selector);
      if (candidate) {
        sectionRoot = candidate;
        break;
      }
    }

    if (sectionRoot) {
      const children = Array.from(sectionRoot.querySelectorAll(':scope > div, :scope > fieldset, :scope > section'))
        .filter(child => child.querySelector('input, select, textarea'));

      for (const child of children) {
        if (child.contains(element)) return child;
      }
      return sectionRoot;
    }

    return element.closest('[role="group"], fieldset');
  },

  // Get or assign info for a container
  getContainerInfo(container, type) {
    const map = this.maps[type];
    if (!map) return null;

    if (!container) {
      if (this.debugMode) {
        console.warn('FormFill Pro: No container found for element, skipping sequential mapping');
      }
      return null;
    }

    // Already assigned → reuse exactly that index
    if (map.containerInfoMap.has(container)) {
      return map.containerInfoMap.get(container);
    }

    // Assign strictly by container appearance order
    const index = map.containerList.length;
    const info = { index };

    map.containerInfoMap.set(container, info);
    map.containerList.push(container);

    if (this.debugMode) {
      console.log(`FormFill Pro: [${type}] Container #${map.containerList.length} assigned index ${index}`);
    }

    return info;
  },

  // Get the index for a field based on its container
  getIndexForField(element, blockType) {
    const container = this.findContainer(element, blockType);
    const info = this.getContainerInfo(container, blockType);
    return info ? info.index : null;
  },

  // Get the entry data for a field
  getEntryForField(element, type) {
    const index = this.getIndexForField(element, type);
    if (index === null) return {};

    const map = this.maps[type];
    if (!map || !map.data) return {};

    if (!map.data[index]) {
      if (this.debugMode) {
        console.warn(`FormFill Pro: [${type}] No entry found for index ${index}. Total available: ${map.data.length}`);
      }
      return {}; // Return empty instead of silent fallback to index 0
    }

    return map.data[index];
  },
};

const MultiBlockFiller = {
  // Mapping field types to their block types
  typeMap: {
    workExpTitle: 'work', jobTitle: 'work',
    workExpCompany: 'work', company: 'work',
    workExpLocation: 'work',
    workExpStartDate: 'work', workExpEndDate: 'work', workExpDescription: 'work',
    workExpCurrentJob: 'work',
    eduSchool: 'edu', eduDegree: 'edu', eduField: 'edu',
    eduGradYear: 'edu', eduGPA: 'edu', eduStartDate: 'edu', eduEndDate: 'edu'
  },

  isMultiBlockField(fieldType, element) {
    if (this.typeMap[fieldType]) return true;

    // Fallback detection logic
    const patterns = FieldDetector.patterns[fieldType] || {};
    if (patterns.isWorkExp || patterns.isEdu) return true;

    return false;
  },

  getBlockType(fieldType) {
    return this.typeMap[fieldType] || (FieldDetector.patterns[fieldType]?.isEdu ? 'edu' : 'work');
  },

  fillBlockField(element, fieldType, data, sectionIndex, blockType) {
    const entries = data || [];

    // STRICT: Only fill if we have a profile entry for this exact index
    const entry = entries[sectionIndex];
    if (!entry) {
      if (BlockContainerMapper.debugMode) {
        console.warn(`FormFill Pro: [${blockType}] Skipping block index ${sectionIndex} (no entry in profile)`);
      }
      return null;
    }

    if (blockType === 'work') {
      switch (fieldType) {
        case 'workExpTitle':
        case 'jobTitle':
          // Only fill jobTitle/company here if we have a valid sequence
          return entry.title || '';
        case 'workExpCompany':
        case 'company':
          return entry.company || '';
        case 'workExpLocation': return entry.location || '';
        case 'workExpStartDate': return entry.startDate || '';
        case 'workExpEndDate': return entry.endDate || '';
        case 'workExpDescription': return entry.description || '';
        case 'workExpCurrentJob': return !entry.endDate || entry.endDate.toLowerCase() === 'present';
        default: return null;
      }
    } else if (blockType === 'edu') {
      switch (fieldType) {
        case 'eduSchool': return entry.school || '';
        case 'eduDegree': {
          const rawDegree = entry.degree || '';
          // Simple normalization map for Workday
          const lower = rawDegree.toLowerCase();
          if (lower.includes('bachelor') || lower.includes('bca') || lower.includes('b.tech') || lower.includes('b.sc') || lower.includes('bs')) return 'Bachelors';
          if (lower.includes('master') || lower.includes('mca') || lower.includes('m.tech') || lower.includes('m.sc') || lower.includes('ms') || lower.includes('mba')) return 'Masters';
          if (lower.includes('doctor') || lower.includes('phd')) return 'Doctorate';
          if (lower.includes('associate')) return 'Associates';
          if (lower.includes('ged')) return 'GED';
          if (lower.includes('high school')) return 'High School Diploma';
          if (lower.includes('diploma')) return 'Post Graduate Diploma'; // Fallback for diploma
          return rawDegree;
        }
        case 'eduField': return entry.field || '';
        case 'eduGradYear': return entry.graduationYear || '';
        case 'eduGPA': return entry.gpa || '';
        case 'eduStartDate': return entry.startDate || '';
        case 'eduEndDate': return entry.endDate || '';
        default: return null;
      }
    }
    return null;
  },

  getFieldWithContext(field, profile) {
    const isMultiBlock = this.isMultiBlockField(field.detectedType, field.element);

    if (!isMultiBlock) {
      return { isMultiBlock: false, field };
    }

    const blockType = this.getBlockType(field.detectedType);
    const data = blockType === 'work' ? (profile.workExperience || []) : (profile.education || []);

    // Use container-based mapper to get the index
    let sectionIndex = null;
    if (data.length > 0) {
      sectionIndex = BlockContainerMapper.getIndexForField(field.element, blockType);
    }

    if (sectionIndex === null) {
      return { isMultiBlock: false, field };
    }

    const value = this.fillBlockField(
      field.element,
      field.detectedType,
      data,
      sectionIndex,
      blockType
    );

    // Debug logging
    if (BlockContainerMapper.debugMode && value) {
      const entry = data[sectionIndex] || {};
      const label = blockType === 'work' ? (entry.company || 'unknown') : (entry.school || 'unknown');
      console.log(`FormFill Pro: Filled "${field.detectedType}" with "${value?.substring?.(0, 30) || value}" from ${blockType}[${sectionIndex}] (${label})`);
    }

    return {
      isMultiBlock: true,
      field,
      sectionIndex,
      value,
      blockType
    };
  }
};

const FormFiller = {
  base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  },

  async setFileInputValue(fileInput, resumeFile) {
    if (!resumeFile || !resumeFile.data) {
      console.log('FormFill Pro: No resume file data available');
      return false;
    }

    try {
      const arrayBuffer = this.base64ToArrayBuffer(resumeFile.data);
      const blob = new Blob([arrayBuffer], { type: resumeFile.type });
      const file = new File([blob], resumeFile.name, {
        type: resumeFile.type,
        lastModified: new Date(resumeFile.uploadedAt).getTime()
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;

      fileInput.dispatchEvent(new Event('input', { bubbles: true }));
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));

      console.log(`FormFill Pro: Successfully uploaded ${resumeFile.name}`);
      return true;
    } catch (error) {
      console.error('FormFill Pro: Error setting file input:', error);
      return false;
    }
  },

  async fillFileInputs(resumeFile) {
    const fileInputs = FieldDetector.getFileInputs();
    let filledCount = 0;

    for (const fileInfo of fileInputs) {
      if (fileInfo.fileType === 'resumeFile' && resumeFile) {
        const success = await this.setFileInputValue(fileInfo.element, resumeFile);
        if (success) filledCount++;
      }
    }

    return filledCount;
  },

  getValueForField(fieldType, profile) {
    const valueMap = {
      email: profile.email,
      password: profile.password,
      confirmPassword: profile.password,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName: profile.fullName,
      phone: profile.phone,
      address: profile.address?.street || '',
      address2: '',
      city: profile.address?.city || '',
      state: profile.address?.state || '',
      stateAbbr: profile.address?.stateAbbr || '',
      zipCode: profile.address?.zipCode || '',
      country: profile.address?.country || '',
      username: profile.username,
      company: profile.company,
      jobTitle: profile.jobTitle,
      website: profile.website,
      linkedIn: profile.linkedIn,
      birthDate: profile.birthDate,
      age: String(profile.age || ''),
      gender: profile.gender,
      subject: FakeDataGenerator.subject(),
      creditCard: FakeDataGenerator.creditCard(),
      cvv: FakeDataGenerator.cvv(),
      expirationDate: FakeDataGenerator.expirationDate(),
      expirationMonth: String(FakeDataGenerator.randomInt(1, 12)).padStart(2, '0'),
      expirationYear: String(FakeDataGenerator.randomInt(25, 30)),
      ssn: FakeDataGenerator.ssn(),
      message: profile.summary || profile.coverLetter || FakeDataGenerator.paragraph(),
      text: ''
    };
    return valueMap[fieldType] !== undefined ? valueMap[fieldType] : '';
  },

  simulateTyping(element, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set;
    const nativeSelectValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLSelectElement.prototype,
      'value'
    )?.set;

    let setter;
    if (element.tagName === 'TEXTAREA') {
      setter = nativeTextAreaValueSetter;
    } else if (element.tagName === 'SELECT') {
      setter = nativeSelectValueSetter;
    } else {
      setter = nativeInputValueSetter;
    }

    element.focus();
    element.dispatchEvent(new FocusEvent('focus', { bubbles: true, cancelable: true }));
    element.dispatchEvent(new FocusEvent('focusin', { bubbles: true, cancelable: true }));

    element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'a', code: 'KeyA' }));

    if (setter) {
      setter.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: value
    }));

    element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'a', code: 'KeyA' }));

    element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

    element.dispatchEvent(new FocusEvent('blur', { bubbles: true, cancelable: true }));
    element.dispatchEvent(new FocusEvent('focusout', { bubbles: true, cancelable: true }));

    if (element.form) {
      try {
        element.form.dispatchEvent(new Event('input', { bubbles: true }));
      } catch (e) { }
    }

    this.triggerReactAngularVue(element, value);
  },

  triggerReactAngularVue(element, value) {
    const reactKey = Object.keys(element).find(key =>
      key.startsWith('__reactFiber$') ||
      key.startsWith('__reactProps$') ||
      key.startsWith('__reactInternalInstance$')
    );

    if (reactKey || element._reactRootContainer || document.querySelector('[data-reactroot]')) {
      const tracker = element._valueTracker;
      if (tracker) {
        tracker.setValue('');
      }
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (element.__vue__ || element._vei || element.__vueParentComponent || document.querySelector('[data-v-]')) {
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));

      try {
        element.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
        element.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: value }));
      } catch (e) { }
    }

    if (element.getAttribute('ng-model') || element.getAttribute('[(ngModel)]') ||
      element.getAttribute('formcontrolname') || element.getAttribute('formControlName') ||
      document.querySelector('[ng-app]') || document.querySelector('[ng-controller]') ||
      document.querySelector('app-root')) {
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));

      try {
        const ngModelController = element['$ngModelController'] || element.ngModel;
        if (ngModelController && typeof ngModelController.$setViewValue === 'function') {
          ngModelController.$setViewValue(value);
          ngModelController.$render();
        }
      } catch (e) { }
    }
  },

  async setFieldValue(element, value) {
    // Workday/Special Dropdown Handling (Button-based listboxes)
    if (element && (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') &&
      (element.getAttribute('aria-haspopup') === 'listbox' || element.getAttribute('data-automation-id') === 'dropdown' || element.hasAttribute('data-uxi-widget-type'))) {
      if (typeof WorkdayDropdownAdapter !== 'undefined') {
        await WorkdayDropdownAdapter.selectOption(element, value);
        return;
      }
    }

    const isContentEditable = element.contentEditable === 'true' || element.getAttribute('contenteditable') === 'true';

    if (isContentEditable) {
      element.focus();
      element.textContent = value;
      element.dispatchEvent(new InputEvent('input', { bubbles: true, data: value }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));
    } else {
      this.simulateTyping(element, value);
    }
  },

  setSelectValue(selectElement, value) {
    const options = Array.from(selectElement.options);
    let matchedOption = options.find(opt =>
      opt.value.toLowerCase() === value.toLowerCase() ||
      opt.text.toLowerCase() === value.toLowerCase()
    );

    if (!matchedOption) {
      matchedOption = options.find(opt =>
        opt.value.toLowerCase().includes(value.toLowerCase()) ||
        opt.text.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (!matchedOption && options.length > 1) {
      matchedOption = options[1];
    }

    if (matchedOption) {
      selectElement.focus();
      selectElement.value = matchedOption.value;
      this.simulateTyping(selectElement, matchedOption.value);
    }
  },

  setCheckboxValue(checkbox, checked = true) {
    checkbox.focus();
    checkbox.checked = checked;

    checkbox.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    checkbox.dispatchEvent(new Event('input', { bubbles: true }));

    this.triggerReactAngularVue(checkbox, checked);
  },

  setRadioValue(radioGroup, value) {
    const radios = Array.from(radioGroup);
    let matchedRadio = radios.find(radio =>
      radio.value.toLowerCase() === value.toLowerCase()
    );

    if (!matchedRadio && radios.length > 0) {
      matchedRadio = radios[0];
    }

    if (matchedRadio) {
      matchedRadio.focus();
      matchedRadio.checked = true;

      matchedRadio.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));

      matchedRadio.dispatchEvent(new Event('change', { bubbles: true }));
      matchedRadio.dispatchEvent(new Event('input', { bubbles: true }));

      this.triggerReactAngularVue(matchedRadio, matchedRadio.value);
    }
  },

  getWorkExperienceValueSafe(fieldType, element, profile) {
    const list = profile?.workExperience;
    if (!Array.isArray(list) || list.length === 0) return null;

    // 🔒 Always safe: default to first entry
    let entry = list[0];

    // Optional DOM hint (best effort, never required)
    try {
      const container = element.closest('[data-work-experience], .work-experience, section');
      if (container) {
        const all = Array.from(
          document.querySelectorAll('[data-work-experience], .work-experience, section')
        );
        const idx = all.indexOf(container);
        if (idx >= 0 && list[idx]) entry = list[idx];
      } else {
        // If not in a container, only proceed if it's an explicit workExp field
        if (!FieldDetector.patterns[fieldType]?.isWorkExp) return null;
      }
    } catch {
      if (!FieldDetector.patterns[fieldType]?.isWorkExp) return null;
    }

    switch (fieldType) {
      case 'workExpTitle': return entry.title || null;
      case 'workExpCompany': return entry.company || null;
      case 'workExpLocation': return entry.location || null;
      case 'workExpDescription': return entry.description || null;
      case 'workExpStartDate': return entry.startDate || null;
      case 'workExpEndDate': return (entry.endDate === 'Present' || !entry.endDate) ? 'Present' : entry.endDate;
      case 'workExpCurrentJob': return !entry.endDate || entry.endDate.toLowerCase() === 'present';
      default:
        // Disambiguate generic fields (message, text, city, etc.) found inside a section
        const attrs = FieldDetector.getFieldAttributes(element);
        const label = (attrs.label || '').toLowerCase();
        if (label.includes('location') || label.includes('city') || label.includes('address') || label.includes('where')) return entry.location || null;
        if (label.includes('description') || label.includes('role') || label.includes('responsibilit') || label.includes('summar') || label.includes('dutie')) return entry.description || null;
        if (label.includes('company') || label.includes('employer')) return entry.company || null;
        if (label.includes('title') || label.includes('position')) return entry.title || null;
        return null;
    }
  },

  async fillField(element, fieldType, profile, options = {}) {
    const tagName = element.tagName.toLowerCase();
    const inputType = element.type?.toLowerCase();

    if (tagName === 'select') {
      let value = this.getValueForField(fieldType, profile);
      const enhanced = this.getWorkExperienceValueSafe(fieldType, element, profile);
      if (enhanced !== null) value = String(enhanced);
      this.setSelectValue(element, value);
      return { success: true, value };
    }

    if (inputType === 'checkbox') {
      let checked = true;
      const enhanced = this.getWorkExperienceValueSafe(fieldType, element, profile);
      if (enhanced !== null) checked = !!enhanced;
      this.setCheckboxValue(element, checked);
      return { success: true, value: checked ? 'checked' : 'unchecked' };
    }

    if (inputType === 'radio') {
      const name = element.name;
      if (name) {
        const radioGroup = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
        let value = this.getValueForField(fieldType, profile);
        const enhanced = this.getWorkExperienceValueSafe(fieldType, element, profile);
        if (enhanced !== null) value = String(enhanced);
        this.setRadioValue(radioGroup, value);
        return { success: true, value };
      }
      return { success: false, value: null };
    }

    let value = this.getValueForField(fieldType, profile);

    // 🧠 SAFE work-experience enrichment
    const enhanced = this.getWorkExperienceValueSafe(fieldType, element, profile);
    if (enhanced !== null) {
      value = enhanced;
    }

    await this.setFieldValue(element, value);
    return { success: true, value };
  },

  async fillAllForms(profile, options = {}) {
    const { mode = 'smart', templateFields = null, applicationQuestions = null } = options;
    const allFields = FieldDetector.getAllFields();

    if (allFields.length === 0) {
      return { success: false, message: 'No form fields found' };
    }
    // Initialize block container mappers
    if (typeof BlockContainerMapper !== 'undefined') {
      BlockContainerMapper.reset('work', profile.workExperience || []);
      BlockContainerMapper.reset('edu', profile.education || []);
    }

    // 🔥 NEW: Dedicated Application Question pass (Parallel pipeline)
    if (typeof ApplicationQuestionFiller !== 'undefined') {
      await ApplicationQuestionFiller.fillAllQuestions(profile, applicationQuestions);
    }

    let filledCount = 0;

    for (let i = 0; i < allFields.length; i++) {
      const field = allFields[i];
      const element = field.element;
      const labelText = field.label || '';

      await new Promise(resolve => setTimeout(resolve, 30));

      // A. Handle Saved Templates (Highest Priority)
      if (templateFields) {
        const templateMatch = templateFields.find(tf => tf.selector && document.querySelector(tf.selector) === element);
        if (templateMatch && templateMatch.value) {
          await this.setFieldValue(element, templateMatch.value);
          filledCount++;
          continue;
        }
      }

      // C. AI Mode Check (Skip long-form fields if AI mode is active)
      if (typeof SmartFieldClassifier !== 'undefined') {
        const classification = SmartFieldClassifier.classifyField(element, field.detectedType, labelText);
        if (mode === 'ai' && classification.useAI) {
          continue; // Skip, will be handled by AI buttons or deferred
        }
      }

      // D. Handle multi-block fields (Work Exp, Education)
      if (typeof MultiBlockFiller !== 'undefined') {
        const blockContext = MultiBlockFiller.getFieldWithContext(field, profile);
        if (blockContext.isMultiBlock && blockContext.value !== null && blockContext.value !== '') {
          const tagName = element.tagName.toLowerCase();
          if (tagName === 'select') {
            this.setSelectValue(element, String(blockContext.value));
          } else if (element.type === 'checkbox') {
            this.setCheckboxValue(element, !!blockContext.value);
          } else {
            await this.setFieldValue(element, String(blockContext.value));
          }
          filledCount++;
          continue;
        }
      }

      // E. Fallback to regular field filling (Always try if not already filled)
      await this.fillField(element, field.detectedType, profile);
      filledCount++;
    }

    return { success: true, fieldsCount: filledCount };
  },

  async applyTemplate(template, profile) {
    const fields = FieldDetector.getAllFields();

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
        } else {
          value = this.getValueForField(mapping.fieldType, profile);
        }
        await this.setFieldValue(field.element, value);
      }
    }
  },

  fillFromImportedData(dataRow, dataHeaders) {
    const allFields = FieldDetector.getAllFields();
    if (allFields.length === 0) {
      return { success: false, message: 'No form fields found' };
    }

    const commonAliases = {
      'firstname': ['first_name', 'fname', 'given_name', 'givenname', 'first'],
      'lastname': ['last_name', 'lname', 'family_name', 'familyname', 'surname', 'last'],
      'fullname': ['full_name', 'name', 'your_name', 'yourname', 'complete_name'],
      'email': ['email_address', 'emailaddress', 'e_mail', 'mail', 'user_email', 'useremail'],
      'phone': ['phone_number', 'phonenumber', 'telephone', 'tel', 'mobile', 'cell', 'contact_number'],
      'address': ['street_address', 'streetaddress', 'address_line_1', 'addressline1', 'street'],
      'city': ['town', 'locality'],
      'state': ['province', 'region', 'state_province'],
      'zip': ['zipcode', 'zip_code', 'postal_code', 'postalcode', 'postcode'],
      'country': ['nation', 'country_code'],
      'company': ['company_name', 'companyname', 'organization', 'org', 'business', 'employer'],
      'jobtitle': ['job_title', 'title', 'position', 'role', 'designation']
    };

    const normalizeString = (str) => (str || '').toLowerCase().trim().replace(/[\s_\-\.]+/g, '');

    const findBestMatch = (fieldIdentifiers) => {
      const normalizedHeaders = dataHeaders.map(h => ({
        original: h,
        normalized: normalizeString(h)
      }));

      for (const identifier of fieldIdentifiers) {
        const normalized = normalizeString(identifier);
        for (const header of normalizedHeaders) {
          if (header.normalized === normalized) return header.original;
        }
      }

      for (const identifier of fieldIdentifiers) {
        const normalized = normalizeString(identifier);
        for (const [canonical, aliases] of Object.entries(commonAliases)) {
          const allVariants = [canonical, ...aliases];
          const identifierMatches = allVariants.some(v => normalizeString(v) === normalized);
          if (identifierMatches) {
            for (const header of normalizedHeaders) {
              if (allVariants.some(v => normalizeString(v) === header.normalized)) {
                return header.original;
              }
            }
          }
        }
      }

      return null;
    };

    allFields.forEach((field, index) => {
      setTimeout(() => {
        const element = field.element;
        const identifiers = [field.id, field.name, field.label].filter(Boolean);
        const matchedHeader = findBestMatch(identifiers);

        if (matchedHeader && dataRow[matchedHeader] !== undefined && dataRow[matchedHeader] !== '') {
          const value = String(dataRow[matchedHeader]);
          const tagName = element.tagName.toLowerCase();
          const inputType = element.type?.toLowerCase();

          if (tagName === 'select') {
            this.setSelectValue(element, value);
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
        }
      }, index * 50);
    });

    return { success: true, fieldsCount: allFields.length };
  }
};

const SmartFieldClassifier = {
  simpleFieldTypes: new Set([
    'firstName', 'lastName', 'fullName', 'email', 'phone', 'address', 'city',
    'state', 'zipCode', 'country', 'username', 'password', 'confirmPassword',
    'company', 'jobTitle', 'website', 'linkedIn', 'birthDate', 'age', 'gender',
    'creditCard', 'cvv', 'expirationDate', 'expirationMonth', 'expirationYear', 'ssn'
  ]),

  complexQuestionPatterns: [
    /why\s+(do\s+you|are\s+you|should\s+we|would\s+you)/i,
    /what\s+(makes\s+you|are\s+your|is\s+your|do\s+you)/i,
    /describe\s+(your|a\s+time|yourself|how)/i,
    /tell\s+(us|me)\s+about/i,
    /how\s+(would\s+you|do\s+you|did\s+you|have\s+you)/i,
    /explain\s+(why|how|your)/i,
    /share\s+(an\s+example|your|a\s+time)/i,
    /give\s+(an\s+example|us)/i,
    /cover\s*letter/i,
    /motivation/i,
    /interest\s+in\s+(this|the)\s+(role|position|job|company)/i,
    /salary\s+expectation/i,
    /greatest\s+(strength|weakness)/i,
    /career\s+(goal|objective|aspiration)/i,
    /accomplishment/i,
    /challenge\s+(you|that)/i,
    /experience\s+with/i,
    /why\s+(this|our)\s+(company|organization|team)/i
  ],

  isSimpleField(fieldType, element) {
    if (this.simpleFieldTypes.has(fieldType)) {
      return true;
    }

    const tagName = element.tagName.toLowerCase();
    const inputType = element.type?.toLowerCase();

    if (tagName === 'select') return true;
    if (inputType === 'checkbox' || inputType === 'radio') return true;
    if (inputType === 'date' || inputType === 'number') return true;

    const maxLength = element.maxLength;
    if (maxLength && maxLength > 0 && maxLength <= 100) return true;

    return false;
  },

  isComplexQuestion(element, labelText) {
    const tagName = element.tagName.toLowerCase();
    const inputType = element.type?.toLowerCase();

    if (tagName === 'textarea') {
      const rows = element.rows || 1;
      if (rows >= 3) return true;
    }

    const maxLength = element.maxLength;
    if (maxLength && maxLength > 200) return true;

    const checkText = labelText.toLowerCase();
    for (const pattern of this.complexQuestionPatterns) {
      if (pattern.test(checkText)) return true;
    }

    return false;
  },

  classifyField(element, detectedType, labelText) {
    if (this.isSimpleField(detectedType, element)) {
      return { type: 'simple', useAI: false };
    }

    if (this.isComplexQuestion(element, labelText)) {
      return { type: 'complex', useAI: true, questionText: labelText };
    }

    return { type: 'simple', useAI: false };
  }
};

const WorkdayDropdownAdapter = {
  async selectOption(button, answer) {
    if (!button || !answer) return false;

    try {
      console.log(`[WorkdayAdapter] Attempting to fill: "${answer}"`);

      // 1. Open dropdown with Retry Logic
      let listbox = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        if (attempt > 1) console.log(`[WorkdayAdapter] Retry attempt ${attempt} for "${answer}"...`);

        button.scrollIntoView({ block: 'center' });
        await new Promise(r => setTimeout(r, 150 + (attempt * 50)));

        // Modern React/Workday often needs pointer events
        button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        button.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        button.click();

        // 2. Wait for Dropdown (using Deep Scan)
        const waitForListbox = async (timeout = 2500) => {
          const start = Date.now();
          while (Date.now() - start < timeout) {
            // Use FieldDetector.collectDeep if available, otherwise fallback to querySelectorAll
            let candidates = [];
            if (typeof FieldDetector !== 'undefined' && FieldDetector.collectDeep) {
              candidates = FieldDetector.collectDeep(document, '[role="listbox"], [role="menu"], ul[class*="Dropdown"], div[data-automation-id="popup-content"]');
            } else {
              candidates = Array.from(document.querySelectorAll('[role="listbox"], [role="menu"], ul[class*="Dropdown"], div[data-automation-id="popup-content"]'));
            }

            const listbox = candidates.find(el => {
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && (el.children.length > 0 || el.innerText.length > 0);
            });

            if (listbox) return listbox;
            await new Promise(r => setTimeout(r, 100));
          }
          return null;
        };

        listbox = await waitForListbox(2000);
        if (listbox) break;
      }

      if (!listbox) {
        console.warn('[WorkdayAdapter] Listbox not found after 3 attempts.');
        return false;
      }

      // 3. Find matching option (Deep Scan inside listbox)
      // Sometimes options are nested deep in the listbox container
      let options = [];
      if (typeof FieldDetector !== 'undefined' && FieldDetector.collectDeep) {
        options = FieldDetector.collectDeep(listbox, '[role="option"], [role="menuitem"], li, [class*="option"], div[id*="option"]');
      } else {
        options = Array.from(listbox.querySelectorAll('[role="option"], [role="menuitem"], li, [class*="option"], div[id*="option"]'));
      }

      const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
      const normalizedAnswer = normalize(answer);

      let option = options.find(opt => {
        const optText = normalize(opt.innerText);
        return optText === normalizedAnswer ||
          optText.includes(normalizedAnswer) ||
          normalizedAnswer.includes(optText);
      });

      // Yes/No fallback logic
      if (!option) {
        const isYes = ApplicationQuestionFiller.isAffirmativeAnswer ? ApplicationQuestionFiller.isAffirmativeAnswer(answer) : ['yes', 'y'].includes(normalizedAnswer);
        const patterns = isYes ? ['yes', 'ido', 'iam', 'ihave', 'agree', 'authorize', 'consent'] : ['no', 'idonot', 'iamnot', 'disagree', 'decline'];

        option = options.find(opt => {
          const optText = normalize(opt.innerText);
          return patterns.some(p => optText === p || optText.startsWith(p));
        });
      }

      if (option) {
        console.log(`[WorkdayAdapter] Clicking option: "${option.innerText}"`);
        option.scrollIntoView({ block: 'nearest' });

        option.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        option.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        option.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        option.click();

        // Trigger blur/change events to notify logic
        await new Promise(r => setTimeout(r, 50));
        button.dispatchEvent(new Event('change', { bubbles: true }));
        button.blur();
        return true;
      } else {
        console.warn(`[WorkdayAdapter] Option not found for "${answer}" in listbox of ${options.length} items`);
      }

      return false;
    } catch (e) {
      console.error('[WorkdayAdapter] Error:', e);
      return false;
    }
  }
};

const ApplicationQuestionFiller = {
  async tryFill(element, profile, applicationQuestions = {}) {
    try {
      if (typeof ApplicationQuestions === 'undefined') return null;

      // User's surgical approach: find the fieldset context
      const fieldset = element.closest('fieldset');
      const button = element.tagName.toLowerCase() === 'button' ? element : fieldset?.querySelector('button[aria-haspopup="listbox"]');

      // 1. Get descriptive text for matching (prefer fieldset text for dropdowns)
      const targetForText = fieldset || element;
      const text = typeof extractQuestionText !== 'undefined' ? extractQuestionText(targetForText) : '';

      // 2. See if ApplicationQuestions knows about this
      const detection = ApplicationQuestions.detectQuestion(text);
      if (!detection || detection.confidence < 0.4) return null;

      const questionKey = detection.questionKey;
      const value = ApplicationQuestions.getAnswer(questionKey, applicationQuestions);
      if (!value) return null;

      console.log(`[AppQ] Success: ${questionKey} detected (conf: ${detection.confidence.toFixed(2)}). Filling: ${value}`);

      // 3. WORKDAY UI ACTION (Dropdown buttons)
      if (button && button.getAttribute('aria-haspopup') === 'listbox') {
        const success = await WorkdayDropdownAdapter.selectOption(button, value);
        if (success) {
          return { filled: true, value };
        }
      }

      // 4. Standard Element Filling (Fallback)
      const tagName = element.tagName.toLowerCase();
      const inputType = element.type?.toLowerCase();

      if (tagName === 'select') {
        const matchedValue = ApplicationQuestions.matchSelectOption(Array.from(element.options), value);
        if (matchedValue !== null) {
          FormFiller.setSelectValue(element, matchedValue);
          return { filled: true, value: matchedValue };
        }
      } else if (inputType === 'radio') {
        const radioGroup = document.querySelectorAll(`input[type="radio"][name="${element.name}"]`);
        FormFiller.setRadioValue(radioGroup, value);
        return { filled: true, value };
      } else if (inputType === 'checkbox') {
        const shouldCheck = this.isAffirmativeAnswer(value);
        FormFiller.setCheckboxValue(element, shouldCheck);
        return { filled: true, value: shouldCheck };
      } else if (tagName === 'input' || tagName === 'textarea') {
        FormFiller.setFieldValue(element, value);
        return { filled: true, value };
      }

      return null;
    } catch (e) {
      console.warn('[AppQ] Error in tryFill:', e);
      return null;
    }
  },

  async fillAllQuestions(profile, applicationQuestions = {}) {
    if (!FieldDetector.detectApplicationQuestions) return;

    const questions = FieldDetector.detectApplicationQuestions(document);

    if (!questions.length) {
      console.log('[AppQ] No application questions detected');
      return;
    }

    console.log(`[AppQ] Detected ${questions.length} Workday application questions`);

    for (const q of questions) {
      try {
        // 2. See if ApplicationQuestions knows about this
        const match = ApplicationQuestions.detectQuestion(q.questionText);
        if (!match) {
          console.log(`[AppQ] Skipped: No match for "${q.questionText.substring(0, 50)}..."`);
          continue;
        }

        const answer = applicationQuestions[match.questionKey] || match.question.defaultAnswer;
        if (!answer) {
          console.log(`[AppQ] Skipped: No answer found for ${match.questionKey}`);
          continue;
        }

        // Use the button from the detection object
        if (q.button || q.element) {
          const target = q.button || q.element;
          console.log(`[AppQ] Match found: "${match.questionKey}" (Confidence: ${match.confidence.toFixed(2)}) -> Answer: "${answer}"`);
          await WorkdayDropdownAdapter.selectOption(target, answer);
          await new Promise(r => setTimeout(r, 400));
        }
      } catch (err) {
        console.warn('[AppQ] Error filling block:', err);
      }
    }
    console.log('[AppQ] Dedicated Application Question pass completed.');
  },

  isAffirmativeAnswer(answer) {
    if (!answer) return false;
    const lower = answer.toLowerCase().trim();
    return ['yes', 'y', 'true', 'agree', 'authorize', 'i do', 'i am', 'i have', 'consent'].some(p => lower.includes(p));
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fillAll' || message.action === 'fillAllSmart' || message.action === 'fillAllAI') {
    (async () => {
      try {
        // 1. Fetch ALL data first
        const storage = await chrome.storage.local.get(['formfill_user_profile', 'application_questions']);
        const userProfile = storage.formfill_user_profile || {};
        const applicationQuestions = storage.application_questions || {};
        const profile = FakeDataGenerator.generateProfile();

        // 2. 🔥 DEDICATED PASS (Independent parallel pipeline)
        if (typeof ApplicationQuestionFiller !== 'undefined') {
          await ApplicationQuestionFiller.fillAllQuestions(profile, applicationQuestions);
        }

        // 3. MAIN PASS
        let result = { success: true };
        if (message.action === 'fillAll') {
          result = FormFiller.fillAllForms(profile, null, applicationQuestions);
        } else {
          if (message.action === 'fillAllAI') {
            await SmartFiller.saveSettings({ mode: 'ai', useCache: true, autoDetectLongForm: true });
          }
          result = await SmartFiller.fillAllForms(profile);
        }

        // 4. FILE UPLOAD
        if (userProfile.resumeFile) {
          const filesUploaded = await FormFiller.fillFileInputs(userProfile.resumeFile);
          result.filesUploaded = filesUploaded;
        }

        sendResponse(result);
      } catch (error) {
        console.error('[FormFill] Fill error:', error);
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true;
  } else if (message.action === 'analyzeFormSmart') {
    (async () => {
      try {
        const analysis = await SmartFiller.analyzeForm();
        sendResponse(analysis);
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true;
  } else if (message.action === 'getFields') {
    const fields = FieldDetector.getAllFields().map(f => ({
      id: f.id,
      name: f.name,
      type: f.type,
      detectedType: f.detectedType,
      label: f.label,
      tagName: f.tagName
    }));
    sendResponse(fields);
  } else if (message.action === 'applyTemplate') {
    const profile = FakeDataGenerator.generateProfile();
    FormFiller.applyTemplate(message.template, profile);
    sendResponse({ success: true });
  } else if (message.action === 'fillField') {
    const profile = FakeDataGenerator.generateProfile();
    const fields = FieldDetector.getAllFields();
    const field = fields.find(f =>
      f.id === message.fieldId || f.name === message.fieldName
    );
    if (field) {
      FormFiller.fillField(field.element, message.fieldType || field.detectedType, profile);
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: 'Field not found' });
    }
  } else if (message.action === 'checkSwagger') {
    const isSwagger = typeof SwaggerDetector !== 'undefined' && SwaggerDetector.isSwaggerPage();
    const operations = isSwagger ? SwaggerDetector.getExpandedOperations() : [];
    sendResponse({
      isSwagger,
      operationsCount: operations.length,
      operations: operations.map(op => ({
        method: op.method,
        path: op.path,
        hasBody: !!op.bodyEditor,
        hasParams: op.parameters?.length > 0,
        hasSchema: !!op.schema
      }))
    });
  } else if (message.action === 'fillSwagger') {
    if (typeof SwaggerFiller !== 'undefined') {
      const results = SwaggerFiller.fillAllExpandedOperations();
      sendResponse({
        success: true,
        filled: results.filter(r => r.filled).length,
        total: results.length,
        details: results
      });
    } else {
      sendResponse({ success: false, error: 'Swagger module not loaded' });
    }
  } else if (message.action === 'fillSwaggerOperation') {
    if (typeof SwaggerDetector !== 'undefined' && typeof SwaggerFiller !== 'undefined') {
      const operations = SwaggerDetector.getExpandedOperations();
      const op = operations.find(o => o.path === message.path && o.method === message.method);
      if (op) {
        const result = SwaggerFiller.fillOperation(op);
        sendResponse({ success: true, filled: result.body || result.params });
      } else {
        sendResponse({ success: false, error: 'Operation not found' });
      }
    } else {
      sendResponse({ success: false, error: 'Swagger module not loaded' });
    }
  } else if (message.action === 'openWidget') {
    FormFillWidget.show();
    sendResponse({ success: true });
  } else if (message.action === 'closeWidget') {
    FormFillWidget.hide();
    sendResponse({ success: true });
  }
  return true;
});

const FormFillWidget = {
  isVisible: false,
  container: null,

  create() {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'formfill-pro-widget';
    this.container.innerHTML = `
      <div class="formfill-widget-header">
        <span class="formfill-widget-title">FormFill Pro</span>
        <button class="formfill-widget-close" title="Close">x</button>
      </div>
      <div class="formfill-widget-body">
        <div class="formfill-widget-modes">
          <button class="formfill-mode-btn" data-mode="quick" title="Random fake data">Quick</button>
          <button class="formfill-mode-btn active" data-mode="smart" title="Smart templates">Smart</button>
          <button class="formfill-mode-btn" data-mode="ai" title="AI responses">AI</button>
        </div>
        <button class="formfill-fill-btn">Fill All Forms</button>
        <div class="formfill-widget-status"></div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #formfill-pro-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 280px;
        background: #1a1a2e;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 2147483647;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #fff;
        overflow: hidden;
        transition: transform 0.2s, opacity 0.2s;
      }
      #formfill-pro-widget.hidden {
        transform: translateY(20px);
        opacity: 0;
        pointer-events: none;
      }
      .formfill-widget-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #16213e;
        cursor: move;
      }
      .formfill-widget-title {
        font-weight: 600;
        font-size: 14px;
      }
      .formfill-widget-close {
        background: none;
        border: none;
        color: #888;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        line-height: 1;
      }
      .formfill-widget-close:hover {
        color: #fff;
      }
      .formfill-widget-body {
        padding: 16px;
      }
      .formfill-widget-modes {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }
      .formfill-mode-btn {
        flex: 1;
        padding: 8px;
        border: 1px solid #333;
        background: #0f0f1a;
        color: #888;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }
      .formfill-mode-btn:hover {
        border-color: #4361ee;
        color: #fff;
      }
      .formfill-mode-btn.active {
        background: #4361ee;
        border-color: #4361ee;
        color: #fff;
      }
      .formfill-fill-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .formfill-fill-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(67, 97, 238, 0.4);
      }
      .formfill-fill-btn:active {
        transform: translateY(0);
      }
      .formfill-widget-status {
        margin-top: 12px;
        font-size: 12px;
        color: #888;
        text-align: center;
        min-height: 20px;
      }
      .formfill-widget-status.success {
        color: #4ade80;
      }
      .formfill-widget-status.error {
        color: #f87171;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.container);

    this.setupEventListeners();
    this.loadState();
  },

  setupEventListeners() {
    const closeBtn = this.container.querySelector('.formfill-widget-close');
    closeBtn.addEventListener('click', () => this.hide());

    const modeButtons = this.container.querySelectorAll('.formfill-mode-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.saveState();
      });
    });

    const fillBtn = this.container.querySelector('.formfill-fill-btn');
    fillBtn.addEventListener('click', () => this.fillForms());

    this.makeDraggable();
  },

  makeDraggable() {
    const header = this.container.querySelector('.formfill-widget-header');
    let isDragging = false;
    let startX, startY, startLeft, startBottom;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = this.container.getBoundingClientRect();
      startLeft = rect.left;
      startBottom = window.innerHeight - rect.bottom;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      this.container.style.left = `${startLeft + dx}px`;
      this.container.style.bottom = `${startBottom - dy}px`;
      this.container.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  },

  async loadState() {
    try {
      const result = await chrome.storage.local.get(['formfill_fill_mode', 'formfill_widget_visible']);
      const mode = result.formfill_fill_mode || 'smart';
      const modeButtons = this.container.querySelectorAll('.formfill-mode-btn');
      modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
    } catch (e) { }
  },

  async saveState() {
    try {
      const activeBtn = this.container.querySelector('.formfill-mode-btn.active');
      const mode = activeBtn?.dataset.mode || 'smart';
      await chrome.storage.local.set({ formfill_fill_mode: mode });
    } catch (e) { }
  },

  async fillForms() {
    const statusEl = this.container.querySelector('.formfill-widget-status');
    const fillBtn = this.container.querySelector('.formfill-fill-btn');
    const activeBtn = this.container.querySelector('.formfill-mode-btn.active');
    const mode = activeBtn?.dataset.mode || 'smart';

    fillBtn.disabled = true;
    fillBtn.textContent = 'Filling...';
    statusEl.className = 'formfill-widget-status';
    statusEl.textContent = '';

    try {
      let userProfile = {};
      try {
        const result = await chrome.storage.local.get(['formfill_user_profile']);
        userProfile = result.formfill_user_profile || {};
      } catch (e) { }

      const profile = this.buildProfileFromUserData(userProfile);

      // Call the centralized filler
      const result = await FormFiller.fillAllForms(profile, {
        mode: mode,
        applicationQuestions: typeof ApplicationQuestionsFiller !== 'undefined' ? (await chrome.storage.local.get('formfill_application_questions')).formfill_application_questions : null
      });

      statusEl.className = 'formfill-widget-status success';
      statusEl.textContent = `Success! Filled ${result.fieldsCount} fields`;
    } catch (error) {
      statusEl.className = 'formfill-widget-status error';
      statusEl.textContent = 'Error: ' + error.message;
    }

    fillBtn.disabled = false;
    fillBtn.textContent = 'Fill All Forms';
  },

  async getAIResponse(questionText, userProfile, aiSettings) {
    const prompt = `You are helping someone fill out a form. Write a professional, authentic response.

USER PROFILE:
Name: ${userProfile.firstName || ''} ${userProfile.lastName || ''}
Title: ${userProfile.currentTitle || 'Professional'}
Company: ${userProfile.currentCompany || ''}
Experience: ${userProfile.yearsExperience || '5+'} years
Skills: ${userProfile.skills?.join(', ') || 'communication, problem-solving'}
${userProfile.summary ? 'Summary: ' + userProfile.summary : ''}

QUESTION: ${questionText}

Write a professional response in first person. Be concise but substantive. Respond with ONLY the answer text.`;

    let response;

    if (aiSettings.provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiSettings.apiKey}`
        },
        body: JSON.stringify({
          model: aiSettings.model || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
          temperature: 0.7
        })
      });
      if (res.ok) {
        const data = await res.json();
        response = data.choices[0]?.message?.content?.trim();
      }
    } else if (aiSettings.provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': aiSettings.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: aiSettings.model || 'claude-3-5-haiku-20241022',
          max_tokens: 500,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      if (res.ok) {
        const data = await res.json();
        response = data.content[0]?.text?.trim();
      }
    } else if (aiSettings.provider === 'gemini') {
      const model = aiSettings.model || 'gemini-2.0-flash';
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${aiSettings.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
        })
      });
      if (res.ok) {
        const data = await res.json();
        response = data.candidates[0]?.content?.parts[0]?.text?.trim();
      }
    }

    return response;
  },

  show() {
    this.create();
    this.container.classList.remove('hidden');
    this.isVisible = true;
  },

  hide() {
    if (this.container) {
      this.container.classList.add('hidden');
    }
    this.isVisible = false;
  },

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  },

  buildProfileFromUserData(userProfile) {
    const workExp = userProfile.workExperience || [];
    const education = userProfile.education || [];
    const mostRecentJob = workExp.length > 0 ? workExp[0] : null;
    const mostRecentEdu = education.length > 0 ? education[0] : null;

    const firstName = userProfile.firstName || FakeDataGenerator.firstName();
    const lastName = userProfile.lastName || FakeDataGenerator.lastName();

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: userProfile.email || FakeDataGenerator.email(firstName, lastName),
      phone: userProfile.phone || FakeDataGenerator.phone(),
      username: FakeDataGenerator.username(firstName, lastName),
      password: FakeDataGenerator.password(),
      birthDate: FakeDataGenerator.birthDate(),
      age: FakeDataGenerator.age(),
      gender: FakeDataGenerator.gender(),
      address: {
        street: userProfile.address || FakeDataGenerator.streetAddress(),
        city: userProfile.city || FakeDataGenerator.city(),
        state: userProfile.state || FakeDataGenerator.state(),
        stateAbbr: userProfile.state || FakeDataGenerator.state(true),
        zipCode: userProfile.zipCode || FakeDataGenerator.zipCode(),
        country: userProfile.country || FakeDataGenerator.country()
      },
      company: mostRecentJob?.company || userProfile.currentCompany || FakeDataGenerator.company(),
      jobTitle: mostRecentJob?.title || userProfile.currentTitle || FakeDataGenerator.jobTitle(),
      website: userProfile.portfolio || FakeDataGenerator.website(),
      linkedIn: userProfile.linkedIn || FakeDataGenerator.linkedIn(firstName, lastName),
      workExperience: workExp,
      education: education,
      skills: userProfile.skills || [],
      summary: userProfile.summary || '',
      yearsExperience: userProfile.yearsExperience || '',
      industry: userProfile.industry || '',
      resume: userProfile.resume || '',
      coverLetter: userProfile.coverLetter || ''
    };
  }
};

const InlineAIButtons = {
  buttons: new Map(),
  styleInjected: false,
  isAIModeEnabled: false,

  async init() {
    await this.checkAIMode();
    this.injectStyles();
    if (this.isAIModeEnabled) {
      this.scanAndAddButtons();
    }
    this.observeDOM();
    this.listenForModeChanges();
  },

  async checkAIMode() {
    try {
      const result = await chrome.storage.local.get(['formfill_fill_mode']);
      this.isAIModeEnabled = result.formfill_fill_mode === 'ai';
    } catch (e) {
      this.isAIModeEnabled = false;
    }
  },

  listenForModeChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.formfill_fill_mode) {
        this.isAIModeEnabled = changes.formfill_fill_mode.newValue === 'ai';
        if (this.isAIModeEnabled) {
          this.scanAndAddButtons();
        } else {
          this.removeAllButtons();
        }
      }
    });
  },

  injectStyles() {
    if (this.styleInjected) return;
    this.styleInjected = true;

    const style = document.createElement('style');
    style.id = 'formfill-inline-ai-styles';
    style.textContent = `
      .formfill-ai-btn {
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4361ee, #3a0ca3);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.4);
        transition: transform 0.2s, box-shadow 0.2s;
        z-index: 10000;
        padding: 0;
      }
      .formfill-ai-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(67, 97, 238, 0.6);
      }
      .formfill-ai-btn:active {
        transform: scale(0.95);
      }
      .formfill-ai-btn.loading {
        pointer-events: none;
        opacity: 0.8;
      }
      .formfill-ai-btn svg {
        width: 14px;
        height: 14px;
        fill: white;
      }
      .formfill-ai-btn .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: formfill-spin 0.8s linear infinite;
      }
      @keyframes formfill-spin {
        to { transform: rotate(360deg); }
      }
      .formfill-ai-btn.success {
        background: linear-gradient(135deg, #10b981, #059669);
      }
    `;
    document.head.appendChild(style);
  },

  isAICandidate(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea') return true;
    if (tagName === 'input') {
      const type = (element.type || 'text').toLowerCase();
      if (type === 'text' || type === 'search') {
        const maxLength = element.maxLength;
        if (!maxLength || maxLength === -1 || maxLength > 100) return true;
      }
    }
    return false;
  },

  scanAndAddButtons() {
    const allFields = document.querySelectorAll('input, textarea');
    allFields.forEach(field => {
      if (this.isAICandidate(field) && !this.buttons.has(field)) {
        this.addButton(field);
      }
    });
  },

  addButton(element) {
    if (this.buttons.has(element)) return;

    const btn = document.createElement('button');
    btn.className = 'formfill-ai-btn';
    btn.type = 'button';
    btn.title = 'Fill with AI';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    `;

    this.positionButton(btn, element);
    document.body.appendChild(btn);
    this.buttons.set(element, btn);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.fillFieldWithAI(element, btn);
    });

    const reposition = () => this.positionButton(btn, element);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);

    const observer = new MutationObserver(reposition);
    observer.observe(element, { attributes: true });
  },

  positionButton(btn, element) {
    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    btn.style.left = `${rect.left + scrollX - 28}px`;
    btn.style.top = `${rect.top + scrollY + 4}px`;

    if (rect.width === 0 || rect.height === 0) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'flex';
    }
  },

  async fillFieldWithAI(element, btn) {
    btn.classList.add('loading');
    btn.innerHTML = '<div class="spinner"></div>';

    try {
      const result = await chrome.storage.local.get(['formfill_user_profile', 'formfill_ai_settings']);
      const userProfile = result.formfill_user_profile || {};
      const aiSettings = result.formfill_ai_settings || {};

      if (!aiSettings.apiKey || aiSettings.apiKey.length < 10) {
        alert('Please configure your AI API key in the FormFill Pro extension settings.');
        this.resetButton(btn);
        return;
      }

      let analysis = null;
      if (typeof SmartAnalyzer !== 'undefined') {
        analysis = SmartAnalyzer.analyzeField(element);
      }

      const fieldAttrs = FieldDetector.getFieldAttributes(element);
      const labelText = fieldAttrs?.label || '';
      const questionText = analysis?.questionText || labelText || 'Please provide a response';
      const category = analysis?.category || 'general';

      const personal = userProfile.personal || {};
      const professional = userProfile.professional || {};
      const career = userProfile.career || {};
      const education = userProfile.education || {};

      const templateProfile = {
        fullName: personal.fullName || `${personal.firstName || ''} ${personal.lastName || ''}`.trim(),
        firstName: personal.firstName || '',
        skills: Array.isArray(professional.skills) ? professional.skills.join(', ') : (professional.skills || ''),
        industry: professional.industry || '',
        yearsExperience: professional.yearsExperience || '',
        currentTitle: professional.currentTitle || '',
        currentCompany: professional.currentCompany || '',
        summary: career.summary || '',
        goals: career.goals || '',
        degree: education.highestDegree || '',
        university: education.university || '',
        major: education.major || ''
      };

      const profileSections = [];
      if (templateProfile.fullName) profileSections.push(`Name: ${templateProfile.fullName}`);
      if (templateProfile.currentTitle) profileSections.push(`Current Role: ${templateProfile.currentTitle}`);
      if (templateProfile.currentCompany) profileSections.push(`Company: ${templateProfile.currentCompany}`);
      if (templateProfile.yearsExperience) profileSections.push(`Years of Experience: ${templateProfile.yearsExperience}`);
      if (templateProfile.industry) profileSections.push(`Industry: ${templateProfile.industry}`);
      if (templateProfile.skills) profileSections.push(`Key Skills: ${templateProfile.skills}`);
      if (templateProfile.degree) profileSections.push(`Education: ${templateProfile.degree}${templateProfile.major ? ' in ' + templateProfile.major : ''}${templateProfile.university ? ' from ' + templateProfile.university : ''}`);
      if (templateProfile.summary) profileSections.push(`Professional Summary: ${templateProfile.summary}`);
      if (templateProfile.goals) profileSections.push(`Career Goals: ${templateProfile.goals}`);

      const prompt = `Write a response for a job application form field. You must write as the actual applicant using their real information.

APPLICANT'S RESUME/PROFILE:
${profileSections.length > 0 ? profileSections.join('\n') : 'No profile data available - write a brief generic professional response'}

FORM FIELD: ${questionText}
FIELD TYPE: ${category}

CRITICAL RULES:
- Write in first person as this specific applicant
- Use ONLY the information provided above - do not invent details
- NEVER use placeholder text like "[mention X]" or "[insert Y]" - write complete sentences
- NEVER use generic phrases like "a specific aspect" or "a relevant experience"
- Sound natural and human, not like a template
- Be specific and concrete using the applicant's actual skills/experience listed above
- Keep it concise (2-4 sentences for most fields)
- No greetings, sign-offs, or meta-commentary

Respond with ONLY the answer text:`;

      let aiResponse = null;

      if (aiSettings.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${aiSettings.apiKey}`
          },
          body: JSON.stringify({
            model: aiSettings.model || 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.7
          })
        });
        if (response.ok) {
          const data = await response.json();
          aiResponse = data.choices[0]?.message?.content?.trim();
        }
      } else if (aiSettings.provider === 'anthropic') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': aiSettings.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: aiSettings.model || 'claude-3-5-haiku-20241022',
            max_tokens: 500,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        if (response.ok) {
          const data = await response.json();
          aiResponse = data.content[0]?.text?.trim();
        }
      } else if (aiSettings.provider === 'gemini') {
        const model = aiSettings.model || 'gemini-2.0-flash';
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${aiSettings.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
          })
        });
        if (response.ok) {
          const data = await response.json();
          aiResponse = data.candidates[0]?.content?.parts[0]?.text?.trim();
        }
      }

      if (aiResponse) {
        FormFiller.setFieldValue(element, aiResponse);
        btn.classList.add('success');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        `;
        setTimeout(() => this.resetButton(btn), 2000);
      } else {
        alert('AI response failed. Please check your API settings.');
        this.resetButton(btn);
      }
    } catch (error) {
      console.error('AI fill error:', error);
      alert('Error filling field with AI: ' + error.message);
      this.resetButton(btn);
    }
  },

  resetButton(btn) {
    btn.classList.remove('loading', 'success');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    `;
  },

  observeDOM() {
    const observer = new MutationObserver(() => {
      if (this.isAIModeEnabled) {
        this.scanAndAddButtons();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },

  removeAllButtons() {
    this.buttons.forEach((btn) => btn.remove());
    this.buttons.clear();
  }
};

setTimeout(() => {
  InlineAIButtons.init();
}, 1000);

let contextMenuField = null;

document.addEventListener('contextmenu', (e) => {
  const target = e.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
    contextMenuField = target;
    chrome.runtime.sendMessage({ action: 'showContextMenu', fieldType: FieldDetector.detectFieldType(target) });
  }
});

console.log('FormFill Pro: Content script loaded');
