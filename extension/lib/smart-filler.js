const SmartFiller = {
  SETTINGS_KEY: 'formfill_smart_settings',

  modes: {
    QUICK: 'quick',
    SMART: 'smart',
    AI: 'ai'
  },

  async getSettings() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get(this.SETTINGS_KEY);
        return result[this.SETTINGS_KEY] || this.getDefaultSettings();
      } else {
        const stored = localStorage.getItem(this.SETTINGS_KEY);
        return stored ? JSON.parse(stored) : this.getDefaultSettings();
      }
    } catch (error) {
      console.error('Error loading smart settings:', error);
      return this.getDefaultSettings();
    }
  },

  getDefaultSettings() {
    return {
      mode: this.modes.SMART,
      useCache: true,
      autoDetectLongForm: true
    };
  },

  async saveSettings(settings) {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({ [this.SETTINGS_KEY]: settings });
      } else {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
      }
      return true;
    } catch (error) {
      console.error('Error saving smart settings:', error);
      return false;
    }
  },

  async fillField(element, fieldType, profile) {
    // ✅ SAFE: application questions FIRST
    if (typeof ApplicationQuestionFiller !== 'undefined') {
      const appQResult = ApplicationQuestionFiller.tryFill(element, profile);
      if (appQResult?.filled) {
        return { success: true, value: appQResult.value, source: 'application-question' };
      }
    }

    const settings = await this.getSettings();

    if (settings.mode === this.modes.QUICK) {
      return this.fillWithFakeData(element, fieldType, profile);
    }

    const analysis = SmartAnalyzer.analyzeField(element);

    if (analysis && analysis.confidence > 0.3 && analysis.isLongForm) {
      return this.fillSmartField(element, analysis, settings);
    }

    return this.fillWithFakeData(element, fieldType, profile);
  },

  async fillSmartField(element, analysis, settings) {
    const userProfile = await UserProfileManager.getProfileForTemplates();

    if (settings.useCache) {
      const questionHash = UserProfileManager.hashQuestion(analysis.questionText);
      const cached = await UserProfileManager.getCachedResponse(questionHash);
      if (cached) {
        FormFiller.setFieldValue(element, cached);
        return { success: true, value: cached, source: 'cache' };
      }
    }

    if (settings.mode === this.modes.AI) {
      const isAIConfigured = await AIProvider.isConfigured();
      if (isAIConfigured) {
        try {
          const response = await AIProvider.generateResponse(
            analysis.category,
            analysis.questionText,
            userProfile
          );

          if (settings.useCache) {
            const questionHash = UserProfileManager.hashQuestion(analysis.questionText);
            await UserProfileManager.cacheResponse(questionHash, response);
          }

          FormFiller.setFieldValue(element, response);
          return { success: true, value: response, source: 'ai' };
        } catch (error) {
          console.warn('AI generation failed, falling back to template:', error);
        }
      }
    }

    const isLong = element.tagName.toLowerCase() === 'textarea' ||
      (element.getAttribute('maxlength') || 0) > 200;

    const templateResponse = ResponseTemplates.getTemplate(
      analysis.category,
      isLong,
      userProfile
    );

    if (templateResponse) {
      if (settings.useCache) {
        const questionHash = UserProfileManager.hashQuestion(analysis.questionText);
        await UserProfileManager.cacheResponse(questionHash, templateResponse);
      }

      FormFiller.setFieldValue(element, templateResponse);
      return { success: true, value: templateResponse, source: 'template' };
    }

    return this.fillWithFakeData(element, 'message', await FakeDataGenerator.generateProfile());
  },

  fillWithFakeData(element, fieldType, profile) {
    const result = FormFiller.fillField(element, fieldType, profile);
    return { ...result, source: 'fake' };
  },

  // Map multi-block field type to the corresponding value from an entry object
  mapBlockFieldValue(fieldType, entry, blockType) {
    if (!entry) return null;

    if (blockType === 'work') {
      switch (fieldType) {
        case 'workExpTitle':
        case 'jobTitle': return entry.title;
        case 'workExpCompany':
        case 'company': return entry.company;
        case 'workExpLocation': return entry.location;
        case 'workExpStartDate': return entry.startDate;
        case 'workExpEndDate': return entry.isCurrent ? 'Present' : entry.endDate;
        case 'workExpDescription': return entry.description;
        default: return null;
      }
    } else if (blockType === 'edu') {
      switch (fieldType) {
        case 'eduSchool': return entry.school;
        case 'eduDegree': return entry.degree;
        case 'eduField': return entry.field;
        case 'eduGradYear': return entry.graduationYear;
        case 'eduStartDate': return entry.startDate;
        case 'eduEndDate': return entry.endDate;
        default: return null;
      }
    }
    return null;
  },

  async fillAllForms(profile) {
    const settings = await this.getSettings();
    const allFields = FieldDetector.getAllFields();

    if (allFields.length === 0) {
      return { success: false, message: 'No form fields found', results: [] };
    }

    // Initialize block container mappers if available
    if (typeof BlockContainerMapper !== 'undefined') {
      if (profile.workExperience) BlockContainerMapper.reset('work', profile.workExperience);
      if (profile.education) BlockContainerMapper.reset('edu', profile.education);
    }

    const results = [];
    const smartFields = [];
    const regularFields = [];

    for (const field of allFields) {
      if (settings.mode !== this.modes.QUICK && settings.autoDetectLongForm) {
        const analysis = SmartAnalyzer.analyzeField(field.element);
        if (analysis && analysis.confidence > 0.3 && analysis.isLongForm) {
          smartFields.push({ field, analysis });
          continue;
        }
      }
      regularFields.push(field);
    }

    for (let i = 0; i < regularFields.length; i++) {
      const field = regularFields[i];
      await new Promise(resolve => setTimeout(resolve, 50));

      // Handle multi-block fields (Work Exp, Education) using container-based indexing
      const isMultiBlock = (field.isWorkExp || field.isEdu);
      if (isMultiBlock) {
        if (typeof BlockContainerMapper !== 'undefined') {
          const blockType = field.isEdu ? 'edu' : 'work';
          const data = blockType === 'work' ? profile.workExperience : profile.education;

          if (data?.length > 0) {
            const entryIndex = BlockContainerMapper.getIndexForField(field.element, blockType);
            const entry = data[entryIndex];

            if (entry) {
              const value = this.mapBlockFieldValue(field.detectedType, entry, blockType);
              if (value != null && value !== '') {
                FormFiller.setFieldValue(field.element, String(value));
                results.push({
                  field: field.name || field.id || `field-${i}`,
                  type: field.detectedType,
                  success: true,
                  source: blockType,
                  entryIndex: entryIndex
                });
                continue;
              }
            }
          }
        }
        // 🔒 CRITICAL: Stop here for multi-block fields. No fallback to generic filling.
        continue;
      }

      const result = FormFiller.fillField(field.element, field.detectedType, profile);
      results.push({
        field: field.name || field.id || `field-${i}`,
        type: field.detectedType,
        ...result,
        source: 'fake'
      });
    }

    for (let i = 0; i < smartFields.length; i++) {
      const { field, analysis } = smartFields[i];
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const result = await this.fillSmartField(field.element, analysis, settings);
        results.push({
          field: field.name || field.id || `smart-field-${i}`,
          type: analysis.category,
          ...result
        });
      } catch (error) {
        console.error('Error filling smart field:', error);
        const fallbackResult = FormFiller.fillField(field.element, 'message', profile);
        results.push({
          field: field.name || field.id || `smart-field-${i}`,
          type: 'message',
          ...fallbackResult,
          source: 'fake-fallback'
        });
      }
    }

    return {
      success: true,
      fieldsCount: allFields.length,
      smartFieldsCount: smartFields.length,
      results
    };
  },

  async analyzeForm() {
    const allFields = FieldDetector.getAllFields();
    const analysis = {
      totalFields: allFields.length,
      smartFields: [],
      regularFields: []
    };

    for (const field of allFields) {
      const fieldAnalysis = SmartAnalyzer.analyzeField(field.element);

      if (fieldAnalysis && fieldAnalysis.confidence > 0.3 && fieldAnalysis.isLongForm) {
        analysis.smartFields.push({
          id: field.id,
          name: field.name,
          category: fieldAnalysis.category,
          confidence: fieldAnalysis.confidence,
          questionText: fieldAnalysis.questionText.substring(0, 100)
        });
      } else {
        analysis.regularFields.push({
          id: field.id,
          name: field.name,
          detectedType: field.detectedType
        });
      }
    }

    return analysis;
  },

  async generatePreview(element) {
    const analysis = SmartAnalyzer.analyzeField(element);

    if (!analysis || analysis.confidence < 0.3) {
      return null;
    }

    const settings = await this.getSettings();
    const userProfile = await UserProfileManager.getProfileForTemplates();

    if (settings.mode === this.modes.AI) {
      const isAIConfigured = await AIProvider.isConfigured();
      if (isAIConfigured) {
        try {
          const response = await AIProvider.generateResponse(
            analysis.category,
            analysis.questionText,
            userProfile
          );
          return {
            category: analysis.category,
            confidence: analysis.confidence,
            response,
            source: 'ai'
          };
        } catch (error) {
          console.warn('AI preview failed:', error);
        }
      }
    }

    const isLong = element.tagName.toLowerCase() === 'textarea';
    const templateResponse = ResponseTemplates.getTemplate(
      analysis.category,
      isLong,
      userProfile
    );

    return {
      category: analysis.category,
      confidence: analysis.confidence,
      response: templateResponse,
      source: 'template'
    };
  },

  async getModeInfo() {
    const settings = await this.getSettings();
    const isAIConfigured = await AIProvider.isConfigured();
    const profileComplete = await UserProfileManager.isProfileComplete();
    const completeness = await UserProfileManager.getProfileCompleteness();

    return {
      currentMode: settings.mode,
      aiAvailable: isAIConfigured,
      profileComplete,
      profileCompleteness: completeness,
      modes: [
        {
          id: this.modes.QUICK,
          name: 'Quick Fill',
          description: 'Random fake data for testing',
          icon: 'zap',
          available: true
        },
        {
          id: this.modes.SMART,
          name: 'Smart Fill',
          description: 'Templates with your profile data',
          icon: 'sparkles',
          available: true,
          recommended: !isAIConfigured
        },
        {
          id: this.modes.AI,
          name: 'AI Fill',
          description: 'Custom AI-generated responses',
          icon: 'brain',
          available: isAIConfigured,
          requiresSetup: !isAIConfigured
        }
      ]
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartFiller;
}
