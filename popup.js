document.getElementById('refreshBtn').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "refresh_page"});
  });
});

// Get stored data from local storage
chrome.storage.local.get(['nt_profile'], function(result) {
  let dataToDisplay = JSON.stringify(result.nt_profile, null, 2);

// Handle checkbox changes
document.getElementById('showAll').addEventListener('change', function(e) {
  if (e.target.checked) {
      document.getElementById('showAudiences').checked = false;
      document.getElementById('showTraits').checked = false;
      displayData(result.nt_profile);
  }
});

document.getElementById('showAudiences').addEventListener('change', function(e) {
  if (e.target.checked) {
      document.getElementById('showAll').checked = false;
      document.getElementById('showTraits').checked = false;
      displayData({audiences: result.nt_profile.audiences});
  }
});

document.getElementById('showTraits').addEventListener('change', function(e) {
  if (e.target.checked) {
      document.getElementById('showAll').checked = false;
      document.getElementById('showAudiences').checked = false;
      displayData({traits: result.nt_profile.traits});
  }
});



  // Default to show all
  displayData(result.nt_profile);
});

function displayData(data) {
  const dataDiv = document.getElementById('data');
  dataDiv.textContent = '';
  dataDiv.appendChild(renderJson(data));
}

function renderJson(jsonData) {
  const fragment = document.createDocumentFragment();

  Object.keys(jsonData).forEach(key => {
    fragment.appendChild(createSection(jsonData, key));
  });

  return fragment;
}

function createKeyValuePair(data, key) {
  const p = document.createElement('p');
  p.textContent = `${key} : ${data[key]}`;
  return p;
}


function createSection(data, key) {
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = key;
  sectionDiv.appendChild(h3);

  if (Array.isArray(data[key])) {
    const ul = document.createElement('ul');
    data[key].forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    sectionDiv.appendChild(ul);
  } else if (typeof data[key] === 'object' && data[key] !== null) {
    Object.keys(data[key]).forEach(subKey => {
      sectionDiv.appendChild(createKeyValuePair(data[key], subKey));
    });
  } else {
    const p = document.createElement('p');
    p.textContent = `${key}: ${data[key]}`;
    sectionDiv.appendChild(p);
  }

  return sectionDiv;
}
