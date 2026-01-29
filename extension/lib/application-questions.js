window.ApplicationQuestions = {
  categories: {
    workAuthorization: {
      name: 'Work Authorization',
      questions: {
        authorizedToWork: {
          label: 'Authorized to work in the US',
          patterns: [
            'legally authorized to work in the us',
            'legally authorized to work',
            'authorized to work in the us',
            'authorized to work',
            'work authorization',
            'legally able to work',
            'eligible to work',
            'legally authorized',
            'right to work',
            'proof that you are legally',
            'legally eligible',
            'employment eligibility',
            'legally permitted to work',
            'proof.*legally authorized',
            'can you provide proof.*legally able to work'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        requiresSponsorshipNow: {
          label: 'Requires visa sponsorship now',
          patterns: [
            'currently require sponsorship',
            'currently require.*visa',
            'currently require.*employment based visa',
            'require sponsorship.*to work for this company',
            'currently require sponsorship.*in order to work'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        requiresSponsorshipFuture: {
          label: 'Will require sponsorship in future',
          patterns: [
            'will you in the future require',
            'in the future.*require sponsorship',
            'future.*employment based visa',
            'will you in the future require sponsorship'
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
            'currently work at this company (default)',
            'currently work at this company',
            'currently work at',
            'do you currently work',
            'currently employed at',
            'presently employed at',
            'currently employed by',
            'are you currently employed at',
            'do you currently work at',
            'do you currently work',
            'do you currently work at cvs health',
            'do you currently work at cvs pharmacy',
            'do you currently work at aetna',
            'do you currently work.* subsidiaries'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        previouslyEmployedAtCompany: {
          label: 'Previously worked at this company',
          patterns: [
            'previously worked at company',
            'ever been employed',
            'previously employed',
            'ever worked at',
            'have you ever been employed',
            'formerly employed',
            'worked at.*before',
            'past employee',
            'prior employment',
            'have you ever worked at',
            'have you ever worked',
            'have you ever been employed by cvs health',
            'ever been employed by.*subsidiaries'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        previousGovernmentEmployee: {
          label: 'Former government employee',
          patterns: [
            'previously worked for government',
            'government employee',
            'federal.*state.*local.*government',
            'government entity',
            'government official',
            'civil service',
            'va hospital',
            'employed by.*government',
            'federal employee',
            'state employee',
            'public sector',
            'federal.*state or local government entity'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        currentColleague: {
          label: 'Current colleague or contractor',
          patterns: [
            'current colleague',
            'current contractor',
            'currently work for cvs health',
            'current colleague or contract worker'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        workedAtCvsPast12Months: {
          label: 'Worked at CVS in past 12 months',
          patterns: [
            'worked for cvs health.*past 12 months',
            'worked at cvs.*last 12 months',
            'cvs health.*past year'
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
            'at least 18 years of age',
            'at least 18 years old',
            'age 18 or older',
            '18 years of age or older',
            'at least eighteen'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        isOver21: {
          label: 'At least 21 years old',
          patterns: [
            'at least 21 years old',
            'at least 21',
            '21 years old',
            'twenty-one years',
            'over 21'
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
            'veteran of',
            'please select the veteran status which most accurately describes how you identify yourself'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No', 'Prefer not to say']
        },
        militarySpouse: {
          label: 'Military spouse',
          patterns: [
            'military spouse',
            'spouse or partner.*serves.*military',
            'spouse or partner of someone who serves',
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
            'identify as',
            'please select your gender'
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
            'racial background',
            'please select the ethnicity which most accurately describes how you identify yourself'
          ],
          type: 'select',
          defaultAnswer: 'Prefer not to say',
          options: ['Prefer not to say']
        },
        hispanicOrLatino: {
          label: 'Hispanic or Latino',
          patterns: [
            'are you hispanic or latino',
            'hispanic or latino'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No', 'Prefer not to say']
        },
        country: {
          label: 'Country',
          patterns: [
            'country',
            'country of residence',
            'location country'
          ],
          type: 'select',
          defaultAnswer: 'United States',
          options: ['United States', 'Canada', 'United Kingdom', 'India']
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
          defaultAnswer: '$80,000 - $100,000',
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
            'can work remotely',
            'remote work',
            'work remotely',
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
            'can work on-site',
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
            'can work hybrid',
            'hybrid',
            'hybrid schedule',
            'flexible work',
            'combination.*remote.*office'
          ],
          type: 'select',
          defaultAnswer: 'Yes',
          options: ['Yes', 'No']
        },
        availableForTravel: {
          label: 'Available for travel',
          patterns: [
            'available for business travel',
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
            'travel percentage acceptable',
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
            'professional disciplinary actions',
            'disciplinary action',
            'license.*revoked',
            'certification.*suspended',
            'professional.*sanction',
            'reprimand',
            'probation.*license',
            'credential.*action',
            'subject of.*disciplinary action',
            'ever been.*disciplinary.*action'
          ],
          type: 'select',
          defaultAnswer: 'No',
          options: ['Yes', 'No']
        },
        governmentExclusion: {
          label: 'Government program exclusion',
          patterns: [
            'excluded from government programs',
            'excluded.*debarred',
            'federal.*state.*excluded',
            'government.*procurement',
            'medicare.*medicaid.*excluded',
            'excluded from participation',
            'ineligible from participation',
            'excluded, debarred, suspended or otherwise ineligible',
            'excluded from.*federal or state health care program',
            'excluded from.*participation'
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
            'text notification',
            'authorize cvs health to communicate with me via text',
            'authorize.*communicate.*via text'
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
            'how did you hear about us (default)',
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
            'previously applied to this company (default)',
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
    requiresSponsorshipNow: 'No',
    requiresSponsorshipFuture: 'No',
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
    previousApplicant: 'No',
    currentColleague: 'No',
    workedAtCvsPast12Months: 'No'
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

  getQuestionDef(questionKey) {
    for (const category of Object.values(this.categories)) {
      if (category.questions[questionKey]) {
        return category.questions[questionKey];
      }
    }
    return null;
  },

  extractQuestionText(element) {
    if (!element) return '';

    // 1. Explicit Aria Label
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel.trim();

    // 2. Explicit ID Label
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) return label.innerText.trim();
    }

    // 3. Closest Logical Container (Fieldset/Group)
    const container = element.closest('fieldset, div[role="group"], div[data-automation-id^="formField"]');
    if (container) {
      // Priority: Legend -> RichText -> Label
      const legend = container.querySelector('legend');
      if (legend) return legend.innerText.trim();

      const richText = container.querySelector('[data-automation-id="richText"]');
      if (richText) return richText.innerText.trim();

      const label = container.querySelector('label');
      if (label) return label.innerText.trim();
    }

    // 4. Traversal: Search previous siblings and parents for meaningful text
    let current = element;
    for (let i = 0; i < 4; i++) { // Max depth
      if (!current) break;

      const prev = current.previousElementSibling;
      if (prev) {
        // Look for text-heavy elements
        if (['LABEL', 'H3', 'H4', 'H5', 'P', 'SPAN', 'DIV'].includes(prev.tagName)) {
          const text = prev.innerText.trim();
          // Heuristic: Question text usually has some length but isn't a whole paragraph
          if (text.length > 5 && text.length < 200) return text;
        }
        // If prev is just a wrapper, maybe go into it? (Skip for now, keep robust)
        current = prev; // Continue sideways
      } else {
        // Go up if no previous sibling
        current = current.parentElement;
        // Don't go too high (e.g., body)
        if (current === document.body) break;

        // Check immediate parent's text if it's a wrapper like a label
        if (current.tagName === 'LABEL') return current.innerText.trim();
      }
    }

    return '';
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApplicationQuestions;
}
