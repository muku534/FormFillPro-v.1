const AIProvider = {
  SETTINGS_KEY: 'formfill_ai_settings',

  providers: {
    openai: {
      name: 'OpenAI',
      models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      defaultModel: 'gpt-4o-mini',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      keyPrefix: 'sk-'
    },
    anthropic: {
      name: 'Anthropic Claude',
      models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
      defaultModel: 'claude-3-5-haiku-20241022',
      endpoint: 'https://api.anthropic.com/v1/messages',
      keyPrefix: 'sk-ant-'
    },
    gemini: {
      name: 'Google Gemini',
      models: ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro-latest'],
      defaultModel: 'gemini-2.0-flash',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
      keyPrefix: 'AI'
    }
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
      console.error('Error loading AI settings:', error);
      return this.getDefaultSettings();
    }
  },

  getDefaultSettings() {
    return {
      enabled: false,
      provider: 'openai',
      model: 'gpt-4o-mini',
      apiKey: '',
      maxTokens: 500,
      temperature: 0.7
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
      console.error('Error saving AI settings:', error);
      return false;
    }
  },

  async isConfigured() {
    const settings = await this.getSettings();
    return settings.enabled && settings.apiKey && settings.apiKey.length > 10;
  },

  buildPrompt(questionCategory, questionText, userProfile, context = {}) {
    const profileInfo = this.formatProfileForPrompt(userProfile);

    const basePrompt = `You are helping someone fill out a job application form. Write a professional, authentic response for the following question.

USER PROFILE:
${profileInfo}

QUESTION CATEGORY: ${questionCategory}
QUESTION: ${questionText}

INSTRUCTIONS:
- Write in first person as if you are the applicant
- Be professional but authentic and conversational
- Keep the response concise but substantive
- Use specific details from the profile when relevant
- Avoid generic phrases and cliches
- Do not start with "I am" - vary your sentence openings
- Do not include any pleasantries or sign-offs unless specifically asked for a cover letter
- Match the tone to the question type (formal for cover letters, conversational for other questions)

Respond with ONLY the answer text, no additional commentary or formatting.`;

    return basePrompt;
  },

  formatProfileForPrompt(profile) {
    const parts = [];

    if (profile.fullName || profile.firstName) {
      parts.push(`Name: ${profile.fullName || profile.firstName}`);
    }
    if (profile.currentTitle) {
      parts.push(`Current Role: ${profile.currentTitle}`);
    }
    if (profile.currentCompany) {
      parts.push(`Current Company: ${profile.currentCompany}`);
    }
    if (profile.yearsExperience) {
      parts.push(`Experience: ${profile.yearsExperience} years`);
    }
    if (profile.industry) {
      parts.push(`Industry: ${profile.industry}`);
    }
    if (profile.skills) {
      parts.push(`Key Skills: ${profile.skills}`);
    }
    if (profile.education) {
      parts.push(`Education: ${profile.education}`);
    }
    if (profile.summary) {
      parts.push(`Professional Summary: ${profile.summary}`);
    }
    if (profile.goals) {
      parts.push(`Career Goals: ${profile.goals}`);
    }
    if (profile.resume) {
      parts.push(`\nRESUME/CV:\n${profile.resume}`);
    }
    if (profile.coverLetter) {
      parts.push(`\nCOVER LETTER TEMPLATE:\n${profile.coverLetter}`);
    }
    if (profile.additionalNotes) {
      parts.push(`\nADDITIONAL NOTES:\n${profile.additionalNotes}`);
    }

    return parts.length > 0 ? parts.join('\n') : 'No profile information provided';
  },

  async generateResponse(questionCategory, questionText, userProfile) {
    const settings = await this.getSettings();

    if (!settings.enabled || !settings.apiKey) {
      throw new Error('AI is not configured. Please add your API key in settings.');
    }

    const prompt = this.buildPrompt(questionCategory, questionText, userProfile);

    switch (settings.provider) {
      case 'openai':
        return this.callOpenAI(prompt, settings);
      case 'anthropic':
        return this.callAnthropic(prompt, settings);
      case 'gemini':
        return this.callGemini(prompt, settings);
      default:
        throw new Error(`Unknown provider: ${settings.provider}`);
    }
  },

  async callOpenAI(prompt, settings) {
    const response = await fetch(this.providers.openai.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: settings.maxTokens,
        temperature: settings.temperature
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  },

  async callAnthropic(prompt, settings) {
    const response = await fetch(this.providers.anthropic.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: settings.model,
        max_tokens: settings.maxTokens,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0]?.text?.trim() || '';
  },

  async callGemini(prompt, settings) {
    const endpoint = `${this.providers.gemini.endpoint}/${settings.model}:generateContent?key=${settings.apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          maxOutputTokens: settings.maxTokens,
          temperature: settings.temperature
        }
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text?.trim() || '';
  },

  async testConnection() {
    const settings = await this.getSettings();

    if (!settings.apiKey) {
      return { success: false, message: 'No API key configured' };
    }

    try {
      const testPrompt = 'Respond with exactly: "Connection successful"';
      let response;

      switch (settings.provider) {
        case 'openai':
          response = await this.callOpenAI(testPrompt, { ...settings, maxTokens: 20 });
          break;
        case 'anthropic':
          response = await this.callAnthropic(testPrompt, { ...settings, maxTokens: 20 });
          break;
        case 'gemini':
          response = await this.callGemini(testPrompt, { ...settings, maxTokens: 20 });
          break;
        default:
          return { success: false, message: 'Unknown provider' };
      }

      return {
        success: true,
        message: 'Connection successful',
        response: response.substring(0, 50)
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Connection failed'
      };
    }
  },

  validateApiKey(provider, key) {
    if (!key || typeof key !== 'string') return false;

    const providerConfig = this.providers[provider];
    if (!providerConfig) return false;

    if (provider === 'openai') {
      return key.startsWith('sk-') && key.length > 20;
    }
    if (provider === 'anthropic') {
      return key.startsWith('sk-ant-') && key.length > 20;
    }
    if (provider === 'gemini') {
      return key.length > 20;
    }

    return key.length > 10;
  },

  getProviderInfo(providerId) {
    return this.providers[providerId] || null;
  },

  getAllProviders() {
    return Object.entries(this.providers).map(([id, config]) => ({
      id,
      ...config
    }));
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIProvider;
}
