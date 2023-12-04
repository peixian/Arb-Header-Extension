let customHeaders = [];

// Load headers from storage
chrome.storage.local.get('customHeaders', function(data) {
  customHeaders = data.customHeaders || [];
});

// Update headers on storage change
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.customHeaders) {
    customHeaders = changes.customHeaders.newValue || [];
  }
});

// Add headers to each request
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    customHeaders.forEach(header => {
      details.requestHeaders.push({ name: header.name, value: header.value });
    });
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);
