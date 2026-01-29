const ApplicationQuestions = {
  categories: {
    workAuthorization: {
      name: 'Work Authorization',
      questions: {
        authorizedToWork: {
          label: 'Authorized to work in the US',
          patterns: [
            'legally able to work',
            'authorized to work',
            'work authorization',
            'eligible to work',
            'legally authorized',
            'right to work',
            'proof that you are legally',
            'legally eligible',
            'employment eligibility',
            'legally permitted to work'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        requiresSponsorship: {
          label: 'Requires visa sponsorship now',
          patterns: [
            'require sponsorship',
            'need sponsorship',
            'visa sponsorship',
            'employment based visa',
            'h-1b',
            'h1b',
            'work visa',
            'immigration sponsorship',
            'currently require sponsorship',
            'do you currently require'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        futureSponsorship: {
          label: 'Will require sponsorship in future',
          patterns: [
            'future require sponsorship',
            'will you require sponsorship',
            'in the future require',
            'future sponsorship',
            'will you need sponsorship',
            'future need visa',
            'future.*sponsorship',
            'will you in the future'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        }
      }
    },
    employmentHistory: {
      name: 'Employment History',
      questions: {
        currentlyEmployedAtCompany: {
          label: 'Currently work at this company',
          patterns: [
            'currently work at',
            'do you currently work',
            'currently employed at',
            'presently employed',
            'currently employed by',
            'are you currently employed at',
            'do you currently work at'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        previouslyEmployedAtCompany: {
          label: 'Previously worked at this company',
          patterns: [
            'ever been employed',
            'previously employed',
            'ever worked at',
            'have you ever been employed',
            'formerly employed',
            'worked at.*before',
            'past employee',
            'prior employment',
            'have you ever worked'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        previousGovernmentEmployee: {
          label: 'Former government employee',
          patterns: [
            'government employee',
            'federal.*state.*local.*government',
            'government entity',
            'government official',
            'civil service',
            'va hospital',
            'employed by.*government',
            'federal employee',
            'state employee',
            'public sector'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        }
      }
    },
    demographics: {
      name: 'Demographics & Age',
      questions: {
        isOver18: {
          label: 'At least 18 years old',
          patterns: [
            'at least 18',
            '18 years old',
            'over 18',
            'minimum age',
            'legal age',
            'of legal age',
            'are you 18',
            'eighteen years'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        isOver21: {
          label: 'At least 21 years old',
          patterns: [
            'at least 21',
            '21 years old',
            'over 21',
            'twenty-one years'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        veteranStatus: {
          label: 'Veteran status',
          patterns: [
            'veteran status',
            'military veteran',
            'served in.*military',
            'armed forces',
            'are you a veteran',
            'military service',
            'u.s. military',
            'veteran of'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No', 'Prefer not to say']
        },
        militarySpouse: {
          label: 'Military spouse',
          patterns: [
            'military spouse',
            'spouse.*partner.*military',
            'spouse or partner.*serves',
            'spouse.*serves.*military',
            'military family'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        disabilityStatus: {
          label: 'Disability status',
          patterns: [
            'disability status',
            'do you have a disability',
            'person with a disability',
            'disabled',
            'handicap'
          ],
          type: 'select',
          defaultAnswer: 'Prefer not to say',
          options: ['Yes', 'No', 'Prefer not to say']
        },
        gender: {
          label: 'Gender',
          patterns: [
            'gender',
            'sex',
            'male.*female',
            'identify as'
          ],
          type: 'select',
          defaultAnswer: 'Prefer not to say',
          options: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
        },
        ethnicity: {
          label: 'Race/Ethnicity',
          patterns: [
            'race',
            'ethnicity',
            'ethnic background',
            'racial background'
          ],
          type: 'select',
          defaultAnswer: 'Prefer not to say',
          options: ['Prefer not to say']
        }
      }
    },
    compensation: {
      name: 'Compensation',
      questions: {
        salaryExpectation: {
          label: 'Expected salary',
          patterns: [
            'salary expectation',
            'pay expectation',
            'expected salary',
            'desired salary',
            'compensation expectation',
            'base pay expectation',
            'salary requirement',
            'desired compensation',
            'expected compensation',
            'what is your.*salary'
          ],
          type: 'text',
          defaultAnswer: '',
          placeholder: '$80,000 - $100,000'
        },
        hourlyRate: {
          label: 'Expected hourly rate',
          patterns: [
            'hourly rate',
            'hourly expectation',
            'expected.*hourly',
            'desired hourly'
          ],
          type: 'text',
          defaultAnswer: '',
          placeholder: '$50/hour'
        }
      }
    },
    availability: {
      name: 'Availability & Start Date',
      questions: {
        startDate: {
          label: 'Available start date',
          patterns: [
            'start date',
            'when can you start',
            'earliest start',
            'available to start',
            'availability date',
            'date available',
            'when are you available'
          ],
          type: 'text',
          defaultAnswer: 'Immediately',
          placeholder: 'Immediately'
        },
        noticePeriod: {
          label: 'Notice period',
          patterns: [
            'notice period',
            'notice required',
            'how much notice',
            'two weeks notice',
            'required notice'
          ],
          type: 'text',
          defaultAnswer: '2 weeks',
          placeholder: '2 weeks'
        },
        willingToRelocate: {
          label: 'Willing to relocate',
          patterns: [
            'willing to relocate',
            'open to relocation',
            'relocate for this position',
            'consider relocating',
            'relocation'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No', 'Maybe']
        },
        canWorkRemote: {
          label: 'Can work remotely',
          patterns: [
            'work remotely',
            'remote work',
            'work from home',
            'telecommute',
            'remote position'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        canWorkOnsite: {
          label: 'Can work on-site',
          patterns: [
            'work on-site',
            'work onsite',
            'in-office',
            'office.*position',
            'on site.*work'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        canWorkHybrid: {
          label: 'Can work hybrid',
          patterns: [
            'hybrid',
            'combination.*remote.*office',
            'flexible work',
            'hybrid schedule'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        availableForTravel: {
          label: 'Available for travel',
          patterns: [
            'available for travel',
            'willing to travel',
            'travel required',
            'travel.*percent',
            'business travel'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        travelPercentage: {
          label: 'Travel percentage acceptable',
          patterns: [
            'travel percentage',
            'percent.*travel',
            'how much travel',
            '% travel'
          ],
          type: 'text',
          defaultAnswer: 'Up to 25%',
          placeholder: 'Up to 25%'
        }
      }
    },
    background: {
      name: 'Background & Compliance',
      questions: {
        backgroundCheck: {
          label: 'Consent to background check',
          patterns: [
            'background check',
            'background screening',
            'criminal background',
            'consent to.*background',
            'authorize.*background'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        drugTest: {
          label: 'Consent to drug test',
          patterns: [
            'drug test',
            'drug screening',
            'substance.*test',
            'consent to drug'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        hasConvictions: {
          label: 'Criminal convictions',
          patterns: [
            'convicted of',
            'criminal conviction',
            'felony',
            'misdemeanor',
            'criminal record',
            'been convicted',
            'criminal history'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        disciplinaryActions: {
          label: 'Professional disciplinary actions',
          patterns: [
            'disciplinary action',
            'license.*revoked',
            'certification.*suspended',
            'professional.*sanction',
            'reprimand',
            'probation.*license',
            'credential.*action'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        governmentExclusion: {
          label: 'Government program exclusion',
          patterns: [
            'excluded.*debarred',
            'government.*procurement',
            'medicare.*medicaid.*excluded',
            'federal.*state.*excluded',
            'excluded from participation',
            'ineligible from participation'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        }
      }
    },
    licenses: {
      name: 'Licenses & Certifications',
      questions: {
        hasDriversLicense: {
          label: 'Has valid driver\'s license',
          patterns: [
            'driver\'s license',
            'drivers license',
            'driving license',
            'valid license to drive',
            'motor vehicle license'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        hasProfessionalLicense: {
          label: 'Has professional license',
          patterns: [
            'professional license',
            'licensed in',
            'hold.*license',
            'current license',
            'active license'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        hasSecurityClearance: {
          label: 'Has security clearance',
          patterns: [
            'security clearance',
            'clearance level',
            'classified.*clearance',
            'secret clearance',
            'top secret'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No', 'Not applicable']
        }
      }
    },
    communication: {
      name: 'Communication Preferences',
      questions: {
        textAuthorization: {
          label: 'Authorize text messages',
          patterns: [
            'authorize.*text',
            'text message',
            'sms.*communication',
            'communicate.*via text',
            'receive text',
            'text notification'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        emailAuthorization: {
          label: 'Authorize email communication',
          patterns: [
            'authorize.*email',
            'email communication',
            'receive email',
            'contact.*email'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        }
      }
    },
    referral: {
      name: 'Referral & Source',
      questions: {
        howDidYouHear: {
          label: 'How did you hear about us',
          patterns: [
            'how did you hear',
            'how did you find',
            'where did you learn',
            'hear about.*position',
            'find this job',
            'source of application'
          ],
          type: 'text',
          defaultAnswer: 'LinkedIn',
          placeholder: 'LinkedIn, Indeed, Company Website...'
        },
        referralName: {
          label: 'Employee referral name',
          patterns: [
            'referred by',
            'referral name',
            'employee referral',
            'who referred you',
            'referral.*employee'
          ],
          type: 'text',
          defaultAnswer: '',
          placeholder: 'Referrer name (if applicable)'
        },
        previousApplicant: {
          label: 'Previously applied',
          patterns: [
            'previously applied',
            'applied before',
            'prior application',
            'past application',
            'have you applied'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        }
      }
    }
  },

  defaultAnswers: {
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
    ethnicity: 'Prefer not to say',
    salaryExpectation: '',
    hourlyRate: '',
    startDate: 'Immediately',
    noticePeriod: '2 weeks',
    willingToRelocate: 'Yes',
    canWorkRemote: 'Yes',
    canWorkOnsite: 'Yes',
    canWorkHybrid: 'Yes',
    availableForTravel: 'Yes',
    travelPercentage: 'Up to 25%',
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
    howDidYouHear: 'LinkedIn',
    referralName: '',
    previousApplicant: 'No'
  },

  detectQuestion(labelText, options = []) {
    if (!labelText) return null;

    const normalizedLabel = labelText.toLowerCase().trim();

    for (const [categoryKey, category] of Object.entries(this.categories)) {
      for (const [questionKey, question] of Object.entries(category.questions)) {
        for (const pattern of question.patterns) {
          const regex = new RegExp(pattern, 'i');
          if (regex.test(normalizedLabel)) {
            return {
              category: categoryKey,
              questionKey: questionKey,
              question: question,
              confidence: this.calculateConfidence(normalizedLabel, pattern, options, question)
            };
          }
        }
      }
    }

    return null;
  },

  calculateConfidence(label, matchedPattern, selectOptions, questionDef) {
    let confidence = 0.6;

    const patternWords = matchedPattern.split(/[\s.*]+/).filter(w => w.length > 2);
    const labelWords = label.split(/\s+/);
    const matchingWords = patternWords.filter(pw =>
      labelWords.some(lw => lw.includes(pw) || pw.includes(lw))
    );
    confidence += (matchingWords.length / patternWords.length) * 0.2;

    if (selectOptions && selectOptions.length > 0 && questionDef.options) {
      const optionTexts = selectOptions.map(o =>
        (typeof o === 'string' ? o : o.text || o.value || '').toLowerCase()
      );
      const expectedOptions = questionDef.options.map(o => o.toLowerCase());

      const matchingOptions = expectedOptions.filter(eo =>
        optionTexts.some(ot => ot.includes(eo) || eo.includes(ot))
      );

      if (matchingOptions.length > 0) {
        confidence += 0.15;
      }
    }

    return Math.min(confidence, 1.0);
  },

  getAnswer(questionKey, userAnswers = {}) {
    if (userAnswers[questionKey] !== undefined && userAnswers[questionKey] !== '') {
      return userAnswers[questionKey];
    }
    return this.defaultAnswers[questionKey] || '';
  },

  matchSelectOption(options, answer) {
    if (!options || options.length === 0) return null;

    const answerLower = answer.toLowerCase().trim();

    const exactMatch = options.find(opt => {
      const optText = (typeof opt === 'string' ? opt : opt.text || '').toLowerCase().trim();
      const optValue = (typeof opt === 'string' ? opt : opt.value || '').toLowerCase().trim();
      return optText === answerLower || optValue === answerLower;
    });

    if (exactMatch) {
      return typeof exactMatch === 'string' ? exactMatch : exactMatch.value;
    }

    const yesPatterns = ['yes', 'true', 'y', 'i do', 'i am', 'i have', 'i agree', 'i authorize', 'i consent', 'affirmative'];
    const noPatterns = ['no', 'false', 'n', 'i do not', 'i am not', 'i don\'t', 'negative'];

    const isYesAnswer = yesPatterns.some(p => answerLower.includes(p));
    const isNoAnswer = noPatterns.some(p => answerLower === p || answerLower.startsWith(p + ' '));

    if (isYesAnswer) {
      const yesOption = options.find(opt => {
        const optText = (typeof opt === 'string' ? opt : opt.text || '').toLowerCase();
        return yesPatterns.some(p => optText.includes(p) || optText === 'yes' || optText.startsWith('yes'));
      });
      if (yesOption) return typeof yesOption === 'string' ? yesOption : yesOption.value;
    }

    if (isNoAnswer) {
      const noOption = options.find(opt => {
        const optText = (typeof opt === 'string' ? opt : opt.text || '').toLowerCase();
        return optText === 'no' || optText.startsWith('no,') || optText.startsWith('no ');
      });
      if (noOption) return typeof noOption === 'string' ? noOption : noOption.value;
    }

    const containsMatch = options.find(opt => {
      const optText = (typeof opt === 'string' ? opt : opt.text || '').toLowerCase();
      return optText.includes(answerLower) || answerLower.includes(optText);
    });

    if (containsMatch) {
      return typeof containsMatch === 'string' ? containsMatch : containsMatch.value;
    }

    return null;
  },

  getAllQuestionKeys() {
    const keys = [];
    for (const category of Object.values(this.categories)) {
      for (const questionKey of Object.keys(category.questions)) {
        keys.push(questionKey);
      }
    }
    return keys;
  },

  getQuestionsByCategory() {
    return this.categories;
  },

  getCategoryForQuestion(questionKey) {
    for (const [categoryKey, category] of Object.entries(this.categories)) {
      if (category.questions[questionKey]) {
        return { categoryKey, category };
      }
    }
    return null;
  },

  match(text) {
    if (!text) return null;
    for (const category of Object.values(this.categories)) {
      for (const q of Object.values(category.questions)) {
        if (q.patterns.some(p => new RegExp(p, 'i').test(text))) {
          return q;
        }
      }
    }
    return null;
  }
};

function extractQuestionText(element) {
  const texts = [];

  // 1️⃣ <label for="">
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label?.innerText) texts.push(label.innerText);
  }

  // 2️⃣ Wrapped label
  const wrap = element.closest('label');
  if (wrap?.innerText) texts.push(wrap.innerText);

  // 3️⃣ Closest field container (THIS IS THE KEY)
  const container = element.closest(
    '[data-automation-id*="question"], [role="group"], fieldset, section, li, div'
  );

  if (container) {
    container.querySelectorAll('legend, label, span, p, h1, h2, h3')
      .forEach(el => {
        const t = el.innerText?.trim();
        if (t && t.length > 10) texts.push(t);
      });
  }

  // 4️⃣ aria-labelledby
  const aria = element.getAttribute('aria-labelledby');
  if (aria) {
    aria.split(' ').forEach(id => {
      const el = document.getElementById(id);
      if (el?.innerText) texts.push(el.innerText);
    });
  }

  return texts.join(' ').toLowerCase();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApplicationQuestions;
}
