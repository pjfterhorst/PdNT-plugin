chrome.storage.local.get(['nt_profile'], function(result) {
    document.getElementById('data').textContent = JSON.stringify(result.nt_profile, null, 2);
  });