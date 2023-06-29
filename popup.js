function formatData(data, container) {
  for (let key in data) {
    let section = document.createElement('div');
    section.className = 'section';
    section.innerHTML = `<h2>${key}:</h2>`;
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        section.innerHTML += data[key].map(item => `<p>${item}</p>`).join('');
      } else {
        formatData(data[key], section);
      }
    } else {
      section.innerHTML += `<p>${data[key]}</p>`;
    }
    container.appendChild(section);
  }
}

chrome.storage.local.get(['nt_profile'], function(result) {
  let container = document.getElementById('data');
  formatData(result.nt_profile, container);
});
