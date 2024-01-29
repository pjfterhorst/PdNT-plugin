console.log('content script running');

// Access localStorage of the page
let storedData = window.localStorage.getItem('__nt_profile__');
console.log('storedData:', storedData);

// If the data is stored as a JSON string, parse it
try {
  storedData = JSON.parse(storedData);
} catch (error) {
  console.error('Failed to parse stored data:', error);
}

// Send the data to the background script
chrome.runtime.sendMessage({ type: 'FROM_CONTENT_SCRIPT', data: storedData }, response => {
    console.log('Message sent', response);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "refresh_page") {
      location.reload();
    }
  }
);