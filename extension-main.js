document.addEventListener('DOMContentLoaded', function () {

  let currentTabId;
  let filesFilter = document.getElementById('files-filter');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentTabId = tabs[0].id;

    chrome.tabs.sendMessage(currentTabId, {action: "resolve-files-filter-value"}, function(response) {
      if (response.filesFilterValue !== undefined) {
        filesFilter.value = response.filesFilterValue;
      }
      filesFilter.focus();
    });
  });

  let listPrFiles = document.getElementById('btn-list-pr-files');
  listPrFiles.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "list-pr-files"}, function(response) {});
  });

  let toggleCollapse = document.getElementById('btn-toggle-files-collapse');
  toggleCollapse.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "toggle-collapse"}, function(response) {});
  });

  let toggleWideMode = document.getElementById('btn-toggle-wide-mode');
  toggleWideMode.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "toggle-wide-mode"}, function(response) {});
  });

  let expandFiles = document.getElementById('btn-expand-files');
  expandFiles.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "expand-files"}, function(response) {});
  });

  let showOutdatedComments = document.getElementById('btn-show-all-outdated-comments');
  showOutdatedComments.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "show-outdated-comments"}, function(response) {});
  });

  let collapseFiles = document.getElementById('btn-collapse-files');
  collapseFiles.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "collapse-files"}, function(response) {});
  });

  let cyclePreviousPRComment = document.getElementById('btn-cycle-previous-pr-comment');
  cyclePreviousPRComment.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "cycle-previous-pr-comment"}, function(response) {});
  });

  let cycleNextPRComment = document.getElementById('btn-cycle-next-pr-comment');
  cycleNextPRComment.addEventListener('click', function (event) {
    chrome.tabs.sendMessage(currentTabId, {action: "cycle-next-pr-comment"}, function(response) {});
  });

  filesFilter.addEventListener('keyup', function (event) {
    let filterValue = filesFilter.value;
    chrome.tabs.sendMessage(currentTabId, {action: "filter-files", filterValue: filterValue}, function(response) {});
  });

});
