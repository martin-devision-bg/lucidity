document.addEventListener('DOMContentLoaded', function () {

  let currentTabId;
  let filesFilter = document.getElementById('files-filter');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentTab = tabs[0];
    currentTabId = tabs[0].id;

    let menuItems = document.querySelectorAll('#menu-items li a');

    menuItems.forEach((item) => {
      if (
        hasClass(item, 'menu-item-files')
        && isFilesTab(currentTab.url) === false
      ) {
        addClass(item, 'menu-item-disabled');
      }

      if (
        hasClass(item, 'menu-item-conversation')
        && isConversationTab(currentTab.url) === false
      ) {
        addClass(item, 'menu-item-disabled');
      }
    });

    chrome.tabs.sendMessage(currentTabId, {action: "resolve-files-filter-value"}, function(response) {
      if (response.filesFilterValue !== undefined) {
        filesFilter.value = response.filesFilterValue;
      }
      filesFilter.focus();
    });
  });

  let isFilesTab = (url) => {
    return (url.indexOf('github.com') >= 0) && (url.indexOf('/files') >= 0);
  }

  let isCommitsTab = (url) => {
    return (url.indexOf('github.com') >= 0) && (url.indexOf('/commits') >= 0);
  }

  let isConversationTab = (url) => {
    return (url.indexOf('github.com') >= 0) && (url.indexOf('/pull') >= 0)
      && (url.indexOf('/commits') === -1) && (url.indexOf('/files') === -1);
  }

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

function addClass (element, className) {
  let originalClass = element.getAttribute('class');
  originalClass += ' ' + className;
  element.setAttribute('class', originalClass);
}

function removeClass (element, className) {
  let originalClass = element.getAttribute('class');
  let wideModeClassPosition = originalClass.indexOf(className);

  if (wideModeClassPosition > -1) {
    originalClass = originalClass.replace(new RegExp(className, 'g'), '');
    element.setAttribute('class', originalClass);
  }
}

function hasClass (element, className) {
  let originalClass = element.getAttribute('class');
  let wideModeClassPosition = originalClass.indexOf(className);

  return (wideModeClassPosition > -1);
}
