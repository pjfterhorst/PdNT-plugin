// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'FROM_CONTENT_SCRIPT') {
      console.log('Background script received data:', request.data);
      // Now you can use the data within your extension's context
      // For example, you could store it in your extension's localStorage:
      chrome.storage.local.set({nt_profile: request.data});
    }
  });
  