let filesFilterValue = '';
let filesFilterInputGlobal;

document.body.addEventListener('keydown', (event) => {
  if (event.altKey === true && event.keyCode === 84) {
    actionListPrFiles();
    filesFilterInputGlobal.focus();
  }
});

let actionListPrFiles = () => {
  let alreadyExists = document.getElementById('lucidity-list-pr-files-container');
  if (alreadyExists !== null) {
    return;
  }

  let filesDiv = document.createElement('div');
  filesDiv.setAttribute('id', 'lucidity-list-pr-files-container');

  let filesFilter = document.createElement('div');
  addClass(filesFilter, 'file-filter-container');
  let filesFilterInput = document.createElement('input');
  filesFilterInput.value = filesFilterValue;
  filesFilterInput.setAttribute('type', 'text');
  filesFilterInput.setAttribute('placeholder', 'Filter by file path ( ALT+T to focus | ALT+C clear filter )');
  filesFilterInput.addEventListener('keyup', (event) => {
    // ALT+C clears the filter
    if (event.keyCode === 67 && event.altKey === true) {
      filesFilterInput.value = '';
    }

    if (event.keyCode !== 18) {
      handleFilterFiles(filesFilterInput.value);
      buildFilesList();
    }
  });
  filesFilter.appendChild(filesFilterInput);

  let closeButton = document.createElement('div');
  closeButton.innerHTML = 'Close files list <small>( press ESC )</small>';
  closeButton.setAttribute('class', 'lucidity-list-pr-files-close-btn');
  closeButton.addEventListener('click', function (event) {
    removeFilesListDivContainer();
  });

  let buildFilesList = () => {
      let oldFilesDivContent = document.getElementById('filesDivContent');
      if (oldFilesDivContent !== null) {
        oldFilesDivContent.remove();
      }

      let filesDivContent = document.createElement('div');
      filesDivContent.setAttribute('id', 'filesDivContent');

      let fileHeaders = document.querySelectorAll('div.file:not(.hidden) div.file-header div.file-info a[title]');
      let filePaths = [];
      fileHeaders.forEach(function (element) {
        filePaths.push({
          title: element.title,
          diffStats: element.previousElementSibling.cloneNode(true),
          href: element.href
        });
      });

      filePaths = filePaths.sort((a, b) => {
        if (a.title < b.title) {
          return -1
        }

        if (a.title > b.title) {
          return 1;
        }

        return 0;
      });

      let lastSlashPosition = undefined;
      let previousFileDiv;

      filePaths.forEach((filePath) => {
        let fileDiv = document.createElement('div');

        // visually separate files in different folders
        let slashPosition = filePath.title.lastIndexOf('/');
        if (lastSlashPosition !== slashPosition && lastSlashPosition !== undefined) {
          addClass(fileDiv, 'file-div-folders-visual-separator');
          addClass(previousFileDiv, 'file-div-folders-visual-separator-previous');
        }
        lastSlashPosition = slashPosition;
        previousFileDiv = fileDiv;

        // build element content
        let fileDivFileLink = document.createElement('a');
        fileDivFileLink.href = filePath.href;
        addClass(filePath.diffStats, 'file-list-diff-stats');
        fileDiv.appendChild(filePath.diffStats);
        // filePath.title = 'some-folder/second-level/file-with-code.js';
        fileDivFileLink.innerHTML = filePath.title.replace(/\//g, '<span>/</span>');
        addClass(fileDivFileLink, 'file-list-file-links');
        fileDiv.appendChild(fileDivFileLink);
        filesDivContent.appendChild(fileDiv);
      });

      document.body.addEventListener('keydown', escKeyPressHandler);

      addClass(filesDivContent, 'filesContainer');

      filesDiv.appendChild(closeButton);
      filesDiv.appendChild(filesFilter);
      filesDiv.appendChild(filesDivContent);
      filesDiv.setAttribute('class', 'lucidity-list-pr-files');
      document.body.appendChild(filesDiv);
      filesFilterInputGlobal = filesFilterInput;
      filesFilterInput.focus();
  };

  buildFilesList();
}

let escKeyPressHandler = (event) => {
  if (event.keyCode === 27) {
    removeFilesListDivContainer();
  }
}

let removeFilesListDivContainer = () => {
  document.body.removeEventListener('keyup', escKeyPressHandler);
  let listPrFilesContainer = document.getElementById('lucidity-list-pr-files-container');
  if (listPrFilesContainer !== null) {
    listPrFilesContainer.remove();
  }
}

let handleFilterFiles = (filterValue) => {
  let allFiles = document.querySelectorAll('div.file');
  allFiles.forEach(function (file) {
    removeClass(file, 'hidden');
  });

  filesFilterValue = filterValue;
  if (filterValue.length > 0) {
    let files = document.querySelectorAll('div.file div.file-info a:not([title*="' + filterValue + '"])');
    files.forEach(function (file) {
      addClass(file.parentElement.parentElement.parentElement, 'hidden');
    });

    let oldFilesDivContent = document.getElementById('filesDivContent');
    if (oldFilesDivContent !== null) {
      // buildFilesList();
    }
  }
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.action === 'list-pr-files') {
      actionListPrFiles();
    }

    if (request.action === 'resolve-files-filter-value') {
      sendResponse({
        filesFilterValue: filesFilterValue
      });
    }

    if (request.action === 'filter-files') {
      if (filesFilterInputGlobal !== undefined && filesFilterInputGlobal !== null) {
        filesFilterInputGlobal.value = request.filterValue;
      }

      handleFilterFiles(request.filterValue);
    }

    if (request.action === 'toggle-collapse') {
      var fileHeaders = document.querySelectorAll('div.file-header button.js-details-target');
      fileHeaders.forEach(function (element) {
        element.click();
      });
    }

    if (request.action === 'collapse-files') {
      var fileHeaders = document.querySelectorAll('div.file:not(.open) div.file-header button.js-details-target');
      fileHeaders.forEach(function (element) {
        element.click();
      });
    }

    if (request.action === 'expand-files') {
      var fileHeaders = document.querySelectorAll('div.file.open div.file-header button.js-details-target');
      fileHeaders.forEach(function (element) {
        element.click();
      });
    }

    if (request.action === 'toggle-wide-mode') {
      let filesContainer = document.querySelectorAll('div.repository-content')[0].parentElement;
      let originalClass = filesContainer.getAttribute('class');
      let wideModeClassPosition = originalClass.indexOf('wide-mode');

      if (wideModeClassPosition > -1) {
        originalClass = originalClass.replace(/wide-mode/g, '');
        filesContainer.setAttribute('class', originalClass);
      } else {
        originalClass += ' wide-mode';
        filesContainer.setAttribute('class', originalClass);
      }
    }


  }
);

function toggleClass (element, className) {
  let originalClass = element.getAttribute('class');
  let wideModeClassPosition = originalClass.indexOf(className);

  if (wideModeClassPosition > -1) {
    originalClass = originalClass.replace(new RegExp(className, 'g'), '');
    element.setAttribute('class', originalClass);
  } else {
    originalClass += ' ' + className;
    element.setAttribute('class', originalClass);
  }
}

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
