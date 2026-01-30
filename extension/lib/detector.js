window.FieldDetector = {
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
        workExpTitle: { attributes: ['job-title', 'jobtitle', 'position-title', 'role-title', 'work-title', 'employment-title'], validFor: ['input'], autocomplete: [], isWorkExp: true },
        workExpCompany: { attributes: ['company-name', 'companyname', 'employer-name', 'employername', 'organization-name'], validFor: ['input'], autocomplete: [], isWorkExp: true },
        workExpLocation: { attributes: ['location', 'job-location', 'work-location', 'employment-location', 'office-location', 'work-city'], validFor: ['input'], autocomplete: [], isWorkExp: true },
        workExpStartDate: { attributes: ['start-date', 'startdate', 'from-date', 'fromdate', 'begin-date', 'begindate', 'date-from', 'datefrom', 'employment-start', 'work-start', 'mm/yyyy'], validFor: ['input'], autocomplete: [], isWorkExp: true, subType: 'start' },
        workExpEndDate: { attributes: ['end-date', 'enddate', 'to-date', 'todate', 'finish-date', 'date-to', 'dateto', 'employment-end', 'work-end', 'leave-date', 'to', 'mm/yyyy'], validFor: ['input'], autocomplete: [], isWorkExp: true, subType: 'end' },
        workExpDescription: { attributes: ['description', 'responsibilities', 'duties', 'accomplishments', 'summary', 'job-description', 'role-description', 'work-description', 'job-duties', 'role-summary', 'work-summary', 'achievements'], validFor: ['textarea', 'input'], autocomplete: [], isWorkExp: true, isLongText: true },
        workExpCurrentJob: { attributes: ['current-job', 'currentjob', 'currently-working', 'currentlyworking', 'present', 'i-currently-work', 'still-working'], validFor: ['input'], autocomplete: [], isWorkExp: true },

        // Education fields
        eduSchool: { attributes: ['school', 'university', 'college', 'institution', 'academy'], validFor: ['input'], autocomplete: ['organization'], isEdu: true },
        eduDegree: { attributes: ['degree', 'qualification', 'diploma', 'certification'], validFor: ['input', 'select', 'button'], autocomplete: [], isEdu: true },
        eduField: { attributes: ['field', 'major', 'study', 'discipline', 'subject', 'specialization'], validFor: ['input'], autocomplete: [], isEdu: true },
        eduGradYear: { attributes: ['gradyear', 'graduation', 'completed', 'finished'], validFor: ['input', 'number', 'select'], autocomplete: [], isEdu: true },
        eduStartDate: { attributes: ['edustart', 'edu-start', 'edu_start'], validFor: ['input', 'date', 'month'], autocomplete: [], isEdu: true, subType: 'start' },
        eduEndDate: { attributes: ['eduend', 'edu-end', 'edu_end'], validFor: ['input', 'date', 'month'], autocomplete: [], isEdu: true, subType: 'end' },
        eduGPA: { attributes: ['grade', 'gpa', 'average', 'score', 'result', 'cgd', 'cgpa'], validFor: ['input'], autocomplete: [], isEdu: true }
    },

    isDateField(el, labelText = '') {
        const text = `${labelText} ${el.placeholder || ''} ${el.name || ''} ${el.id || ''} ${el.getAttribute('aria-label') || ''}`.toLowerCase();

        return (
            el.type === 'date' ||
            el.type === 'month' ||
            el.inputMode === 'numeric' ||
            text.includes('mm/yyyy') ||
            text.includes('mm / yyyy') ||
            text.includes('month') ||
            text.includes('year') ||
            text.includes('date')
        );
    },

    detectDatePart(el) {
        const text = `${el.placeholder || ''} ${el.getAttribute('aria-label') || ''} ${el.name || ''} ${el.id || ''}`.toLowerCase();
        if (text.includes('mm') || text.includes('month')) return 'month';
        if (text.includes('yyyy') || text.includes('year')) return 'year';
        return null;
    },

    isCalendarDateField(el) {
        if (!el) return false;

        // Workday / enterprise calendar patterns
        return Boolean(
            el.closest('[role="group"]') &&
            el.closest('[role="group"]')?.querySelector('button, svg') &&
            (
                el.getAttribute('aria-haspopup') ||
                el.closest('[role="group"]')?.innerText?.includes('MM/YYYY') ||
                el.getAttribute('data-automation-id')?.includes('datePicker')
            )
        );
    },

    isMonthYearDateField(el) {
        return (
            el.tagName === 'INPUT' &&
            /MM\/YYYY/i.test(el.placeholder || '') ||
            el.closest('[role="dialog"]') ||
            el.closest('[aria-label*="calendar"]')
        );
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
        const secondaryFields = `${attrs.placeholder} ${attrs.label} ${attrs.ariaLabel} ${attrs.ariaDescribedby}`.toLowerCase();

        let bestMatch = null;
        let bestScore = 0;

        // PRIORITY 1: Precise Work/Edu match (must be a priority field)
        for (const [fieldType, pattern] of Object.entries(this.patterns)) {
            if (!pattern.isWorkExp && !pattern.isEdu) continue;
            if (!this.isValidForElement(pattern, elementType)) continue;

            let score = 0;
            for (const attr of pattern.attributes) {
                // Boost Work/Edu matches significantly
                if (this.matchesWordBoundary(primaryFields, [attr])) score += 20;
                if (this.matchesWordBoundary(secondaryFields, [attr])) score += 15;
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = fieldType;
            }
        }

        // If we have any solid priority match, return it
        if (bestMatch && bestScore >= 15) {
            return bestMatch;
        }

        // PRIORITY 2: Generic patterns
        let genericMatch = null;
        let genericScore = 0;

        for (const [fieldType, pattern] of Object.entries(this.patterns)) {
            if (pattern.isWorkExp || pattern.isEdu) continue;
            if (!this.isValidForElement(pattern, elementType)) continue;

            let score = 0;
            for (const attr of pattern.attributes) {
                if (this.matchesWordBoundary(primaryFields, [attr])) score += 10;
                if (this.matchesWordBoundary(secondaryFields, [attr])) score += 5;
            }

            if (score > genericScore) {
                genericScore = score;
                genericMatch = fieldType;
            }
        }

        // Return best overall, favoring priority if its score is decent
        if (bestMatch && bestScore >= 10 && bestScore >= genericScore) return bestMatch;
        if (genericMatch && genericScore >= 5) return genericMatch;

        // DIAGNOSTIC fallback logic...


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
        if (!searchString) return false;
        const searchLower = searchString.toLowerCase();

        // 1. Precise Split Check
        const words = searchLower.split(/[\s_\-.,/()|:*&%#@!]+/).filter(w => w.length > 0);

        for (const pattern of patterns) {
            const patternLower = pattern.toLowerCase();

            // Exact word match
            if (words.includes(patternLower)) return true;

            // 2. Regex word boundary check (covers cases like "role:description" or "location*")
            try {
                const regex = new RegExp(`(^|[^a-z0-9])${patternLower}([^a-z0-9]|$)`, 'i');
                if (regex.test(searchLower)) return true;
            } catch (e) { }

            // 3. Fallback for joined words like "worklocation"
            if (searchLower.includes(patternLower) && patternLower.length > 3) {
                return true;
            }
        }
        return false;
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

            const labelText = attrs.label || '';
            const isDate = this.isDateField(element, labelText);

            allFields.push({
                index: fieldIndex++,
                element,
                tagName,
                type: element.type || (isContentEditable ? 'contenteditable' : 'text'),
                detectedType: fieldType,
                isWorkExp: isWorkExp,
                isEdu: isEdu,
                isLongText: !!pattern.isLongText,
                isDate: isDate,
                isWorkExpDate: isWorkExp && isDate,
                isCalendarDate: this.isCalendarDateField(element),
                isDatePicker: this.isMonthYearDateField(element),
                subType: pattern.subType || null,
                datePart: this.detectDatePart(element),
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

    // Helper: Deep query selector all (traverses Shadow DOM)
    collectDeep(root, selector) {
        const results = [];
        try {
            // 1. Local results
            const nodes = root.querySelectorAll(selector);
            results.push(...nodes);

            // 2. Traversal
            const all = root.querySelectorAll('*');
            for (const el of all) {
                if (el.shadowRoot) {
                    results.push(...this.collectDeep(el.shadowRoot, selector));
                }
            }
        } catch (e) {
            // console.warn('Shadow DOM access error:', e);
        }
        return results;
    },

    detectApplicationQuestions(root = document) {
        // 🧠 WORKDAY INSIGHT: Questions are UI blocks (fieldset), not just inputs.
        const questions = [];

        // 1. Deep Scan for Containers (supporting Shadow DOM)
        const containers = this.collectDeep(root, 'fieldset legend, fieldset [data-automation-id="richText"], [data-automation-id^="formField-"]');

        containers.forEach((node) => {
            // Context A: Fieldset Based
            const fieldset = node.closest('fieldset');
            if (fieldset) {
                const button = fieldset.querySelector('button[aria-haspopup="listbox"], button[aria-haspopup="true"]');
                // Only process if we found a dropdown button
                if (button) {
                    // Extract text (prefer legend/richText if that's what we matched, otherwise find it)
                    let text = node.innerText;
                    if (node.tagName === 'FIELDSET') {
                        const legend = node.querySelector('legend');
                        text = legend ? legend.innerText : (node.innerText || '');
                    }

                    text = text.replace(/\u002A/g, '').replace(/\s+/g, ' ').trim(); // Logic restored with escaped asterisk

                    if (text.length > 5 && !questions.some(q => q.element === button)) {
                        questions.push({
                            type: 'applicationQuestion', // Will be refined by ApplicationQuestions.match later
                            questionText: text,
                            element: button,
                            tagName: 'button',
                            detectedType: 'applicationQuestion',
                            label: text,
                            container: fieldset,
                            options: this.getSelectOptions(button)
                        });
                    }
                }
            }

            // Context B: Data Automation Container (Generic)
            if (node.hasAttribute && node.getAttribute('data-automation-id')?.startsWith('formField-')) {
                const button = node.querySelector('button[aria-haspopup="listbox"]');
                if (button && !questions.some(q => q.element === button)) {
                    // Try to find label in this container or children
                    let labelEl = node.querySelector('label, [data-automation-id="formField-label"], legend');

                    // Deep fallback for label if not immediate
                    if (!labelEl) {
                        const richText = node.querySelector('[data-automation-id="richText"]');
                        if (richText) labelEl = richText;
                    }

                    const text = labelEl ? labelEl.innerText.trim() : '';

                    if (text) {
                        questions.push({
                            type: 'applicationQuestion',
                            questionText: text.replace(/\u002A/g, '').trim(),
                            element: button,
                            tagName: 'button',
                            detectedType: 'applicationQuestion',
                            label: text,
                            container: node
                        });
                    }
                }
            }
        });

        // 2. Fallback for "Solo Buttons" (Deep Scan)
        const allButtons = this.collectDeep(root, 'button[aria-haspopup="listbox"]');
        const soloButtons = allButtons.filter(btn => !questions.some(q => q.element === btn));

        soloButtons.forEach((button, index) => {
            let labelText = '';
            if (typeof window.ApplicationQuestions !== 'undefined' && typeof window.ApplicationQuestions.extractQuestionText === 'function') {
                labelText = window.ApplicationQuestions.extractQuestionText(button);
            } else if (typeof extractQuestionText === 'function') {
                labelText = extractQuestionText(button);
            } else {
                labelText = button.getAttribute('aria-label') || '';
            }

            if (labelText && labelText.length > 5) {
                questions.push({
                    index: 9500 + index, // High index to distinguish
                    element: button,
                    tagName: 'button',
                    type: 'applicationQuestion',
                    detectedType: 'applicationQuestion',
                    automationId: button.getAttribute('data-automation-id'),
                    id: button.id || `solo-q-${index}`,
                    name: button.name || button.getAttribute('name'),
                    label: labelText,
                    questionText: labelText,
                    required: button.getAttribute('aria-label')?.toLowerCase().includes('required'),
                    value: button.innerText
                });
            }
        });

        if (questions.length > 0) {
            console.log(`[FormFill] Detected ${questions.length} Workday application questions.`);
            // Diagnostic logging
            questions.forEach(q => console.log(`[AppQ] Found: "${q.label}" ->`, q.element));
        }

        return questions;
    },

    findAllInputElements() {
        const elements = [];
        const selector = 'input, select, textarea, [contenteditable="true"], [role="textbox"], [role="combobox"], button[aria-haspopup="listbox"], button[data-automation-id="dropdown"]';

        // Use recursive deep collection
        elements.push(...this.collectDeep(document, selector));

        // Also check iframes explicitly (though collectDeep usually handles shadow, iframes are different)
        try {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    if (iframeDoc) {
                        elements.push(...this.collectDeep(iframeDoc, selector));
                    }
                } catch (e) { }
            });
        } catch (e) { }

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
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FieldDetector;
}
