// Update headers list
function updateHeadersList() {
  chrome.storage.local.get('customHeaders', function(data) {
    const headersList = document.getElementById('headersList');
    headersList.innerHTML = '';
    (data.customHeaders || []).forEach((header, index) => {
      let listItem = document.createElement('li');
      listItem.textContent = `${header.name}: ${header.value} `;
      listItem.appendChild(createDeleteButton(index));
      headersList.appendChild(listItem);
    });
  });
}

// Create delete button
function createDeleteButton(index) {
  let button = document.createElement('button');
  button.textContent = 'Delete';
  button.onclick = function() {
    chrome.storage.local.get('customHeaders', function(data) {
      let headers = data.customHeaders || [];
      headers.splice(index, 1);
      chrome.storage.local.set({ 'customHeaders': headers }, updateHeadersList);
    });
  };
  return button;
}

// Add header
document.getElementById('setHeaderButton').addEventListener('click', () => {
  const headerName = document.getElementById('headerName').value;
  const headerValue = document.getElementById('headerValue').value;

  if (headerName && headerValue) {
    chrome.storage.local.get('customHeaders', function(data) {
      let headers = data.customHeaders || [];
      headers.push({ name: headerName, value: headerValue });
      chrome.storage.local.set({ 'customHeaders': headers }, updateHeadersList);
    });
  } else {
    alert("Please enter both name and value for the header.");
  }
});

// Initial update
updateHeadersList();
