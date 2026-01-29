# Store Submission Checklist

Use this checklist to ensure you're ready to submit FormFill Pro to the Chrome Web Store and Microsoft Edge Add-ons.

---

## Pre-Submission Tasks

### 1. Create Developer Accounts

- [ ] Chrome Web Store Developer account created ($5 fee)
  - URL: https://chrome.google.com/webstore/devconsole
- [ ] Microsoft Edge Add-ons Partner account created (free)
  - URL: https://partner.microsoft.com/dashboard/microsoftedge

### 2. Prepare Extension Package

- [ ] Run `npm run package` to create `formfill-pro.zip`
- [ ] Verify package is under 50MB
- [ ] Test package by loading in Chrome/Edge
  - Go to chrome://extensions
  - Enable "Developer mode"
  - Click "Load unpacked"
  - Select the extension folder
  - Test all features work correctly

### 3. Create Visual Assets

- [ ] **Icon** - 128x128px PNG (already in extension/icons/)
- [ ] **Screenshots** - 5-10 images at 1280x800px
  1. [ ] Main popup interface
  2. [ ] Form detection view
  3. [ ] Before/after form filling
  4. [ ] Quick fill buttons
  5. [ ] Real-world example (contact form)
  6. [ ] Settings/templates (optional)
  7. [ ] Additional feature showcases (optional)

📸 See SCREENSHOTS_GUIDE.md for detailed screenshot instructions

- [ ] **Promotional Images** (optional but recommended)
  - [ ] Small tile: 440x280px
  - [ ] Large tile: 920x680px
  - [ ] Marquee: 1400x560px

### 4. Prepare Store Listing Content

- [ ] Copy description from STORE_LISTING.md
- [ ] Have short description ready (132 characters max)
- [ ] Prepare permission justifications
- [ ] Have keywords/tags ready

### 5. Setup Online Presence

- [ ] Create GitHub repository (optional but recommended)
  - [ ] Upload source code
  - [ ] Add README with installation instructions
  - [ ] Include LICENSE file
  - [ ] Host PRIVACY.md on GitHub
  - [ ] Enable GitHub Issues for support

- [ ] Host privacy policy (choose one):
  - [ ] On GitHub (https://github.com/yourname/formfill-pro/blob/main/PRIVACY.md)
  - [ ] On your website
  - [ ] On a free hosting service

- [ ] Create support channel:
  - [ ] GitHub Issues URL
  - [ ] Support email address
  - [ ] Contact form on website

---

## Chrome Web Store Submission

### Upload & Basic Info

- [ ] Go to Chrome Web Store Developer Dashboard
- [ ] Click "New Item"
- [ ] Upload `formfill-pro.zip`
- [ ] Wait for automatic analysis to complete
- [ ] Fill in store listing information:

#### Product Details

- [ ] **Item Name:** FormFill Pro
- [ ] **Summary:** (132 chars from STORE_LISTING.md)
- [ ] **Description:** (Full description from STORE_LISTING.md)
- [ ] **Category:** Developer Tools
- [ ] **Language:** English

#### Graphics Assets

- [ ] Upload 128x128 icon
- [ ] Upload 5-10 screenshots (1280x800)
- [ ] Upload promotional tiles (optional)

#### Privacy & Permissions

- [ ] Add privacy policy URL
- [ ] Single purpose description:
  ```
  FormFill Pro fills web forms with realistic fake data for testing and development purposes.
  ```
- [ ] Justify each permission:
  - [ ] `activeTab` - Access form fields on current page
  - [ ] `storage` - Store user preferences locally
  - [ ] `scripting` - Inject scripts to detect/fill forms
  - [ ] `contextMenus` - Provide right-click menu options
  - [ ] `host_permissions` - Work on any website

- [ ] Certify: "Does NOT use or transfer data"

#### Distribution

- [ ] Set visibility: Public or Unlisted
- [ ] Select regions: All or specific
- [ ] Confirm pricing: Free

### Final Review

- [ ] Preview listing appearance
- [ ] Check all links work
- [ ] Review all text for typos
- [ ] Verify screenshots display correctly
- [ ] Test extension one more time

### Submit

- [ ] Click "Submit for Review"
- [ ] Save listing URL for your records
- [ ] Expect review within 1-3 business days

---

## Microsoft Edge Add-ons Submission

### Upload & Basic Info

- [ ] Go to Partner Center Dashboard
- [ ] Click "New Extension"
- [ ] Upload `formfill-pro.zip`
- [ ] Fill in store listing:

#### Product Identity

- [ ] **Display Name:** FormFill Pro
- [ ] **Short Description:** (from STORE_LISTING.md)
- [ ] **Long Description:** (from STORE_LISTING.md)
- [ ] **Category:** Developer Tools
- [ ] **Tags:** form filler, test data, QA testing, developer tools

#### Store Listings

- [ ] **Language:** English (United States)
- [ ] Upload same screenshots as Chrome
- [ ] Upload 128x128 icon

#### Privacy

- [ ] Add privacy policy URL
- [ ] Add support URL (GitHub Issues or email)

#### Properties

- [ ] **Pricing:** Free
- [ ] **Markets:** All or specific regions

### Final Review

- [ ] Preview listing
- [ ] Check all information
- [ ] Test extension works on Edge

### Submit

- [ ] Click "Publish"
- [ ] Save listing URL
- [ ] Expect review within 1-2 business days

---

## Post-Submission Tasks

### Monitor Review Process

- [ ] Check email daily for review updates
- [ ] Respond quickly to any reviewer questions
- [ ] Make requested changes if any

### Prepare for Launch

- [ ] Draft launch announcement
- [ ] Prepare social media posts
- [ ] Create demo video (optional)
- [ ] Write blog post about the extension

### After Approval

- [ ] Update GitHub README with store links
- [ ] Share on social media
- [ ] Submit to:
  - [ ] Product Hunt
  - [ ] Hacker News
  - [ ] Reddit (r/webdev, r/chrome, etc.)
  - [ ] Dev.to / Medium

- [ ] Set up analytics (privacy-respecting)
- [ ] Monitor user reviews
- [ ] Respond to feedback

---

## Common Rejection Reasons & How to Avoid

### "Permissions Too Broad"
✅ **Solution:** Provide detailed justification for each permission in the listing

### "Privacy Policy Unclear"
✅ **Solution:** Ensure privacy policy is detailed and addresses data collection (or lack thereof)

### "Misleading Functionality"
✅ **Solution:** Make sure description and screenshots accurately represent the extension

### "Single Purpose Not Clear"
✅ **Solution:** Clearly state the single purpose in the designated field

### "External Code"
✅ **Solution:** Don't load external scripts; all code should be in the package

---

## Support Resources

### Official Documentation

**Chrome Web Store:**
- Developer Dashboard: https://chrome.google.com/webstore/devconsole
- Publishing Guide: https://developer.chrome.com/docs/webstore/publish/
- Program Policies: https://developer.chrome.com/docs/webstore/program-policies/

**Microsoft Edge Add-ons:**
- Partner Center: https://partner.microsoft.com/dashboard/microsoftedge
- Publishing Docs: https://docs.microsoft.com/microsoft-edge/extensions-chromium/publish/
- Certification Policies: https://docs.microsoft.com/microsoft-edge/extensions-chromium/store-policies/

### Community Support

- Chrome Extensions Google Group
- Microsoft Edge Add-ons Discord
- Stack Overflow (tags: google-chrome-extension, microsoft-edge-extension)

---

## Timeline Estimate

| Task | Time Required |
|------|---------------|
| Create developer accounts | 15-30 minutes |
| Prepare visual assets | 2-4 hours |
| Write store listings | 1-2 hours |
| Submit to Chrome Web Store | 30 minutes |
| Submit to Edge Add-ons | 30 minutes |
| **Chrome review** | **1-3 business days** |
| **Edge review** | **1-2 business days** |
| **Total to launch** | **3-5 business days after submission** |

---

## Quick Links

- 📋 [Store Listing Copy](./STORE_LISTING.md)
- 🔒 [Privacy Policy](./PRIVACY.md)
- 📖 [Publishing Guide](./PUBLISHING_GUIDE.md)
- 📸 [Screenshots Guide](./SCREENSHOTS_GUIDE.md)

---

**You're ready to submit! Good luck! 🚀**

Questions? Open an issue on GitHub or contact us at [your-email]
