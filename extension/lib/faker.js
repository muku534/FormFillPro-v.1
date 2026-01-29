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
    'Park', 'River', 'Forest', 'Spring', 'Valley', 'Sunset', 'Highland', 'Meadow',
    'Church', 'Mill', 'Willow', 'Center', 'North', 'South', 'East', 'West'
  ],

  streetTypes: ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Ct', 'Pl', 'Cir'],

  cities: [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle',
    'Denver', 'Boston', 'Portland', 'Nashville', 'Atlanta', 'Miami', 'Detroit'
  ],

  states: [
    { name: 'California', abbr: 'CA' }, { name: 'Texas', abbr: 'TX' },
    { name: 'Florida', abbr: 'FL' }, { name: 'New York', abbr: 'NY' },
    { name: 'Pennsylvania', abbr: 'PA' }, { name: 'Illinois', abbr: 'IL' },
    { name: 'Ohio', abbr: 'OH' }, { name: 'Georgia', abbr: 'GA' },
    { name: 'North Carolina', abbr: 'NC' }, { name: 'Michigan', abbr: 'MI' },
    { name: 'New Jersey', abbr: 'NJ' }, { name: 'Virginia', abbr: 'VA' },
    { name: 'Washington', abbr: 'WA' }, { name: 'Arizona', abbr: 'AZ' },
    { name: 'Massachusetts', abbr: 'MA' }, { name: 'Tennessee', abbr: 'TN' },
    { name: 'Indiana', abbr: 'IN' }, { name: 'Missouri', abbr: 'MO' },
    { name: 'Maryland', abbr: 'MD' }, { name: 'Wisconsin', abbr: 'WI' }
  ],

  companies: [
    'Acme Corp', 'GlobalTech Solutions', 'Innovate Inc', 'TechVentures', 'DataFlow Systems',
    'CloudScale', 'NextGen Software', 'Digital Dynamics', 'CyberCore', 'FutureTech',
    'AlphaWave', 'BlueSky Industries', 'Catalyst Labs', 'Quantum Innovations', 'Stellar Systems'
  ],

  domains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'mail.com'],

  jobTitles: [
    'Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer', 'DevOps Engineer',
    'QA Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Project Manager', 'Business Analyst', 'Technical Lead', 'System Administrator',
    'Database Administrator', 'Security Engineer', 'Cloud Architect', 'Scrum Master'
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
    const patterns = [
      `${fn}.${ln}`,
      `${fn}${ln}`,
      `${fn}_${ln}`,
      `${fn}${this.randomInt(1, 99)}`,
      `${fn}.${ln}${this.randomInt(1, 99)}`
    ];
    return `${this.random(patterns)}@${domain}`;
  },

  phone() {
    const formats = [
      () => `(${this.randomInt(200, 999)}) ${this.randomInt(200, 999)}-${this.randomInt(1000, 9999)}`,
      () => `${this.randomInt(200, 999)}-${this.randomInt(200, 999)}-${this.randomInt(1000, 9999)}`,
      () => `${this.randomInt(200, 999)}.${this.randomInt(200, 999)}.${this.randomInt(1000, 9999)}`,
      () => `+1${this.randomInt(200, 999)}${this.randomInt(200, 999)}${this.randomInt(1000, 9999)}`
    ];
    return this.random(formats)();
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

  fullAddress() {
    return `${this.streetAddress()}, ${this.city()}, ${this.state(true)} ${this.zipCode()}`;
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
    const patterns = [
      `${fn}${ln}`,
      `${fn}_${ln}`,
      `${fn}${this.randomInt(1, 999)}`,
      `${ln}${fn.charAt(0)}`,
      `${fn.charAt(0)}${ln}${this.randomInt(1, 99)}`
    ];
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

  creditCardFormatted() {
    const cc = this.creditCard();
    return `${cc.slice(0, 4)} ${cc.slice(4, 8)} ${cc.slice(8, 12)} ${cc.slice(12)}`;
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
    const tlds = ['.com', '.net', '.org', '.io', '.co'];
    const name = this.random(this.companies).toLowerCase().replace(/\s+/g, '');
    return `https://www.${name}${this.random(tlds)}`;
  },

  ipAddress() {
    return `${this.randomInt(1, 255)}.${this.randomInt(0, 255)}.${this.randomInt(0, 255)}.${this.randomInt(1, 255)}`;
  },

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  paragraph() {
    const sentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
      'Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet.',
      'Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus.',
      'At varius vel pharetra vel turpis nunc eget lorem dolor.'
    ];
    const count = this.randomInt(3, 6);
    const selected = [];
    for (let i = 0; i < count; i++) {
      selected.push(this.random(sentences));
    }
    return selected.join(' ');
  },

  sentence() {
    const subjects = ['The developer', 'A user', 'The system', 'An engineer', 'The application'];
    const verbs = ['creates', 'updates', 'manages', 'processes', 'validates'];
    const objects = ['data efficiently', 'forms automatically', 'tests quickly', 'inputs correctly', 'records securely'];
    return `${this.random(subjects)} ${this.random(verbs)} ${this.random(objects)}.`;
  },

  age(min = 18, max = 80) {
    return this.randomInt(min, max);
  },

  gender() {
    return this.random(['Male', 'Female', 'Other', 'Prefer not to say']);
  },

  country() {
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'Brazil', 'India', 'Mexico', 'Spain', 'Italy'
    ];
    return this.random(countries);
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
      website: this.website()
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FakeDataGenerator;
}
