
// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'refresh_page') {
      // Get the currently active tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          // Relay the message to the active tab
          chrome.tabs.sendMessage(tabs[0].id, {message: "refresh_page"});
      });
  } else if (request.type === 'FROM_CONTENT_SCRIPT') {
      console.log('Background script received data:', request.data);
      // Now you can use the data within your extension's context
      // For example, you could store it in your extension's localStorage:
      chrome.storage.local.set({nt_profile: request.data});
  }
});
