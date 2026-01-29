class PopupController {
  constructor() {
    this.currentTab = 'fill';
    this.detectedFields = [];
    this.isSwaggerPage = false;
    this.swaggerOperations = [];
    this.dataSource = 'generated';
    this.datasets = {};
    this.currentDataset = null;
    this.currentRowIndex = 0;
    this.fillMode = 'smart';
    this.userProfile = null;
    this.aiSettings = null;
    this.templates = {};
    this.applicationQuestions = {};
    this.init();
  }

  async init() {
    await this.loadSettings();
    await this.loadDatasets();
    await this.loadUserProfile();
    await this.loadAISettings();
    await this.loadFillMode();
    await this.loadTemplates();
    await this.loadApplicationQuestions();
    this.setupEventListeners();
    this.scanCurrentPage();
    this.checkSwaggerPage();
    this.updateFillModeUI();
    this.updateProfileCompleteness();
    this.renderTemplatesList();
  }

  setupEventListeners() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    document.getElementById('fill-all-btn').addEventListener('click', () => this.fillAllForms());
    document.getElementById('refresh-fields').addEventListener('click', () => this.scanCurrentPage());

    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => this.quickFill(btn.dataset.type));
    });

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setFillMode(btn.dataset.mode));
    });

    document.getElementById('locale-select').addEventListener('change', (e) => this.saveSetting('locale', e.target.value));
    document.getElementById('password-length').addEventListener('change', (e) => this.saveSetting('passwordLength', e.target.value));
    document.getElementById('fill-delay').addEventListener('change', (e) => this.saveSetting('fillDelay', e.target.value));
    document.getElementById('auto-submit').addEventListener('change', (e) => this.saveSetting('showAnimation', e.target.checked));
    document.getElementById('context-menu').addEventListener('change', (e) => this.saveSetting('contextMenu', e.target.checked));

    document.getElementById('export-templates').addEventListener('click', () => this.exportProfile());
    document.getElementById('import-templates').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', (e) => this.importProfile(e));
    document.getElementById('clear-data').addEventListener('click', () => this.clearAllData());

    document.getElementById('fill-swagger-btn').addEventListener('click', () => this.fillSwagger());

    document.querySelectorAll('input[name="data-source"]').forEach(radio => {
      radio.addEventListener('change', (e) => this.setDataSource(e.target.value));
    });

    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('data-file-input');

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) this.handleFileUpload(file);
    });
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.handleFileUpload(file);
      e.target.value = '';
    });

    document.getElementById('prev-row').addEventListener('click', () => this.previousRow());
    document.getElementById('next-row').addEventListener('click', () => this.nextRow());
    document.getElementById('clear-dataset').addEventListener('click', () => this.clearActiveDataset());

    document.getElementById('save-profile-btn').addEventListener('click', () => this.saveUserProfile());

    const profileFields = ['profile-firstName', 'profile-lastName', 'profile-email', 'profile-phone',
      'profile-title', 'profile-company', 'profile-experience', 'profile-industry', 'profile-skills', 'profile-summary'];
    profileFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.updateProfileCompleteness());
      }
    });

    document.getElementById('ai-provider').addEventListener('change', (e) => this.updateAIProvider(e.target.value));
    document.getElementById('ai-model').addEventListener('change', () => this.saveAISettings());
    document.getElementById('ai-api-key').addEventListener('change', () => this.saveAISettings());
    document.getElementById('test-ai-connection').addEventListener('click', () => this.testAIConnection());
    document.getElementById('toggle-key-visibility').addEventListener('click', () => this.toggleKeyVisibility());

    document.getElementById('save-template-btn').addEventListener('click', () => this.saveCurrentTemplate());

    document.getElementById('create-template-btn').addEventListener('click', () => this.openTemplateModal());
    document.getElementById('close-template-modal').addEventListener('click', () => this.closeTemplateModal());
    document.getElementById('cancel-template').addEventListener('click', () => this.closeTemplateModal());
    document.getElementById('save-template-modal').addEventListener('click', () => this.saveTemplateFromModal());
    document.getElementById('add-template-field').addEventListener('click', () => this.addTemplateField());
    document.getElementById('get-current-url').addEventListener('click', () => this.getCurrentUrlForTemplate());

    document.getElementById('template-modal').addEventListener('click', (e) => {
      if (e.target.id === 'template-modal') this.closeTemplateModal();
    });

    document.getElementById('upload-resume-btn').addEventListener('click', () => {
      document.getElementById('resume-file-input').click();
    });
    document.getElementById('resume-file-input').addEventListener('change', (e) => this.handleResumeUpload(e));

    document.getElementById('open-widget-btn').addEventListener('click', () => this.openWidgetOnPage());

    document.getElementById('add-experience-btn').addEventListener('click', () => this.addWorkExperience());
    document.getElementById('add-education-btn').addEventListener('click', () => this.addEducation());

    ['profile-resume', 'profile-coverLetter', 'profile-additionalNotes', 'profile-address', 'profile-city',
      'profile-state', 'profile-zipCode', 'profile-country', 'profile-linkedIn', 'profile-portfolio'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('input', () => this.updateProfileCompleteness());
        }
      });

    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => this.toggleAccordion(header));
    });

    document.getElementById('appq-set-defaults').addEventListener('click', () => this.setApplicationQuestionsDefaults());
    document.getElementById('appq-clear-all').addEventListener('click', () => this.clearApplicationQuestions());

    const appqFields = [
      'authorizedToWork', 'requiresSponsorship', 'futureSponsorship',
      'currentlyEmployedAtCompany', 'previouslyEmployedAtCompany', 'previousGovernmentEmployee',
      'isOver18', 'isOver21', 'veteranStatus', 'militarySpouse', 'disabilityStatus', 'gender',
      'salaryExpectation', 'hourlyRate', 'startDate', 'noticePeriod',
      'willingToRelocate', 'canWorkRemote', 'canWorkOnsite', 'canWorkHybrid',
      'availableForTravel', 'travelPercentage',
      'backgroundCheck', 'drugTest', 'hasConvictions', 'disciplinaryActions', 'governmentExclusion',
      'hasDriversLicense', 'hasProfessionalLicense', 'hasSecurityClearance',
      'textAuthorization', 'emailAuthorization', 'howDidYouHear', 'referralName', 'previousApplicant'
    ];
    appqFields.forEach(field => {
      const el = document.getElementById(`appq-${field}`);
      if (el) {
        el.addEventListener('change', () => this.saveApplicationQuestions());
        if (el.tagName === 'INPUT') {
          el.addEventListener('input', () => this.updateAppqPreview());
        }
      }
    });
  }

  toggleAccordion(header) {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open', !isOpen);
  }

  updateAccordionPreviews() {
    const firstName = document.getElementById('profile-firstName')?.value || '';
    const lastName = document.getElementById('profile-lastName')?.value || '';
    const email = document.getElementById('profile-email')?.value || '';
    const personalPreview = document.getElementById('personal-preview');
    if (personalPreview) {
      if (firstName || lastName || email) {
        const parts = [];
        if (firstName || lastName) parts.push(`${firstName} ${lastName}`.trim());
        if (email) parts.push(email);
        personalPreview.textContent = parts.join(', ');
        personalPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        personalPreview.textContent = 'Name, email, phone';
        personalPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const city = document.getElementById('profile-city')?.value || '';
    const state = document.getElementById('profile-state')?.value || '';
    const country = document.getElementById('profile-country')?.value || '';
    const addressPreview = document.getElementById('address-preview');
    if (addressPreview) {
      const loc = [city, state, country].filter(Boolean).join(', ');
      if (loc) {
        addressPreview.textContent = loc;
        addressPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        addressPreview.textContent = 'Location details';
        addressPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const title = document.getElementById('profile-title')?.value || '';
    const company = document.getElementById('profile-company')?.value || '';
    const professionalPreview = document.getElementById('professional-preview');
    if (professionalPreview) {
      if (title || company) {
        const parts = [];
        if (title) parts.push(title);
        if (company) parts.push(`at ${company}`);
        professionalPreview.textContent = parts.join(' ');
        professionalPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        professionalPreview.textContent = 'Role, company, skills';
        professionalPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const expCount = this.userProfile?.workExperience?.length || 0;
    const experiencePreview = document.getElementById('experience-preview');
    if (experiencePreview) {
      if (expCount > 0) {
        experiencePreview.textContent = `${expCount} position${expCount > 1 ? 's' : ''} added`;
        experiencePreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        experiencePreview.textContent = 'Add your work history';
        experiencePreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const eduCount = this.userProfile?.education?.length || 0;
    const educationPreview = document.getElementById('education-preview');
    if (educationPreview) {
      if (eduCount > 0) {
        educationPreview.textContent = `${eduCount} degree${eduCount > 1 ? 's' : ''} added`;
        educationPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        educationPreview.textContent = 'Add your education';
        educationPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const summary = document.getElementById('profile-summary')?.value || '';
    const summaryPreview = document.getElementById('summary-preview');
    if (summaryPreview) {
      if (summary) {
        const truncated = summary.length > 40 ? summary.substring(0, 40) + '...' : summary;
        summaryPreview.textContent = truncated;
        summaryPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        summaryPreview.textContent = 'Professional overview';
        summaryPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const resume = document.getElementById('profile-resume')?.value || '';
    const coverLetter = document.getElementById('profile-coverLetter')?.value || '';
    const documentsPreview = document.getElementById('documents-preview');
    if (documentsPreview) {
      const docs = [];
      if (resume) docs.push('Resume');
      if (coverLetter) docs.push('Cover letter');
      if (docs.length > 0) {
        documentsPreview.textContent = docs.join(', ') + ' added';
        documentsPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        documentsPreview.textContent = 'Resume, cover letter';
        documentsPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    const apiKey = document.getElementById('ai-api-key')?.value || '';
    const aiPreview = document.getElementById('ai-preview');
    if (aiPreview) {
      if (apiKey && apiKey.length > 10) {
        aiPreview.textContent = 'API key configured';
        aiPreview.closest('.accordion-item')?.classList.add('has-data');
      } else {
        aiPreview.textContent = 'Configure API key';
        aiPreview.closest('.accordion-item')?.classList.remove('has-data');
      }
    }

    this.updateAppqPreview();
  }

  async loadApplicationQuestions() {
    const result = await chrome.storage.local.get('formfill_application_questions');
    this.applicationQuestions = result.formfill_application_questions || {};
    this.populateApplicationQuestionsForm();
  }

  populateApplicationQuestionsForm() {
    const aq = this.applicationQuestions;
    const fields = [
      'authorizedToWork', 'requiresSponsorship', 'futureSponsorship',
      'currentlyEmployedAtCompany', 'previouslyEmployedAtCompany', 'previousGovernmentEmployee',
      'isOver18', 'isOver21', 'veteranStatus', 'militarySpouse', 'disabilityStatus', 'gender',
      'salaryExpectation', 'hourlyRate', 'startDate', 'noticePeriod',
      'willingToRelocate', 'canWorkRemote', 'canWorkOnsite', 'canWorkHybrid',
      'availableForTravel', 'travelPercentage',
      'backgroundCheck', 'drugTest', 'hasConvictions', 'disciplinaryActions', 'governmentExclusion',
      'hasDriversLicense', 'hasProfessionalLicense', 'hasSecurityClearance',
      'textAuthorization', 'emailAuthorization', 'howDidYouHear', 'referralName', 'previousApplicant'
    ];

    fields.forEach(field => {
      const el = document.getElementById(`appq-${field}`);
      if (el && aq[field] !== undefined) {
        el.value = aq[field];
      }
    });

    this.updateAppqPreview();
  }

  async saveApplicationQuestions() {
    const fields = [
      'authorizedToWork', 'requiresSponsorship', 'futureSponsorship',
      'currentlyEmployedAtCompany', 'previouslyEmployedAtCompany', 'previousGovernmentEmployee',
      'isOver18', 'isOver21', 'veteranStatus', 'militarySpouse', 'disabilityStatus', 'gender',
      'salaryExpectation', 'hourlyRate', 'startDate', 'noticePeriod',
      'willingToRelocate', 'canWorkRemote', 'canWorkOnsite', 'canWorkHybrid',
      'availableForTravel', 'travelPercentage',
      'backgroundCheck', 'drugTest', 'hasConvictions', 'disciplinaryActions', 'governmentExclusion',
      'hasDriversLicense', 'hasProfessionalLicense', 'hasSecurityClearance',
      'textAuthorization', 'emailAuthorization', 'howDidYouHear', 'referralName', 'previousApplicant'
    ];

    this.applicationQuestions = {};
    fields.forEach(field => {
      const el = document.getElementById(`appq-${field}`);
      if (el && el.value) {
        this.applicationQuestions[field] = el.value;
      }
    });

    await chrome.storage.local.set({ formfill_application_questions: this.applicationQuestions });
    this.updateAppqPreview();
  }

  setApplicationQuestionsDefaults() {
    const defaults = {
      authorizedToWork: 'Yes',
      requiresSponsorship: 'No',
      futureSponsorship: 'No',
      currentlyEmployedAtCompany: 'No',
      previouslyEmployedAtCompany: 'No',
      previousGovernmentEmployee: 'No',
      isOver18: 'Yes',
      isOver21: 'Yes',
      veteranStatus: 'No',
      militarySpouse: 'No',
      disabilityStatus: 'Prefer not to say',
      gender: 'Prefer not to say',
      willingToRelocate: 'Yes',
      canWorkRemote: 'Yes',
      canWorkOnsite: 'Yes',
      canWorkHybrid: 'Yes',
      availableForTravel: 'Yes',
      backgroundCheck: 'Yes',
      drugTest: 'Yes',
      hasConvictions: 'No',
      disciplinaryActions: 'No',
      governmentExclusion: 'No',
      hasDriversLicense: 'Yes',
      hasProfessionalLicense: 'No',
      hasSecurityClearance: 'No',
      textAuthorization: 'Yes',
      emailAuthorization: 'Yes',
      previousApplicant: 'No',
      startDate: 'Immediately',
      noticePeriod: '2 weeks',
      travelPercentage: 'Up to 25%',
      howDidYouHear: 'LinkedIn'
    };

    Object.keys(defaults).forEach(field => {
      const el = document.getElementById(`appq-${field}`);
      if (el) {
        el.value = defaults[field];
      }
    });

    this.saveApplicationQuestions();
    this.showToast('Common defaults applied!');
  }

  clearApplicationQuestions() {
    if (confirm('Clear all application question answers?')) {
      const fields = [
        'authorizedToWork', 'requiresSponsorship', 'futureSponsorship',
        'currentlyEmployedAtCompany', 'previouslyEmployedAtCompany', 'previousGovernmentEmployee',
        'isOver18', 'isOver21', 'veteranStatus', 'militarySpouse', 'disabilityStatus', 'gender',
        'salaryExpectation', 'hourlyRate', 'startDate', 'noticePeriod',
        'willingToRelocate', 'canWorkRemote', 'canWorkOnsite', 'canWorkHybrid',
        'availableForTravel', 'travelPercentage',
        'backgroundCheck', 'drugTest', 'hasConvictions', 'disciplinaryActions', 'governmentExclusion',
        'hasDriversLicense', 'hasProfessionalLicense', 'hasSecurityClearance',
        'textAuthorization', 'emailAuthorization', 'howDidYouHear', 'referralName', 'previousApplicant'
      ];

      fields.forEach(field => {
        const el = document.getElementById(`appq-${field}`);
        if (el) {
          el.value = '';
        }
      });

      this.applicationQuestions = {};
      chrome.storage.local.remove('formfill_application_questions');
      this.updateAppqPreview();
      this.showToast('Application answers cleared');
    }
  }

  updateAppqPreview() {
    const appqPreview = document.getElementById('appq-preview');
    if (!appqPreview) return;

    const filledCount = Object.keys(this.applicationQuestions || {}).filter(k => this.applicationQuestions[k]).length;
    if (filledCount > 0) {
      appqPreview.textContent = `${filledCount} answer${filledCount > 1 ? 's' : ''} configured`;
      appqPreview.closest('.accordion-item')?.classList.add('has-data');
    } else {
      appqPreview.textContent = 'Common job application answers';
      appqPreview.closest('.accordion-item')?.classList.remove('has-data');
    }
  }

  async loadFillMode() {
    const result = await chrome.storage.local.get('formfill_fill_mode');
    this.fillMode = result.formfill_fill_mode || 'smart';
  }

  async saveFillMode() {
    await chrome.storage.local.set({ formfill_fill_mode: this.fillMode });
  }

  async setFillMode(mode) {
    if (mode === 'ai') {
      const isConfigured = this.aiSettings && this.aiSettings.apiKey && this.aiSettings.apiKey.length > 10;
      if (!isConfigured) {
        this.switchTab('profile');
        document.getElementById('ai-settings-section').scrollIntoView({ behavior: 'smooth' });
        this.showToast('Please configure your API key first');
        return;
      }
    }

    this.fillMode = mode;
    await this.saveFillMode();
    this.updateFillModeUI();
  }

  updateFillModeUI() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === this.fillMode);
    });

    const aiBtn = document.getElementById('ai-mode-btn');
    const aiBadge = document.getElementById('ai-mode-badge');
    const isAIConfigured = this.aiSettings && this.aiSettings.apiKey && this.aiSettings.apiKey.length > 10;

    if (isAIConfigured) {
      aiBtn.classList.add('ai-ready');
      aiBadge.textContent = 'Ready';
      aiBadge.style.display = this.fillMode === 'ai' ? 'none' : 'block';
    } else {
      aiBtn.classList.remove('ai-ready');
      aiBadge.textContent = 'Setup';
      aiBadge.style.display = 'block';
    }

    const helpText = document.getElementById('fill-help-text');
    const modeTexts = {
      quick: 'Fill forms with random fake data for testing purposes',
      smart: 'Smart-fill forms with contextual responses based on your profile',
      ai: 'Generate custom AI-powered responses tailored to each question'
    };
    helpText.textContent = modeTexts[this.fillMode] || modeTexts.smart;
  }

  async loadUserProfile() {
    const result = await chrome.storage.local.get('formfill_user_profile');
    this.userProfile = result.formfill_user_profile || {};
    this.populateProfileForm();
    this.renderWorkExperience();
    this.renderEducation();
  }

  populateProfileForm() {
    const p = this.userProfile;
    document.getElementById('profile-firstName').value = p.firstName || '';
    document.getElementById('profile-lastName').value = p.lastName || '';
    document.getElementById('profile-email').value = p.email || '';
    document.getElementById('profile-phone').value = p.phone || '';
    document.getElementById('profile-address').value = p.address || '';
    document.getElementById('profile-city').value = p.city || '';
    document.getElementById('profile-state').value = p.state || '';
    document.getElementById('profile-zipCode').value = p.zipCode || '';
    document.getElementById('profile-country').value = p.country || '';
    document.getElementById('profile-title').value = p.currentTitle || '';
    document.getElementById('profile-company').value = p.currentCompany || '';
    document.getElementById('profile-experience').value = p.yearsExperience || '';
    document.getElementById('profile-industry').value = p.industry || '';
    document.getElementById('profile-skills').value = (p.skills || []).join(', ');
    document.getElementById('profile-linkedIn').value = p.linkedIn || '';
    document.getElementById('profile-portfolio').value = p.portfolio || '';
    document.getElementById('profile-summary').value = p.summary || '';
    document.getElementById('profile-resume').value = p.resume || '';
    document.getElementById('profile-coverLetter').value = p.coverLetter || '';
    document.getElementById('profile-additionalNotes').value = p.additionalNotes || '';
    this.updateResumeFileDisplay();
  }

  async saveUserProfile() {
    const existingResumeFile = this.userProfile.resumeFile;
    this.userProfile = {
      firstName: document.getElementById('profile-firstName').value.trim(),
      lastName: document.getElementById('profile-lastName').value.trim(),
      email: document.getElementById('profile-email').value.trim(),
      phone: document.getElementById('profile-phone').value.trim(),
      address: document.getElementById('profile-address').value.trim(),
      city: document.getElementById('profile-city').value.trim(),
      state: document.getElementById('profile-state').value.trim(),
      zipCode: document.getElementById('profile-zipCode').value.trim(),
      country: document.getElementById('profile-country').value,
      currentTitle: document.getElementById('profile-title').value.trim(),
      currentCompany: document.getElementById('profile-company').value.trim(),
      yearsExperience: document.getElementById('profile-experience').value.trim(),
      industry: document.getElementById('profile-industry').value,
      skills: document.getElementById('profile-skills').value.split(',').map(s => s.trim()).filter(s => s),
      linkedIn: document.getElementById('profile-linkedIn').value.trim(),
      portfolio: document.getElementById('profile-portfolio').value.trim(),
      summary: document.getElementById('profile-summary').value.trim(),
      resume: document.getElementById('profile-resume').value.trim(),
      coverLetter: document.getElementById('profile-coverLetter').value.trim(),
      additionalNotes: document.getElementById('profile-additionalNotes').value.trim(),
      workExperience: this.userProfile.workExperience || [],
      education: this.userProfile.education || [],
      resumeFile: existingResumeFile
    };

    await chrome.storage.local.set({ formfill_user_profile: this.userProfile });
    await this.saveAISettings();
    this.updateProfileCompleteness();
    this.updateFillModeUI();
    this.showToast('Profile saved!');
  }

  renderWorkExperience() {
    const container = document.getElementById('work-experience-list');
    const experiences = this.userProfile.workExperience || [];

    if (experiences.length === 0) {
      container.innerHTML = '<div class="empty-list">No work experience added yet</div>';
      return;
    }

    container.innerHTML = experiences.map((exp, index) => `
      <div class="experience-item" data-index="${index}">
        <div class="experience-header">
          <div class="experience-info">
            <strong>${exp.title || 'Untitled'}</strong>
            <span>${exp.company || ''}${exp.location ? ` - ${exp.location}` : ''}</span>
          </div>
          <div class="experience-actions">
            <button class="btn-icon edit-experience" data-index="${index}" title="Edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-icon delete-experience" data-index="${index}" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="experience-details">
          <span class="experience-dates">${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
          ${exp.description ? `<p class="experience-desc">${exp.description.substring(0, 100)}${exp.description.length > 100 ? '...' : ''}</p>` : ''}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.edit-experience').forEach(btn => {
      btn.addEventListener('click', () => this.editWorkExperience(parseInt(btn.dataset.index)));
    });
    container.querySelectorAll('.delete-experience').forEach(btn => {
      btn.addEventListener('click', () => this.deleteWorkExperience(parseInt(btn.dataset.index)));
    });
  }

  addWorkExperience() {
    const title = document.getElementById('exp-title').value.trim();
    const company = document.getElementById('exp-company').value.trim();
    const location = document.getElementById('exp-location').value.trim();
    const startDate = document.getElementById('exp-start').value.trim();
    const endDate = document.getElementById('exp-end').value.trim() || 'Present';
    const description = document.getElementById('exp-description').value.trim();

    if (!title) {
      this.showToast('Please enter a job title');
      return;
    }

    // Create experience with unique ID for tracking
    const exp = {
      id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      title,
      company,
      location,
      startDate,
      endDate,
      description,
      isCurrent: endDate.toLowerCase() === 'present'
    };

    this.userProfile.workExperience = this.userProfile.workExperience || [];
    this.userProfile.workExperience.unshift(exp);  // Add to beginning (most recent first)
    this.renderWorkExperience();
    this.clearExperienceForm();

    // Auto-save to storage so content script can access immediately
    chrome.storage.local.set({ formfill_user_profile: this.userProfile });
    this.showToast('Experience added and saved!');
  }

  clearExperienceForm() {
    document.getElementById('exp-title').value = '';
    document.getElementById('exp-company').value = '';
    document.getElementById('exp-location').value = '';
    document.getElementById('exp-start').value = '';
    document.getElementById('exp-end').value = '';
    document.getElementById('exp-description').value = '';
  }

  editWorkExperience(index) {
    const exp = this.userProfile.workExperience[index];
    if (!exp) return;

    document.getElementById('exp-title').value = exp.title || '';
    document.getElementById('exp-company').value = exp.company || '';
    document.getElementById('exp-location').value = exp.location || '';
    document.getElementById('exp-start').value = exp.startDate || '';
    document.getElementById('exp-end').value = exp.endDate || '';
    document.getElementById('exp-description').value = exp.description || '';

    this.userProfile.workExperience.splice(index, 1);
    this.renderWorkExperience();
    // Auto-save after removing for edit
    chrome.storage.local.set({ formfill_user_profile: this.userProfile });
    document.getElementById('exp-title').focus();
  }

  deleteWorkExperience(index) {
    if (confirm('Delete this work experience?')) {
      this.userProfile.workExperience.splice(index, 1);
      this.renderWorkExperience();
      // Auto-save after delete
      chrome.storage.local.set({ formfill_user_profile: this.userProfile });
      this.showToast('Experience deleted');
    }
  }

  renderEducation() {
    const container = document.getElementById('education-list');
    const education = this.userProfile.education || [];

    if (education.length === 0) {
      container.innerHTML = '<div class="empty-list">No education added yet</div>';
      return;
    }

    container.innerHTML = education.map((edu, index) => `
      <div class="education-item" data-index="${index}">
        <div class="education-header">
          <div class="education-info">
            <strong>${edu.degree || 'Degree'}</strong>
            <span>${edu.school || ''}</span>
          </div>
          <div class="education-actions">
            <button class="btn-icon edit-education" data-index="${index}" title="Edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-icon delete-education" data-index="${index}" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="education-details">
          <span class="education-dates">
            ${edu.startDate || ''}${edu.startDate && edu.endDate ? ' - ' : ''}${edu.endDate || ''}
            ${(!edu.startDate && !edu.endDate && edu.graduationYear) ? edu.graduationYear : ''}
          </span>
          ${edu.field ? `<span class="education-field"> @ ${edu.field}</span>` : ''}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.edit-education').forEach(btn => {
      btn.addEventListener('click', () => this.editEducation(parseInt(btn.dataset.index)));
    });
    container.querySelectorAll('.delete-education').forEach(btn => {
      btn.addEventListener('click', () => this.deleteEducation(parseInt(btn.dataset.index)));
    });
  }

  addEducation() {
    const degree = document.getElementById('edu-degree').value.trim();
    const field = document.getElementById('edu-field').value.trim();
    const school = document.getElementById('edu-school').value.trim();
    const graduationYear = document.getElementById('edu-year').value.trim();

    if (!degree) {
      this.showToast('Please enter a degree');
      return;
    }

    // Create education with unique ID for tracking
    const edu = {
      id: 'edu_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      degree,
      field,
      school,
      graduationYear,
      startDate: document.getElementById('edu-start').value.trim(),
      endDate: document.getElementById('edu-end').value.trim()
    };

    this.userProfile.education = this.userProfile.education || [];
    this.userProfile.education.unshift(edu);
    this.renderEducation();
    this.clearEducationForm();

    // Auto-save to storage
    chrome.storage.local.set({ formfill_user_profile: this.userProfile });
    this.showToast('Education added and saved!');
  }

  clearEducationForm() {
    document.getElementById('edu-degree').value = '';
    document.getElementById('edu-field').value = '';
    document.getElementById('edu-school').value = '';
    document.getElementById('edu-year').value = '';
    document.getElementById('edu-start').value = '';
    document.getElementById('edu-end').value = '';
  }

  editEducation(index) {
    const edu = this.userProfile.education[index];
    if (!edu) return;

    document.getElementById('edu-degree').value = edu.degree || '';
    document.getElementById('edu-field').value = edu.field || '';
    document.getElementById('edu-school').value = edu.school || '';
    document.getElementById('edu-year').value = edu.graduationYear || '';
    document.getElementById('edu-start').value = edu.startDate || '';
    document.getElementById('edu-end').value = edu.endDate || '';

    this.userProfile.education.splice(index, 1);
    this.renderEducation();
    // Auto-save after removing for edit
    chrome.storage.local.set({ formfill_user_profile: this.userProfile });
    document.getElementById('edu-degree').focus();
  }

  deleteEducation(index) {
    if (confirm('Delete this education entry?')) {
      this.userProfile.education.splice(index, 1);
      this.renderEducation();
      // Auto-save after delete
      chrome.storage.local.set({ formfill_user_profile: this.userProfile });
      this.showToast('Education deleted');
    }
  }

  async openWidgetOnPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          if (typeof FormFillWidget !== 'undefined') {
            FormFillWidget.show();
          }
        }
      });
      this.showToast('Widget opened on page!');
    } catch (error) {
      console.error('Error opening widget:', error);
      this.showToast('Could not open widget on this page');
    }
  }

  updateProfileCompleteness() {
    const fields = [
      document.getElementById('profile-firstName').value,
      document.getElementById('profile-lastName').value,
      document.getElementById('profile-email').value,
      document.getElementById('profile-phone').value,
      document.getElementById('profile-address').value,
      document.getElementById('profile-city').value,
      document.getElementById('profile-state').value,
      document.getElementById('profile-zipCode').value,
      document.getElementById('profile-country').value,
      document.getElementById('profile-title').value,
      document.getElementById('profile-experience').value,
      document.getElementById('profile-industry').value,
      document.getElementById('profile-skills').value,
      document.getElementById('profile-linkedIn').value,
      document.getElementById('profile-summary').value,
      document.getElementById('profile-resume').value,
      document.getElementById('profile-coverLetter').value
    ];

    const hasWorkExperience = (this.userProfile.workExperience || []).length > 0;
    const hasEducation = (this.userProfile.education || []).length > 0;

    let filled = fields.filter(f => f && f.trim().length > 0).length;
    const totalFields = fields.length + 2;

    if (hasWorkExperience) filled++;
    if (hasEducation) filled++;

    const percent = Math.round((filled / totalFields) * 100);

    document.getElementById('completeness-fill').style.width = `${percent}%`;
    document.getElementById('completeness-percent').textContent = percent;

    this.updateAccordionPreviews();
  }

  async loadAISettings() {
    const result = await chrome.storage.local.get('formfill_ai_settings');
    this.aiSettings = result.formfill_ai_settings || { provider: 'openai', apiKey: '', enabled: false, model: '' };

    const provider = this.aiSettings.provider || 'openai';
    document.getElementById('ai-provider').value = provider;
    document.getElementById('ai-api-key').value = this.aiSettings.apiKey || '';

    this.populateModelDropdown(provider, this.aiSettings.model);
  }

  populateModelDropdown(provider, selectedModel = '') {
    const modelSelect = document.getElementById('ai-model');
    const providerConfig = AIProvider.providers[provider];

    if (!providerConfig) return;

    modelSelect.innerHTML = '';
    providerConfig.models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });

    if (selectedModel && providerConfig.models.includes(selectedModel)) {
      modelSelect.value = selectedModel;
    } else {
      modelSelect.value = providerConfig.defaultModel;
    }
  }

  async saveAISettings() {
    this.aiSettings = {
      provider: document.getElementById('ai-provider').value,
      apiKey: document.getElementById('ai-api-key').value.trim(),
      enabled: document.getElementById('ai-api-key').value.trim().length > 10,
      model: document.getElementById('ai-model').value
    };

    await chrome.storage.local.set({ formfill_ai_settings: this.aiSettings });
    this.updateFillModeUI();
  }

  updateAIProvider(provider) {
    this.populateModelDropdown(provider);
    this.saveAISettings();
  }

  toggleKeyVisibility() {
    const input = document.getElementById('ai-api-key');
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  async testAIConnection() {
    const btn = document.getElementById('test-ai-connection');
    btn.disabled = true;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
      Testing...
    `;

    await this.saveAISettings();

    try {
      const result = await this.performAITest();
      if (result.success) {
        this.showToast('Connection successful!');
      } else {
        this.showToast(result.message || 'Connection failed');
      }
    } catch (error) {
      this.showToast('Connection failed: ' + error.message);
    }

    btn.disabled = false;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
      Test Connection
    `;
  }

  async performAITest() {
    const settings = this.aiSettings;
    if (!settings.apiKey || settings.apiKey.length < 10) {
      return { success: false, message: 'No API key configured' };
    }

    try {
      if (settings.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.apiKey}`
          },
          body: JSON.stringify({
            model: settings.model || 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'Say "OK"' }],
            max_tokens: 10
          })
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error?.message || `HTTP ${response.status}`;
          throw new Error(errorMsg);
        }
        return { success: true };
      } else if (settings.provider === 'anthropic') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': settings.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: settings.model || 'claude-3-5-haiku-20241022',
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Say "OK"' }]
          })
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error?.message || `HTTP ${response.status}`;
          throw new Error(errorMsg);
        }
        return { success: true };
      } else if (settings.provider === 'gemini') {
        const model = settings.model || 'gemini-2.0-flash';
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${settings.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Say "OK"' }] }],
            generationConfig: { maxOutputTokens: 10 }
          })
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error?.message || errorData.error?.status || `HTTP ${response.status}`;
          throw new Error(errorMsg);
        }
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
          return { success: true };
        }
        if (data.error) {
          throw new Error(data.error.message || 'Unknown error');
        }
        return { success: true };
      }
      return { success: false, message: 'Unknown provider' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async checkSwaggerPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          if (typeof SwaggerDetector !== 'undefined') {
            const isSwagger = SwaggerDetector.isSwaggerPage();
            const operations = isSwagger ? SwaggerDetector.getExpandedOperations() : [];
            return {
              isSwagger,
              operationsCount: operations.length,
              operations: operations.map(op => ({
                method: op.method,
                path: op.path,
                hasBody: !!op.bodyEditor,
                hasParams: op.parameters?.length > 0,
                hasSchema: !!op.schema
              }))
            };
          }
          return { isSwagger: false, operations: [] };
        }
      });

      const data = results[0]?.result;
      this.isSwaggerPage = data?.isSwagger || false;
      this.swaggerOperations = data?.operations || [];
      this.renderSwaggerSection();
    } catch (error) {
      console.error('Swagger check error:', error);
    }
  }

  renderSwaggerSection() {
    const section = document.getElementById('swagger-section');
    const operationsContainer = document.getElementById('swagger-operations');

    if (!this.isSwaggerPage) {
      section.classList.add('hidden');
      return;
    }

    section.classList.remove('hidden');

    if (this.swaggerOperations.length === 0) {
      operationsContainer.innerHTML = `
        <div class="swagger-no-ops">
          Expand an API operation (click "Try it out") to fill request bodies
        </div>
      `;
      return;
    }

    operationsContainer.innerHTML = this.swaggerOperations.map(op => `
      <div class="swagger-op-item">
        <div class="swagger-op-info">
          <span class="swagger-method ${op.method.toLowerCase()}">${op.method}</span>
          <span class="swagger-path">${op.path}</span>
        </div>
        <button class="swagger-op-fill" data-method="${op.method}" data-path="${op.path}">
          Fill
        </button>
      </div>
    `).join('');

    operationsContainer.querySelectorAll('.swagger-op-fill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.fillSwaggerOperation(btn.dataset.method, btn.dataset.path);
      });
    });
  }

  async fillSwagger() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          if (typeof SwaggerFiller !== 'undefined') {
            return SwaggerFiller.fillAllExpandedOperations();
          }
          return [];
        }
      });

      const filled = results[0]?.result || [];
      const filledCount = filled.filter(r => r.filled).length;

      if (filledCount > 0) {
        this.showToast(`Filled ${filledCount} API request${filledCount > 1 ? 's' : ''}!`);
      } else {
        this.showToast('No expanded operations to fill. Click "Try it out" first.');
      }

      this.checkSwaggerPage();
    } catch (error) {
      console.error('Swagger fill error:', error);
      this.showToast('Error filling Swagger requests');
    }
  }

  async fillSwaggerOperation(method, path) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [method, path],
        func: (m, p) => {
          if (typeof SwaggerDetector !== 'undefined' && typeof SwaggerFiller !== 'undefined') {
            const operations = SwaggerDetector.getExpandedOperations();
            const op = operations.find(o => o.method === m && o.path === p);
            if (op) {
              SwaggerFiller.fillOperation(op);
            }
          }
        }
      });

      this.showToast(`${method} ${path} filled!`);
    } catch (error) {
      console.error('Swagger operation fill error:', error);
      this.showToast('Error filling operation');
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabName}-tab`);
    });

    if (tabName === 'profile') {
      this.updateProfileCompleteness();
    }
  }

  async scanCurrentPage() {
    const fieldsList = document.getElementById('fields-list');
    fieldsList.innerHTML = '<div class="loading">Scanning page...</div>';

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          if (typeof FieldDetector !== 'undefined') {
            return FieldDetector.getAllFields(true).map(f => ({
              id: f.id,
              name: f.name,
              type: f.type,
              detectedType: f.detectedType,
              label: f.label,
              tagName: f.tagName,
              fileType: f.fileType,
              accept: f.accept
            }));
          }
          return [];
        }
      });

      this.detectedFields = results[0]?.result || [];
      this.renderFieldsList();
    } catch (error) {
      console.error('Scan error:', error);
      fieldsList.innerHTML = '<div class="empty-fields">Unable to scan this page</div>';
    }
  }

  renderFieldsList() {
    const fieldsList = document.getElementById('fields-list');

    if (this.detectedFields.length === 0) {
      fieldsList.innerHTML = '<div class="empty-fields">No form fields detected</div>';
      return;
    }

    const isAIReady = this.aiSettings && this.aiSettings.apiKey && this.aiSettings.apiKey.length > 10;
    const hasResume = this.userProfile && this.userProfile.resumeFile && this.userProfile.resumeFile.data;

    fieldsList.innerHTML = this.detectedFields.map((field, index) => {
      const isLongTextField = field.tagName === 'TEXTAREA' ||
        (field.tagName === 'INPUT' && (field.type === 'text' || !field.type));
      const showAIButton = isLongTextField && isAIReady;
      const isFileField = field.type === 'file';
      const isResumeField = isFileField && (field.fileType === 'resumeFile' || field.detectedType === 'resumeFile');

      return `
        <div class="field-item" data-index="${index}">
          <div class="field-info">
            <span class="field-name">${field.label || field.name || field.id || `Field ${index + 1}`}</span>
            <span class="field-type">${field.tagName} - ${field.type}</span>
          </div>
          <div class="field-actions">
            ${showAIButton ? `
              <button class="field-ai-btn" data-index="${index}" title="Fill this field with AI">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
                  <path d="M16 14a4 4 0 0 1 4 4v4H4v-4a4 4 0 0 1 4-4h8z"/>
                </svg>
                AI
              </button>
            ` : ''}
            ${isResumeField && hasResume ? `
              <button class="field-upload-btn" data-index="${index}" title="Upload your resume">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Upload
              </button>
            ` : ''}
            <span class="field-badge ${isFileField ? 'file-badge' : ''}">${this.formatFieldType(field.detectedType)}</span>
          </div>
        </div>
      `;
    }).join('');

    fieldsList.querySelectorAll('.field-ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.fillSingleFieldWithAI(parseInt(btn.dataset.index));
      });
    });

    fieldsList.querySelectorAll('.field-upload-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.uploadResumeToField(parseInt(btn.dataset.index));
      });
    });
  }

  async fillSingleFieldWithAI(fieldIndex) {
    const field = this.detectedFields[fieldIndex];
    if (!field) return;

    const btn = document.querySelector(`.field-ai-btn[data-index="${fieldIndex}"]`);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="loading-spinner"></span>`;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const userProfile = this.userProfile;
      const aiSettings = this.aiSettings;

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [field.id, field.name, fieldIndex, userProfile, aiSettings],
        func: async (fieldId, fieldName, fIndex, profile, ai) => {
          const allFields = FieldDetector.getAllFields();
          let targetField = null;

          if (fieldId) {
            targetField = allFields.find(f => f.id === fieldId);
          }
          if (!targetField && fieldName) {
            targetField = allFields.find(f => f.name === fieldName);
          }
          if (!targetField) {
            targetField = allFields[fIndex];
          }

          if (!targetField) return { success: false, error: 'Field not found' };

          const element = targetField.element;
          const labelText = targetField.label || '';

          let analysis = null;
          if (typeof SmartAnalyzer !== 'undefined') {
            analysis = SmartAnalyzer.analyzeField(element);
          }

          const questionText = analysis?.questionText || labelText || 'Please provide a response';
          const category = analysis?.category || 'general';

          const templateProfile = {
            fullName: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Professional',
            firstName: profile?.firstName || 'Professional',
            skills: profile?.skills?.join(', ') || 'communication, problem-solving',
            industry: profile?.industry || 'technology',
            yearsExperience: profile?.yearsExperience || '5+',
            currentTitle: profile?.currentTitle || 'Professional',
            currentCompany: profile?.currentCompany || ''
          };

          const prompt = `You are helping someone fill out a job application form. Write a professional, authentic response for the following question.

USER PROFILE:
Name: ${templateProfile.fullName}
Current Role: ${templateProfile.currentTitle}
Company: ${templateProfile.currentCompany}
Experience: ${templateProfile.yearsExperience} years
Industry: ${templateProfile.industry}
Skills: ${templateProfile.skills}
${profile?.summary ? 'Summary: ' + profile.summary : ''}

QUESTION CATEGORY: ${category}
QUESTION: ${questionText}

Write a professional response in first person as the applicant. Be concise but substantive. Do not include greetings or sign-offs. Respond with ONLY the answer text.`;

          let aiResponse = null;

          try {
            if (ai.provider === 'openai') {
              const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${ai.apiKey}`
                },
                body: JSON.stringify({
                  model: ai.model || 'gpt-4o-mini',
                  messages: [{ role: 'user', content: prompt }],
                  max_tokens: 500,
                  temperature: 0.7
                })
              });
              if (response.ok) {
                const data = await response.json();
                aiResponse = data.choices[0]?.message?.content?.trim();
              }
            } else if (ai.provider === 'anthropic') {
              const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': ai.apiKey,
                  'anthropic-version': '2023-06-01',
                  'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                  model: ai.model || 'claude-3-5-haiku-20241022',
                  max_tokens: 500,
                  messages: [{ role: 'user', content: prompt }]
                })
              });
              if (response.ok) {
                const data = await response.json();
                aiResponse = data.content[0]?.text?.trim();
              }
            } else if (ai.provider === 'gemini') {
              const model = ai.model || 'gemini-2.0-flash';
              const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${ai.apiKey}`, {
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
          } catch (e) {
            console.error('AI request failed:', e);
          }

          if (aiResponse) {
            FormFiller.setFieldValue(element, aiResponse);
            return { success: true };
          }

          return { success: false, error: 'No AI response' };
        }
      });

      this.showToast('Field filled with AI!');
    } catch (error) {
      console.error('AI fill error:', error);
      this.showToast('Error filling field');
    }

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
          <path d="M16 14a4 4 0 0 1 4 4v4H4v-4a4 4 0 0 1 4-4h8z"/>
        </svg>
        AI
      `;
    }
  }

  async uploadResumeToField(fieldIndex) {
    const field = this.detectedFields[fieldIndex];
    if (!field || field.type !== 'file') return;

    const btn = document.querySelector(`.field-upload-btn[data-index="${fieldIndex}"]`);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="loading-spinner"></span>`;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const resumeFile = this.userProfile?.resumeFile;

      if (!resumeFile || !resumeFile.data) {
        this.showToast('No resume file saved in profile');
        return;
      }

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [field.id, field.name, fieldIndex, resumeFile],
        func: async (fieldId, fieldName, fIndex, resume) => {
          const allFields = FieldDetector.getAllFields(true);
          let targetField = null;

          for (const f of allFields) {
            if (f.type === 'file') {
              if (fieldId && f.id === fieldId) {
                targetField = f;
                break;
              }
              if (fieldName && f.name === fieldName) {
                targetField = f;
                break;
              }
            }
          }

          if (!targetField) {
            const fileFields = allFields.filter(f => f.type === 'file');
            targetField = fileFields[fIndex] || fileFields[0];
          }

          if (!targetField) return { success: false, error: 'File input not found' };

          const result = await FormFiller.setFileInputValue(targetField.element, resume);
          return { success: result };
        }
      });

      this.showToast('Resume uploaded!');
    } catch (error) {
      console.error('Upload error:', error);
      this.showToast('Error uploading file');
    }

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        Upload
      `;
    }
  }

  formatFieldType(type) {
    const typeMap = {
      firstName: 'First Name',
      lastName: 'Last Name',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      password: 'Password',
      confirmPassword: 'Confirm Pass',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP',
      country: 'Country',
      username: 'Username',
      company: 'Company',
      jobTitle: 'Job Title',
      birthDate: 'Birth Date',
      creditCard: 'Card',
      cvv: 'CVV',
      subject: 'Subject',
      message: 'Message',
      text: 'Text',
      resumeFile: 'Resume',
      coverLetterFile: 'Cover Letter',
      unknown: 'File'
    };
    return typeMap[type] || type;
  }

  findMatchingTemplate() {
    const templates = Object.values(this.templates);
    if (templates.length === 0) return null;

    return new Promise(async (resolve) => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => ({ hostname: window.location.hostname, pathname: window.location.pathname })
        });
        const pageInfo = results[0]?.result;
        if (!pageInfo) {
          resolve(null);
          return;
        }

        const exactMatch = templates.find(t => t.hostname === pageInfo.hostname && t.pathname === pageInfo.pathname);
        if (exactMatch) {
          resolve(exactMatch);
          return;
        }

        const hostnameMatch = templates.find(t => t.hostname === pageInfo.hostname);
        resolve(hostnameMatch || null);
      } catch (e) {
        resolve(null);
      }
    });
  }

  async fillAllForms() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const useImportedData = this.dataSource === 'imported' && this.currentDataset && this.datasets[this.currentDataset];
      const importedRow = useImportedData ? this.datasets[this.currentDataset].rows[this.currentRowIndex] : null;
      const headers = useImportedData ? this.datasets[this.currentDataset].headers : null;

      const matchingTemplate = await this.findMatchingTemplate();
      const templateFields = matchingTemplate ? matchingTemplate.fields : null;

      const fillMode = this.fillMode;
      const userProfile = this.userProfile;
      const aiSettings = this.aiSettings;
      const applicationQuestions = this.applicationQuestions;

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [importedRow, headers, fillMode, userProfile, aiSettings, templateFields, applicationQuestions],
        func: async (dataRow, dataHeaders, mode, profile, ai, savedTemplateFields, appQuestions) => {
          if (dataRow && dataHeaders) {
            FormFiller.fillFromImportedData(dataRow, dataHeaders);
            return;
          }

          // Construct the final data profile for filling
          const education = profile?.education || [];
          const workExperience = profile?.workExperience || [];

          const fakeProfile = {
            ...profile,
            workExperience,
            education,
            // Add other required fields if missing
            fullName: profile?.fullName || `${profile?.firstName} ${profile?.lastName}`.trim()
          };

          if (typeof FormFiller !== 'undefined' && typeof FormFiller.fillAllForms === 'function') {
            console.log('FormFill Pro: Calling centralized fillAllForms from popup');
            await FormFiller.fillAllForms(fakeProfile, {
              mode,
              templateFields: savedTemplateFields,
              applicationQuestions: appQuestions
            });
          } else {
            console.error('FormFill Pro: FormFiller not found in page context');
            // Basic fallback loop for safety
            const allFields = typeof FieldDetector !== 'undefined' ? FieldDetector.getAllFields() : [];
            for (const field of allFields) {
              if (field.element) field.element.value = profile?.[field.detectedType] || '';
            }
          }
        }
      });

      if (useImportedData) {
        this.showToast(`Filled with row ${this.currentRowIndex + 1} data!`);
      } else if (matchingTemplate && this.fillMode !== 'quick') {
        const modeNames = { smart: 'Smart', ai: 'AI' };
        this.showToast(`Template + ${modeNames[this.fillMode]} fill complete!`);
      } else {
        const modeNames = { quick: 'Quick', smart: 'Smart', ai: 'AI' };
        this.showToast(`${modeNames[this.fillMode]} fill complete!`);
      }
    } catch (error) {
      console.error('Fill error:', error);
      this.showToast('Error filling forms');
    }
  }

  async quickFill(type) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [type],
        func: (fillType) => {
          const profile = FakeDataGenerator.generateProfile();
          const typeMapping = {
            email: ['email'],
            phone: ['phone'],
            address: ['address', 'city', 'state', 'zipCode', 'country'],
            name: ['firstName', 'lastName', 'fullName'],
            password: ['password', 'confirmPassword'],
            card: ['creditCard', 'cvv', 'expirationDate', 'expirationMonth', 'expirationYear']
          };

          const targetTypes = typeMapping[fillType] || [];
          const fields = FieldDetector.getAllFields();

          fields.forEach(field => {
            if (targetTypes.includes(field.detectedType)) {
              FormFiller.fillField(field.element, field.detectedType, profile);
            }
          });
        }
      });

      this.showToast(`${type} fields filled!`);
    } catch (error) {
      console.error('Quick fill error:', error);
      this.showToast('Error filling fields');
    }
  }

  async loadSettings() {
    const result = await chrome.storage.local.get('settings');
    const settings = result.settings || {
      locale: 'en-US',
      passwordLength: 12,
      fillDelay: 50,
      showAnimation: false,
      contextMenu: true
    };

    document.getElementById('locale-select').value = settings.locale;
    document.getElementById('password-length').value = settings.passwordLength;
    document.getElementById('fill-delay').value = settings.fillDelay;
    document.getElementById('auto-submit').checked = settings.showAnimation;
    document.getElementById('context-menu').checked = settings.contextMenu;
  }

  async saveSetting(key, value) {
    const result = await chrome.storage.local.get('settings');
    const settings = result.settings || {};
    settings[key] = value;
    await chrome.storage.local.set({ settings });
  }

  exportProfile() {
    const data = JSON.stringify({
      profile: this.userProfile,
      aiSettings: { provider: this.aiSettings?.provider, model: this.aiSettings?.model },
      applicationQuestions: this.applicationQuestions
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formfill-profile.json';
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Profile exported!');
  }

  async importProfile(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const imported = JSON.parse(text);

      if (imported.profile) {
        this.userProfile = imported.profile;
        await chrome.storage.local.set({ formfill_user_profile: this.userProfile });
        this.populateProfileForm();
        this.updateProfileCompleteness();
      }

      if (imported.applicationQuestions) {
        this.applicationQuestions = imported.applicationQuestions;
        await chrome.storage.local.set({ formfill_application_questions: this.applicationQuestions });
        this.populateApplicationQuestionsForm();
      }

      this.showToast('Profile imported!');
    } catch (error) {
      this.showToast('Invalid profile file');
    }

    event.target.value = '';
  }

  async clearAllData() {
    if (confirm('This will delete your profile, templates, and settings. Continue?')) {
      await chrome.storage.local.clear();
      this.userProfile = {};
      this.aiSettings = {};
      this.datasets = {};
      this.templates = {};
      this.applicationQuestions = {};
      this.populateProfileForm();
      this.populateApplicationQuestionsForm();
      this.updateProfileCompleteness();
      this.renderTemplatesList();
      await this.loadSettings();
      this.showToast('All data cleared');
    }
  }

  async loadDatasets() {
    const result = await chrome.storage.local.get(['formfill_datasets', 'formfill_active_dataset', 'formfill_row_index', 'formfill_data_source']);
    this.datasets = result.formfill_datasets || {};
    this.currentDataset = result.formfill_active_dataset || null;
    this.currentRowIndex = result.formfill_row_index || 0;
    this.dataSource = result.formfill_data_source || 'generated';

    const radio = document.querySelector(`input[name="data-source"][value="${this.dataSource}"]`);
    if (radio) radio.checked = true;

    this.updateDataSourceUI();
    this.renderDatasetsList();
    this.renderActiveDataset();
  }

  async saveDatasets() {
    await chrome.storage.local.set({
      formfill_datasets: this.datasets,
      formfill_active_dataset: this.currentDataset,
      formfill_row_index: this.currentRowIndex,
      formfill_data_source: this.dataSource
    });
  }

  setDataSource(source) {
    this.dataSource = source;
    this.updateDataSourceUI();
    this.saveDatasets();
  }

  updateDataSourceUI() {
    const fileSection = document.getElementById('file-upload-section');
    const generatedInfo = document.getElementById('generated-data-info');

    if (this.dataSource === 'imported') {
      fileSection.classList.remove('hidden');
      generatedInfo.classList.add('hidden');
    } else {
      fileSection.classList.add('hidden');
      generatedInfo.classList.remove('hidden');
    }
  }

  async handleFileUpload(file) {
    try {
      const result = await this.parseFile(file);
      this.showToast(`Imported ${result.rowCount} rows from ${result.name}`);
      this.renderDatasetsList();
      this.renderActiveDataset();
    } catch (error) {
      console.error('File import error:', error);
      this.showToast(error.message || 'Failed to import file');
    }
  }

  async parseFile(file) {
    const fileName = file.name;
    const extension = fileName.split('.').pop().toLowerCase();

    let result;
    if (extension === 'csv' || extension === 'txt') {
      const content = await this.readFileAsText(file);
      result = this.parseCSV(content);
    } else if (extension === 'xlsx') {
      const buffer = await this.readFileAsArrayBuffer(file);
      result = await this.parseExcel(buffer);
    } else {
      throw new Error(`Unsupported format: .${extension}`);
    }

    if (result.rows.length === 0) {
      throw new Error('File contains no data');
    }

    const datasetName = fileName.replace(/\.[^.]+$/, '');
    const uniqueName = this.getUniqueName(datasetName);

    this.datasets[uniqueName] = {
      name: uniqueName,
      headers: result.headers,
      rows: result.rows,
      rowCount: result.rows.length
    };

    this.currentDataset = uniqueName;
    this.currentRowIndex = 0;
    await this.saveDatasets();

    return { name: uniqueName, rowCount: result.rows.length };
  }

  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file, 'UTF-8');
    });
  }

  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  parseCSV(content) {
    let cleanContent = content;
    if (cleanContent.charCodeAt(0) === 0xFEFF) {
      cleanContent = cleanContent.slice(1);
    }

    const delimiter = this.detectDelimiter(cleanContent);
    const lines = this.parseCSVLines(cleanContent, delimiter);

    if (lines.length === 0) throw new Error('File is empty');

    const headers = lines[0].map(h => this.normalizeHeader(h));
    const rows = lines.slice(1)
      .filter(row => row.some(cell => cell.trim() !== ''))
      .map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        return obj;
      });

    return { headers, rows };
  }

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
  }

  parseCSVLines(content, delimiter) {
    const lines = [];
    let currentLine = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const nextChar = content[i + 1];

      if (inQuotes) {
        if (char === '"') {
          if (nextChar === '"') {
            currentField += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          currentField += char;
        }
      } else if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        currentLine.push(currentField.trim());
        currentField = '';
      } else if (char === '\r' && nextChar === '\n') {
        currentLine.push(currentField.trim());
        lines.push(currentLine);
        currentLine = [];
        currentField = '';
        i++;
      } else if (char === '\n' || char === '\r') {
        currentLine.push(currentField.trim());
        lines.push(currentLine);
        currentLine = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }

    if (currentField || currentLine.length > 0) {
      currentLine.push(currentField.trim());
      lines.push(currentLine);
    }

    return lines;
  }

  async parseExcel(arrayBuffer) {
    const data = new Uint8Array(arrayBuffer);

    if (data[0] !== 0x50 || data[1] !== 0x4B) {
      throw new Error('Invalid Excel file');
    }

    const files = await this.unzipXLSX(data);
    const sharedStrings = this.parseSharedStrings(files['xl/sharedStrings.xml']);
    const sheet = this.parseSheet(files['xl/worksheets/sheet1.xml'], sharedStrings);

    if (sheet.length === 0) throw new Error('Excel file is empty');

    const headers = sheet[0].map(h => this.normalizeHeader(String(h)));
    const rows = sheet.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i] !== undefined ? String(row[i]) : '';
      });
      return obj;
    });

    return { headers, rows };
  }

  async unzipXLSX(data) {
    const files = {};
    let offset = 0;

    while (offset < data.length - 4) {
      const signature = data[offset] | (data[offset + 1] << 8) | (data[offset + 2] << 16) | (data[offset + 3] << 24);
      if (signature !== 0x04034B50) break;

      const compressionMethod = data[offset + 8] | (data[offset + 9] << 8);
      const compressedSize = data[offset + 18] | (data[offset + 19] << 8) | (data[offset + 20] << 16) | (data[offset + 21] << 24);
      const nameLength = data[offset + 26] | (data[offset + 27] << 8);
      const extraLength = data[offset + 28] | (data[offset + 29] << 8);

      const nameStart = offset + 30;
      const fileName = new TextDecoder().decode(data.slice(nameStart, nameStart + nameLength));
      const dataStart = nameStart + nameLength + extraLength;
      const fileData = data.slice(dataStart, dataStart + compressedSize);

      if (fileName.endsWith('.xml')) {
        let content;
        if (compressionMethod === 0) {
          content = new TextDecoder().decode(fileData);
        } else if (compressionMethod === 8) {
          try {
            const ds = new DecompressionStream('deflate-raw');
            const writer = ds.writable.getWriter();
            writer.write(fileData);
            writer.close();
            const reader = ds.readable.getReader();
            const chunks = [];
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
            }
            const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
            const result = new Uint8Array(totalLen);
            let off = 0;
            for (const c of chunks) { result.set(c, off); off += c.length; }
            content = new TextDecoder().decode(result);
          } catch (e) { content = ''; }
        }
        files[fileName] = content || '';
      }
      offset = dataStart + compressedSize;
    }
    return files;
  }

  parseSharedStrings(xml) {
    if (!xml) return [];
    const strings = [];
    const regex = /<si>[\s\S]*?<t[^>]*>([^<]*)<\/t>[\s\S]*?<\/si>/gi;
    let match;
    while ((match = regex.exec(xml)) !== null) {
      strings.push(match[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    }
    return strings;
  }

  parseSheet(xml, sharedStrings) {
    if (!xml) return [];
    const rows = [];
    const rowRegex = /<row[^>]*>([\s\S]*?)<\/row>/gi;
    let rowMatch;

    while ((rowMatch = rowRegex.exec(xml)) !== null) {
      const cells = [];
      const cellRegex = /<c\s+r="([A-Z]+)(\d+)"[^>]*(?:t="([^"]*)")?[^>]*>(?:<v>([^<]*)<\/v>)?/gi;
      let cellMatch;
      const cellMap = {};

      while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
        let col = 0;
        for (let i = 0; i < cellMatch[1].length; i++) {
          col = col * 26 + (cellMatch[1].charCodeAt(i) - 64);
        }
        col--;
        let value = cellMatch[4] || '';
        if (cellMatch[3] === 's' && sharedStrings[parseInt(value)]) {
          value = sharedStrings[parseInt(value)];
        }
        cellMap[col] = value;
      }

      const maxCol = Math.max(...Object.keys(cellMap).map(Number), -1);
      for (let i = 0; i <= maxCol; i++) {
        cells.push(cellMap[i] !== undefined ? cellMap[i] : '');
      }
      if (cells.length > 0) rows.push(cells);
    }
    return rows;
  }

  normalizeHeader(header) {
    return (header || '')
      .toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

  getUniqueName(baseName) {
    if (!this.datasets[baseName]) return baseName;
    let counter = 1;
    while (this.datasets[`${baseName}_${counter}`]) counter++;
    return `${baseName}_${counter}`;
  }

  renderDatasetsList() {
    const container = document.getElementById('datasets-list');
    const datasetNames = Object.keys(this.datasets);

    if (datasetNames.length === 0) {
      container.innerHTML = '<div class="empty-datasets">No datasets uploaded yet</div>';
      return;
    }

    container.innerHTML = datasetNames.map(name => {
      const ds = this.datasets[name];
      return `
        <div class="dataset-item ${name === this.currentDataset ? 'active' : ''}" data-name="${name}">
          <div class="dataset-item-info">
            <span class="dataset-item-name">${name}</span>
            <span class="dataset-item-meta">${ds.rowCount} rows, ${ds.headers.length} columns</span>
          </div>
          <div class="dataset-item-actions">
            <button class="btn-icon delete-dataset" data-name="${name}" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.dataset-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.delete-dataset')) {
          this.setActiveDataset(item.dataset.name);
        }
      });
    });

    container.querySelectorAll('.delete-dataset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteDataset(btn.dataset.name);
      });
    });
  }

  renderActiveDataset() {
    const container = document.getElementById('active-dataset');
    const nameEl = document.getElementById('dataset-name');
    const metaEl = document.getElementById('dataset-meta');
    const currentRowEl = document.getElementById('current-row');
    const totalRowsEl = document.getElementById('total-rows');
    const previewEl = document.getElementById('data-preview');

    if (!this.currentDataset || !this.datasets[this.currentDataset]) {
      container.classList.add('hidden');
      return;
    }

    const ds = this.datasets[this.currentDataset];
    container.classList.remove('hidden');

    nameEl.textContent = this.currentDataset;
    metaEl.textContent = `${ds.headers.length} columns`;
    currentRowEl.textContent = this.currentRowIndex + 1;
    totalRowsEl.textContent = ds.rowCount;

    const row = ds.rows[this.currentRowIndex] || {};
    previewEl.innerHTML = Object.entries(row).slice(0, 8).map(([key, value]) => `
      <div class="preview-item">
        <span class="preview-key">${key.replace(/_/g, ' ')}</span>
        <span class="preview-value">${value}</span>
      </div>
    `).join('') + (Object.keys(row).length > 8 ? '<div class="preview-item"><span class="preview-key">...</span><span class="preview-value"></span></div>' : '');
  }

  async setActiveDataset(name) {
    if (this.datasets[name]) {
      this.currentDataset = name;
      this.currentRowIndex = 0;
      await this.saveDatasets();
      this.renderDatasetsList();
      this.renderActiveDataset();
    }
  }

  async deleteDataset(name) {
    if (confirm(`Delete dataset "${name}"?`)) {
      delete this.datasets[name];
      if (this.currentDataset === name) {
        const remaining = Object.keys(this.datasets);
        this.currentDataset = remaining.length > 0 ? remaining[0] : null;
        this.currentRowIndex = 0;
      }
      await this.saveDatasets();
      this.renderDatasetsList();
      this.renderActiveDataset();
      this.showToast('Dataset deleted');
    }
  }

  async clearActiveDataset() {
    if (this.currentDataset) {
      await this.deleteDataset(this.currentDataset);
    }
  }

  async nextRow() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) return;
    const ds = this.datasets[this.currentDataset];
    this.currentRowIndex = (this.currentRowIndex + 1) % ds.rowCount;
    await this.saveDatasets();
    this.renderActiveDataset();
  }

  async previousRow() {
    if (!this.currentDataset || !this.datasets[this.currentDataset]) return;
    const ds = this.datasets[this.currentDataset];
    this.currentRowIndex = (this.currentRowIndex - 1 + ds.rowCount) % ds.rowCount;
    await this.saveDatasets();
    this.renderActiveDataset();
  }

  async loadTemplates() {
    const result = await chrome.storage.local.get('formfill_templates');
    this.templates = result.formfill_templates || {};
  }

  async saveTemplates() {
    await chrome.storage.local.set({ formfill_templates: this.templates });
  }

  async saveCurrentTemplate() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const fields = FieldDetector.getAllFields();
          const fieldData = fields.map(field => ({
            selector: field.element.id ? `#${field.element.id}` :
              field.element.name ? `[name="${field.element.name}"]` :
                field.element.className ? `.${field.element.className.split(' ')[0]}` : null,
            detectedType: field.detectedType,
            value: field.element.value || '',
            tagName: field.tagName,
            type: field.type,
            label: field.label
          })).filter(f => f.selector);

          return {
            url: window.location.href,
            hostname: window.location.hostname,
            pathname: window.location.pathname,
            title: document.title,
            fields: fieldData
          };
        }
      });

      const pageData = results[0]?.result;
      if (!pageData || pageData.fields.length === 0) {
        this.showToast('No form fields to save');
        return;
      }

      const templateName = prompt('Template name:', pageData.hostname);
      if (!templateName) return;

      const templateId = `template_${Date.now()}`;
      this.templates[templateId] = {
        id: templateId,
        name: templateName,
        url: pageData.url,
        hostname: pageData.hostname,
        pathname: pageData.pathname,
        title: pageData.title,
        fields: pageData.fields,
        fieldCount: pageData.fields.length,
        createdAt: new Date().toISOString()
      };

      await this.saveTemplates();
      this.renderTemplatesList();
      this.showToast(`Template "${templateName}" saved!`);
    } catch (error) {
      console.error('Save template error:', error);
      this.showToast('Failed to save template');
    }
  }

  renderTemplatesList() {
    const container = document.getElementById('templates-list');
    const templateIds = Object.keys(this.templates);

    if (templateIds.length === 0) {
      container.innerHTML = '<div class="empty-templates">No templates saved yet</div>';
      return;
    }

    container.innerHTML = templateIds.map(id => {
      const t = this.templates[id];
      return `
        <div class="template-item" data-id="${id}">
          <div class="template-item-info">
            <span class="template-item-name">${t.name}</span>
            <span class="template-item-meta">${t.fieldCount || t.fields?.length || 0} fields</span>
            <span class="template-item-url" title="${t.url || ''}">${t.hostname || t.urlPattern || 'Custom template'}${t.pathname || ''}</span>
          </div>
          <div class="template-item-actions">
            <button class="btn-icon apply-template" data-id="${id}" title="Apply template">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
            <button class="btn-icon edit-template" data-id="${id}" title="Edit template">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-icon delete-template" data-id="${id}" title="Delete template">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.apply-template').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.applyTemplate(btn.dataset.id);
      });
    });

    container.querySelectorAll('.edit-template').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editTemplate(btn.dataset.id);
      });
    });

    container.querySelectorAll('.delete-template').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteTemplate(btn.dataset.id);
      });
    });
  }

  async applyTemplate(templateId) {
    const template = this.templates[templateId];
    if (!template) return;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [template.fields],
        func: (fields) => {
          fields.forEach(field => {
            if (!field.selector || !field.value) return;

            const element = document.querySelector(field.selector);
            if (element) {
              if (typeof FormFiller !== 'undefined') {
                FormFiller.setFieldValue(element, field.value);
              } else {
                element.value = field.value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }
          });
        }
      });

      this.showToast(`Applied "${template.name}" template`);
    } catch (error) {
      console.error('Apply template error:', error);
      this.showToast('Failed to apply template');
    }
  }

  async deleteTemplate(templateId) {
    const template = this.templates[templateId];
    if (!template) return;

    if (confirm(`Delete template "${template.name}"?`)) {
      delete this.templates[templateId];
      await this.saveTemplates();
      this.renderTemplatesList();
      this.showToast('Template deleted');
    }
  }

  openTemplateModal(templateId = null) {
    this.editingTemplateId = templateId;
    const modal = document.getElementById('template-modal');
    const title = document.getElementById('template-modal-title');
    const nameInput = document.getElementById('template-name');
    const urlInput = document.getElementById('template-url');
    const fieldsContainer = document.getElementById('template-fields-container');

    if (templateId && this.templates[templateId]) {
      const template = this.templates[templateId];
      title.textContent = 'Edit Template';
      nameInput.value = template.name || '';
      urlInput.value = template.urlPattern || template.hostname || '';
      fieldsContainer.innerHTML = '';
      (template.fields || []).forEach(field => {
        this.addTemplateField(field.selector || field.label || '', field.value || '');
      });
    } else {
      title.textContent = 'New Template';
      nameInput.value = '';
      urlInput.value = '';
      fieldsContainer.innerHTML = '';
      this.addTemplateField('', '');
    }

    modal.classList.remove('hidden');
  }

  closeTemplateModal() {
    const modal = document.getElementById('template-modal');
    modal.classList.add('hidden');
    this.editingTemplateId = null;
  }

  addTemplateField(selector = '', value = '') {
    const container = document.getElementById('template-fields-container');
    const row = document.createElement('div');
    row.className = 'template-field-row';
    row.innerHTML = `
      <input type="text" placeholder="Field selector (e.g., #email, [name='phone'])" value="${this.escapeHtml(selector)}">
      <input type="text" placeholder="Value" value="${this.escapeHtml(value)}">
      <button class="btn-icon remove-field" title="Remove field">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    row.querySelector('.remove-field').addEventListener('click', () => {
      row.remove();
    });

    container.appendChild(row);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async getCurrentUrlForTemplate() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        const url = new URL(tab.url);
        document.getElementById('template-url').value = url.hostname + url.pathname;
      }
    } catch (error) {
      console.error('Error getting current URL:', error);
    }
  }

  async saveTemplateFromModal() {
    const name = document.getElementById('template-name').value.trim();
    const urlPattern = document.getElementById('template-url').value.trim();
    const fieldsContainer = document.getElementById('template-fields-container');
    const fieldRows = fieldsContainer.querySelectorAll('.template-field-row');

    if (!name) {
      this.showToast('Please enter a template name');
      return;
    }

    const fields = [];
    fieldRows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      const selector = inputs[0].value.trim();
      const value = inputs[1].value.trim();
      if (selector && value) {
        fields.push({ selector, value, label: selector });
      }
    });

    if (fields.length === 0) {
      this.showToast('Please add at least one field');
      return;
    }

    let hostname = '';
    let pathname = '';
    if (urlPattern) {
      try {
        if (urlPattern.includes('/')) {
          const parts = urlPattern.split('/');
          hostname = parts[0];
          pathname = '/' + parts.slice(1).join('/');
        } else {
          hostname = urlPattern;
        }
      } catch (e) {
        hostname = urlPattern;
      }
    }

    const templateId = this.editingTemplateId || `template_${Date.now()}`;
    this.templates[templateId] = {
      id: templateId,
      name,
      urlPattern,
      hostname,
      pathname,
      fields,
      fieldCount: fields.length,
      createdAt: this.editingTemplateId ? this.templates[templateId]?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.saveTemplates();
    this.renderTemplatesList();
    this.closeTemplateModal();
    this.showToast(this.editingTemplateId ? 'Template updated!' : 'Template created!');
  }

  editTemplate(templateId) {
    this.openTemplateModal(templateId);
  }

  async handleResumeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = this.arrayBufferToBase64(arrayBuffer);

      this.userProfile.resumeFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64,
        uploadedAt: new Date().toISOString()
      };

      await chrome.storage.local.set({ formfill_user_profile: this.userProfile });

      this.updateResumeFileDisplay();

      let extractedText = '';
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        extractedText = await file.text();
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        extractedText = await this.extractTextFromPDF(file);
      } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        extractedText = await this.extractTextFromDocx(file);
      }

      if (extractedText && extractedText.trim().length > 50) {
        document.getElementById('profile-resume').value = extractedText;
      }

      this.showToast(`Resume "${file.name}" saved! It will auto-upload to applications.`);
    } catch (error) {
      console.error('Error reading file:', error);
      this.showToast('Error saving file. Please try again.');
    }

    event.target.value = '';
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  updateResumeFileDisplay() {
    const container = document.getElementById('resume-file-info');
    if (!container) return;

    if (this.userProfile.resumeFile) {
      const file = this.userProfile.resumeFile;
      const sizeKB = Math.round(file.size / 1024);
      container.innerHTML = `
        <div class="resume-file-attached">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span class="resume-file-name">${file.name}</span>
          <span class="resume-file-size">(${sizeKB} KB)</span>
          <button class="btn-icon remove-resume-file" title="Remove file">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `;
      container.querySelector('.remove-resume-file').addEventListener('click', () => this.removeResumeFile());
    } else {
      container.innerHTML = '';
    }
  }

  async removeResumeFile() {
    delete this.userProfile.resumeFile;
    await chrome.storage.local.set({ formfill_user_profile: this.userProfile });
    this.updateResumeFileDisplay();
    this.showToast('Resume file removed');
  }

  async extractTextFromPDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let text = '';

      const decoder = new TextDecoder('utf-8', { fatal: false });
      const pdfString = decoder.decode(bytes);

      const streamMatches = pdfString.matchAll(/stream([\s\S]*?)endstream/g);
      for (const match of streamMatches) {
        const content = match[1];
        const textMatches = content.matchAll(/\(([^)]+)\)/g);
        for (const textMatch of textMatches) {
          text += textMatch[1] + ' ';
        }

        const tjMatches = content.matchAll(/\[(.*?)\]\s*TJ/g);
        for (const tjMatch of tjMatches) {
          const parts = tjMatch[1].matchAll(/\(([^)]+)\)/g);
          for (const part of parts) {
            text += part[1];
          }
          text += ' ';
        }
      }

      text = text
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\t/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (text.length < 50) {
        const allText = pdfString.match(/[A-Za-z0-9\s.,!?@#$%^&*()_+=\-\[\]{}|:;"'<>\/\\]{20,}/g);
        if (allText) {
          text = allText
            .filter(t => /[A-Za-z]{3,}/.test(t))
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        }
      }

      return text;
    } catch (error) {
      console.error('PDF extraction error:', error);
      return '';
    }
  }

  async extractTextFromDocx(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const decoder = new TextDecoder('utf-8', { fatal: false });
      const content = decoder.decode(bytes);

      const textMatches = content.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g);
      let text = '';
      for (const match of textMatches) {
        text += match[1] + ' ';
      }

      return text.replace(/\s+/g, ' ').trim();
    } catch (error) {
      console.error('DOCX extraction error:', error);
      return '';
    }
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});
