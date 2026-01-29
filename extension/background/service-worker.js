chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'formfill-fill-field',
    title: 'Fill this field',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-fill-all',
    title: 'Fill all form fields',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-separator',
    type: 'separator',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-generate-email',
    title: 'Generate email',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-generate-phone',
    title: 'Generate phone',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-generate-name',
    title: 'Generate name',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-generate-address',
    title: 'Generate address',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    id: 'formfill-generate-password',
    title: 'Generate password',
    contexts: ['editable']
  });

  console.log('FormFill Pro: Extension installed');
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;

  try {
    switch (info.menuItemId) {
      case 'formfill-fill-field':
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const activeElement = document.activeElement;
            if (activeElement) {
              const profile = FakeDataGenerator.generateProfile();
              const fieldType = FieldDetector.detectFieldType(activeElement);
              FormFiller.fillField(activeElement, fieldType, profile);
            }
          }
        });
        break;

      case 'formfill-fill-all':
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const profile = FakeDataGenerator.generateProfile();
            FormFiller.fillAllForms(profile);
          }
        });
        break;

      case 'formfill-generate-email':
        await fillWithValue(tab.id, 'email');
        break;

      case 'formfill-generate-phone':
        await fillWithValue(tab.id, 'phone');
        break;

      case 'formfill-generate-name':
        await fillWithValue(tab.id, 'fullName');
        break;

      case 'formfill-generate-address':
        await fillWithValue(tab.id, 'address');
        break;

      case 'formfill-generate-password':
        await fillWithValue(tab.id, 'password');
        break;
    }
  } catch (error) {
    console.error('Context menu action failed:', error);
  }
});

async function fillWithValue(tabId, type) {
  await chrome.scripting.executeScript({
    target: { tabId },
    args: [type],
    func: (fieldType) => {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        const profile = FakeDataGenerator.generateProfile();
        const valueMap = {
          email: profile.email,
          phone: profile.phone,
          fullName: profile.fullName,
          address: profile.address.street,
          password: profile.password
        };
        FormFiller.setFieldValue(activeElement, valueMap[fieldType] || '');
      }
    }
  });
}

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  if (command === 'fill-all-forms') {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const profile = FakeDataGenerator.generateProfile();
        FormFiller.fillAllForms(profile);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showContextMenu') {
    console.log('Field type:', message.fieldType);
  }
  return true;
});

console.log('FormFill Pro: Service worker started');
