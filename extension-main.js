document.addEventListener('DOMContentLoaded', function () {

  var listPrFiles = document.getElementById('btn-list-pr-files');
  listPrFiles.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "list-pr-files"}, function(response) {
        //
      });
    });
  });

  var toggleCollapse = document.getElementById('btn-toggle-files-collapse');
  toggleCollapse.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle-collapse"}, function(response) {
        //
      });
    });
  });

  var toggleWideMode = document.getElementById('btn-toggle-wide-mode');
  toggleWideMode.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle-wide-mode"}, function(response) {
        //
      });
    });
  });

});
