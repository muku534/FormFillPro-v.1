const UserProfileManager = {
  STORAGE_KEY: 'formfill_user_profile',
  RESPONSE_CACHE_KEY: 'formfill_response_cache',

  defaultProfile: {
    personal: {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phone: '',
      linkedIn: '',
      portfolio: '',
      location: ''
    },
    professional: {
      currentTitle: '',
      currentCompany: '',
      yearsExperience: '',
      industry: '',
      skills: [],
      certifications: []
    },
    career: {
      summary: '',
      goals: '',
      preferredRoles: [],
      preferredIndustries: [],
      salaryRange: {
        min: '',
        max: '',
        currency: 'USD'
      },
      willingToRelocate: false,
      remotePreference: 'flexible'
    },
    education: {
      highestDegree: '',
      university: '',
      graduationYear: '',
      major: ''
    },
    preferences: {
      responseStyle: 'professional',
      responseLength: 'medium',
      includeMetrics: true,
      useFirstPerson: true
    }
  },

  async getProfile() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get(this.STORAGE_KEY);
        return this.mergeWithDefaults(result[this.STORAGE_KEY] || {});
      } else {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return this.mergeWithDefaults(stored ? JSON.parse(stored) : {});
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      return this.defaultProfile;
    }
  },

  async saveProfile(profile) {
    try {
      const merged = this.mergeWithDefaults(profile);
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({ [this.STORAGE_KEY]: merged });
      } else {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(merged));
      }
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  },

  async updateProfile(section, data) {
    const profile = await this.getProfile();
    if (profile[section]) {
      profile[section] = { ...profile[section], ...data };
    }
    return this.saveProfile(profile);
  },

  mergeWithDefaults(profile) {
    const merged = JSON.parse(JSON.stringify(this.defaultProfile));

    for (const section of Object.keys(merged)) {
      if (profile[section]) {
        if (typeof merged[section] === 'object' && !Array.isArray(merged[section])) {
          merged[section] = { ...merged[section], ...profile[section] };
        } else {
          merged[section] = profile[section];
        }
      }
    }

    return merged;
  },

  async clearProfile() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.remove(this.STORAGE_KEY);
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
      return true;
    } catch (error) {
      console.error('Error clearing profile:', error);
      return false;
    }
  },

  async getResponseCache() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get(this.RESPONSE_CACHE_KEY);
        return result[this.RESPONSE_CACHE_KEY] || {};
      } else {
        const stored = localStorage.getItem(this.RESPONSE_CACHE_KEY);
        return stored ? JSON.parse(stored) : {};
      }
    } catch (error) {
      console.error('Error loading response cache:', error);
      return {};
    }
  },

  async cacheResponse(questionHash, response) {
    try {
      const cache = await this.getResponseCache();
      cache[questionHash] = {
        response,
        timestamp: Date.now()
      };

      const maxCacheSize = 100;
      const entries = Object.entries(cache);
      if (entries.length > maxCacheSize) {
        entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        const newCache = Object.fromEntries(entries.slice(0, maxCacheSize));

        if (typeof chrome !== 'undefined' && chrome.storage) {
          await chrome.storage.local.set({ [this.RESPONSE_CACHE_KEY]: newCache });
        } else {
          localStorage.setItem(this.RESPONSE_CACHE_KEY, JSON.stringify(newCache));
        }
      } else {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          await chrome.storage.local.set({ [this.RESPONSE_CACHE_KEY]: cache });
        } else {
          localStorage.setItem(this.RESPONSE_CACHE_KEY, JSON.stringify(cache));
        }
      }
      return true;
    } catch (error) {
      console.error('Error caching response:', error);
      return false;
    }
  },

  async getCachedResponse(questionHash) {
    const cache = await this.getResponseCache();
    const cached = cache[questionHash];

    if (cached) {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - cached.timestamp < oneWeek) {
        return cached.response;
      }
    }
    return null;
  },

  hashQuestion(question) {
    let hash = 0;
    const str = question.toLowerCase().trim();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  },

  async clearResponseCache() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.remove(this.RESPONSE_CACHE_KEY);
      } else {
        localStorage.removeItem(this.RESPONSE_CACHE_KEY);
      }
      return true;
    } catch (error) {
      console.error('Error clearing response cache:', error);
      return false;
    }
  },

  getProfileForTemplates() {
    return this.getProfile().then(profile => ({
      firstName: profile.personal.firstName,
      lastName: profile.personal.lastName,
      fullName: profile.personal.fullName || `${profile.personal.firstName} ${profile.personal.lastName}`.trim(),
      email: profile.personal.email,
      phone: profile.personal.phone,
      skills: profile.professional.skills.join(', ') || 'problem-solving and communication',
      industry: profile.professional.industry || 'technology',
      yearsExperience: profile.professional.yearsExperience || '5+',
      currentTitle: profile.professional.currentTitle,
      currentCompany: profile.professional.currentCompany,
      education: profile.education.highestDegree ?
        `${profile.education.highestDegree} from ${profile.education.university}` : '',
      summary: profile.career.summary,
      goals: profile.career.goals
    }));
  },

  async exportProfile() {
    const profile = await this.getProfile();
    const cache = await this.getResponseCache();
    return {
      profile,
      cache,
      exportDate: new Date().toISOString()
    };
  },

  async importProfile(data) {
    try {
      if (data.profile) {
        await this.saveProfile(data.profile);
      }
      if (data.cache) {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          await chrome.storage.local.set({ [this.RESPONSE_CACHE_KEY]: data.cache });
        } else {
          localStorage.setItem(this.RESPONSE_CACHE_KEY, JSON.stringify(data.cache));
        }
      }
      return true;
    } catch (error) {
      console.error('Error importing profile:', error);
      return false;
    }
  },

  isProfileComplete() {
    return this.getProfile().then(profile => {
      const hasPersonal = !!(
        profile.personal.firstName &&
        profile.personal.lastName &&
        profile.personal.email
      );
      const hasProfessional = !!(
        profile.professional.yearsExperience &&
        profile.professional.skills.length > 0
      );
      return hasPersonal && hasProfessional;
    });
  },

  getProfileCompleteness() {
    return this.getProfile().then(profile => {
      const fields = [
        profile.personal.firstName,
        profile.personal.lastName,
        profile.personal.email,
        profile.personal.phone,
        profile.professional.currentTitle,
        profile.professional.yearsExperience,
        profile.professional.industry,
        profile.professional.skills.length > 0,
        profile.career.summary,
        profile.education.highestDegree
      ];
      const filled = fields.filter(f => f).length;
      return Math.round((filled / fields.length) * 100);
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserProfileManager;
}
