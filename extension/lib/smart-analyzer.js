const SmartAnalyzer = {
  questionPatterns: {
    motivation: {
      keywords: ['why', 'interested', 'motivation', 'motivate', 'passion', 'attracted', 'drawn', 'appeal', 'excite', 'inspire'],
      contexts: ['position', 'role', 'company', 'job', 'opportunity', 'career', 'field', 'industry', 'work here', 'join'],
      category: 'motivation'
    },
    experience: {
      keywords: ['experience', 'background', 'worked', 'previous', 'history', 'tell us about', 'describe your', 'walk through'],
      contexts: ['relevant', 'professional', 'work', 'career', 'role', 'similar', 'past'],
      category: 'experience'
    },
    skills: {
      keywords: ['skills', 'strengths', 'abilities', 'capabilities', 'proficient', 'expertise', 'competencies', 'qualified'],
      contexts: ['technical', 'soft', 'key', 'core', 'main', 'top', 'best', 'strongest'],
      category: 'skills'
    },
    weaknesses: {
      keywords: ['weakness', 'improve', 'development', 'challenge', 'struggle', 'difficult', 'area of growth'],
      contexts: ['areas', 'improvement', 'working on', 'overcome'],
      category: 'weaknesses'
    },
    achievements: {
      keywords: ['achievement', 'accomplish', 'proud', 'success', 'contributed', 'impact', 'result', 'outcome'],
      contexts: ['greatest', 'biggest', 'most', 'significant', 'notable', 'key'],
      category: 'achievements'
    },
    goals: {
      keywords: ['goals', 'future', 'aspire', 'plan', 'see yourself', 'where do you', 'long-term', 'short-term', '5 years', 'five years'],
      contexts: ['career', 'professional', 'next', 'achieve', 'hope'],
      category: 'goals'
    },
    teamwork: {
      keywords: ['team', 'collaborate', 'work with others', 'group', 'together', 'cooperation', 'teamwork'],
      contexts: ['experience', 'describe', 'example', 'situation', 'project'],
      category: 'teamwork'
    },
    conflict: {
      keywords: ['conflict', 'disagreement', 'difficult', 'challenge', 'problem', 'issue', 'handled', 'resolved'],
      contexts: ['coworker', 'colleague', 'team', 'manager', 'customer', 'client', 'situation'],
      category: 'conflict'
    },
    leadership: {
      keywords: ['lead', 'leadership', 'manage', 'supervise', 'mentor', 'guide', 'direct', 'initiative'],
      contexts: ['team', 'project', 'experience', 'style', 'approach'],
      category: 'leadership'
    },
    salary: {
      keywords: ['salary', 'compensation', 'pay', 'expectation', 'requirement', 'range', 'desired', 'current'],
      contexts: ['expect', 'looking for', 'require', 'need'],
      category: 'salary'
    },
    availability: {
      keywords: ['available', 'start', 'begin', 'notice', 'when can you', 'earliest', 'join'],
      contexts: ['date', 'period', 'time', 'immediately'],
      category: 'availability'
    },
    relocation: {
      keywords: ['relocate', 'relocation', 'move', 'travel', 'commute', 'remote', 'location'],
      contexts: ['willing', 'open', 'able', 'flexible'],
      category: 'relocation'
    },
    whyLeaving: {
      keywords: ['leaving', 'leave', 'left', 'change', 'looking for new', 'reason for'],
      contexts: ['current', 'previous', 'job', 'position', 'company', 'role'],
      category: 'whyLeaving'
    },
    culture: {
      keywords: ['culture', 'environment', 'work style', 'values', 'fit', 'atmosphere'],
      contexts: ['prefer', 'ideal', 'thrive', 'best', 'look for'],
      category: 'culture'
    },
    projects: {
      keywords: ['project', 'portfolio', 'work sample', 'example', 'describe a time', 'tell us about a'],
      contexts: ['complex', 'challenging', 'successful', 'recent', 'significant'],
      category: 'projects'
    },
    introduction: {
      keywords: ['yourself', 'about you', 'introduce', 'who are you', 'tell us about yourself', 'describe yourself'],
      contexts: ['tell', 'describe', 'brief', 'summary'],
      category: 'introduction'
    },
    coverLetter: {
      keywords: ['cover letter', 'letter of interest', 'application letter', 'why should we hire'],
      contexts: ['write', 'provide', 'submit', 'attach'],
      category: 'coverLetter'
    },
    additionalInfo: {
      keywords: ['additional', 'anything else', 'other information', 'want us to know', 'like to add', 'comments'],
      contexts: ['share', 'add', 'include', 'mention'],
      category: 'additionalInfo'
    }
  },

  industryKeywords: {
    tech: ['software', 'developer', 'engineer', 'programming', 'code', 'tech', 'IT', 'data', 'cloud', 'devops', 'frontend', 'backend', 'fullstack', 'web', 'mobile', 'app', 'api', 'database', 'machine learning', 'AI', 'artificial intelligence'],
    healthcare: ['health', 'medical', 'patient', 'clinical', 'hospital', 'nurse', 'doctor', 'pharmaceutical', 'care'],
    finance: ['finance', 'banking', 'investment', 'accounting', 'financial', 'trading', 'insurance', 'fintech'],
    marketing: ['marketing', 'brand', 'advertising', 'digital marketing', 'SEO', 'content', 'social media', 'campaign'],
    sales: ['sales', 'account', 'client', 'customer', 'revenue', 'business development', 'quota'],
    education: ['education', 'teaching', 'training', 'learning', 'curriculum', 'student', 'academic'],
    design: ['design', 'UX', 'UI', 'creative', 'graphic', 'visual', 'product design', 'user experience'],
    hr: ['HR', 'human resources', 'recruiting', 'talent', 'people', 'hiring', 'employee'],
    operations: ['operations', 'logistics', 'supply chain', 'process', 'efficiency', 'management'],
    legal: ['legal', 'law', 'attorney', 'compliance', 'regulatory', 'contract']
  },

  seniorityKeywords: {
    entry: ['entry', 'junior', 'associate', 'intern', 'graduate', 'trainee', 'assistant', 'coordinator'],
    mid: ['mid', 'intermediate', 'specialist', 'analyst', 'developer', 'engineer'],
    senior: ['senior', 'lead', 'principal', 'staff', 'expert', 'architect'],
    management: ['manager', 'director', 'head', 'VP', 'chief', 'executive', 'president', 'C-level']
  },

  analyzeQuestion(text, fieldContext = {}) {
    if (!text || typeof text !== 'string') return null;

    const lowerText = text.toLowerCase();
    const scores = {};

    for (const [patternName, pattern] of Object.entries(this.questionPatterns)) {
      let score = 0;

      for (const keyword of pattern.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }

      for (const context of pattern.contexts) {
        if (lowerText.includes(context.toLowerCase())) {
          score += 1;
        }
      }

      if (score > 0) {
        scores[patternName] = score;
      }
    }

    if (Object.keys(scores).length === 0) return null;

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topCategory, topScore] = sorted[0];

    return {
      category: topCategory,
      confidence: Math.min(topScore / 10, 1),
      allMatches: sorted.map(([cat, score]) => ({ category: cat, score })),
      originalText: text,
      context: this.extractContext(text, fieldContext)
    };
  },

  extractContext(text, fieldContext = {}) {
    const lowerText = text.toLowerCase();
    const context = {
      industry: null,
      seniority: null,
      roleType: null,
      isSpecific: false
    };

    for (const [industry, keywords] of Object.entries(this.industryKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          context.industry = industry;
          break;
        }
      }
      if (context.industry) break;
    }

    for (const [level, keywords] of Object.entries(this.seniorityKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          context.seniority = level;
          break;
        }
      }
      if (context.seniority) break;
    }

    if (fieldContext.pageTitle) {
      const pageTitle = fieldContext.pageTitle.toLowerCase();
      for (const [industry, keywords] of Object.entries(this.industryKeywords)) {
        for (const keyword of keywords) {
          if (pageTitle.includes(keyword.toLowerCase())) {
            context.industry = context.industry || industry;
            break;
          }
        }
      }
    }

    context.isSpecific = !!(context.industry || context.seniority);

    return context;
  },

  extractQuestionFromField(element) {
    const sources = [];

    const label = this.findFieldLabel(element);
    if (label) sources.push(label);

    if (element.placeholder) sources.push(element.placeholder);

    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) sources.push(ariaLabel);

    const ariaDescribedBy = element.getAttribute('aria-describedby');
    if (ariaDescribedBy) {
      const describedEl = document.getElementById(ariaDescribedBy);
      if (describedEl) sources.push(describedEl.textContent);
    }

    const title = element.getAttribute('title');
    if (title) sources.push(title);

    const wrapper = element.closest('.form-group, .field, .input-group, .question, [class*="field"], [class*="question"]');
    if (wrapper) {
      const questionText = wrapper.querySelector('h3, h4, h5, .question-text, .field-label, [class*="question"], [class*="label"]');
      if (questionText && questionText !== element) {
        sources.push(questionText.textContent);
      }
    }

    const combined = sources
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .join(' ');

    return combined;
  },

  findFieldLabel(element) {
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) return label.textContent.replace(/[*:]/g, '').trim();
    }

    const parentLabel = element.closest('label');
    if (parentLabel) {
      const clone = parentLabel.cloneNode(true);
      clone.querySelectorAll('input, select, textarea').forEach(el => el.remove());
      return clone.textContent.replace(/[*:]/g, '').trim();
    }

    const prev = element.previousElementSibling;
    if (prev && (prev.tagName === 'LABEL' || prev.classList.contains('label'))) {
      return prev.textContent.replace(/[*:]/g, '').trim();
    }

    return null;
  },

  isLongFormQuestion(element) {
    if (element.tagName.toLowerCase() === 'textarea') return true;

    if (element.tagName.toLowerCase() === 'input') {
      const type = element.type?.toLowerCase();
      if (type === 'text') {
        const maxLength = parseInt(element.getAttribute('maxlength') || '0');
        if (maxLength === 0 || maxLength > 200) {
          const questionText = this.extractQuestionFromField(element);
          const analysis = this.analyzeQuestion(questionText);
          return analysis && analysis.confidence > 0.3;
        }
      }
    }

    return false;
  },

  getPageContext() {
    return {
      pageTitle: document.title,
      pageUrl: window.location.href,
      metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      h1: document.querySelector('h1')?.textContent || ''
    };
  },

  analyzeField(element) {
    const questionText = this.extractQuestionFromField(element);
    if (!questionText || questionText.length < 10) return null;

    const pageContext = this.getPageContext();
    const analysis = this.analyzeQuestion(questionText, pageContext);

    if (!analysis) return null;

    return {
      ...analysis,
      element,
      questionText,
      isLongForm: this.isLongFormQuestion(element),
      pageContext
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartAnalyzer;
}
