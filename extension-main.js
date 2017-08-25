document.addEventListener('DOMContentLoaded', function () {

  var listPrFiles = document.getElementById('btn-list-pr-files');
  listPrFiles.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "list-pr-files"}, function(response) {
        //
      });
    });
  });

  var toggleCollapse = document.getElementById('btn-toggle-files-collapse');
  toggleCollapse.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle-collapse"}, function(response) {
        //
      });
    });
  });

  var toggleWideMode = document.getElementById('btn-toggle-wide-mode');
  toggleWideMode.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle-wide-mode"}, function(response) {
        //
      });
    });
  });

  var expandFiles = document.getElementById('btn-expand-files');
  expandFiles.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "expand-files"}, function(response) {
        //
      });
    });
  });

  var collapseFiles = document.getElementById('btn-collapse-files');
  collapseFiles.addEventListener('click', function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id, {action: "collapse-files"}, function(response) {
        //
      });
    });
  });

  var filesFilter = document.getElementById('files-filter');
  filesFilter.addEventListener('keyup', function (event) {
    let filterValue = filesFilter.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "filter-files", filterValue: filterValue}, function(response) {
        //
      });
    });
  });

});
