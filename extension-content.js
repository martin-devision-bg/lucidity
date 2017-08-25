document.body.addEventListener('keyup', (event) => {
  if (event.altKey === true && event.keyCode === 76) {
    actionListPrFiles();
  }
});

let actionListPrFiles = () => {
  let alreadyExists = document.getElementById('lucidity-list-pr-files-container');
  if (alreadyExists !== null) {
    return;
  }

  let fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]');
  let filePaths = [];
  fileHeaders.forEach(function (element) {
    filePaths.push(element.title);
  });

  filePaths = filePaths.sort();
  let filesDiv = document.createElement('div');
  filesDiv.setAttribute('id', 'lucidity-list-pr-files-container');
  let filesDivContent = document.createElement('div');

  let escKeyPressHandler = (event) => {
    if (event.keyCode === 27) {
      removeFilesListDivContainer();
    }
  }
  document.body.addEventListener('keyup', escKeyPressHandler);

  let removeFilesListDivContainer = () => {
    document.body.removeEventListener('keyup', escKeyPressHandler);
    document.getElementById('lucidity-list-pr-files-container').remove();
  }

  let closeButton = document.createElement('div');
  closeButton.innerHTML = 'Close files list';
  closeButton.setAttribute('class', 'lucidity-list-pr-files-close-btn');
  closeButton.addEventListener('click', function (event) {
    removeFilesListDivContainer();
  });

  filePaths.forEach(function (element, index, array) {
    array[index] = element.replace(/\//g, '&nbsp;/&nbsp;')
  });

  filesDivContent.innerHTML = filePaths.join(" <br /> ");
  filesDiv.appendChild(closeButton);
  filesDiv.appendChild(filesDivContent);
  filesDiv.setAttribute('class', 'lucidity-list-pr-files');
  document.body.appendChild(filesDiv);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender);

    if (request.action === 'list-pr-files') {
      actionListPrFiles();
    }


    if (request.action === 'toggle-collapse') {
      var fileHeaders = document.querySelectorAll('div.file-header button.js-details-target');
      fileHeaders.forEach(function (element) {
        element.click()
      });
    }


    if (request.action === 'collapse-files') {
      var fileHeaders = document.querySelectorAll('div.file:not(.open) div.file-header button.js-details-target');
      fileHeaders.forEach(function (element) {
        element.click()
      });
    }


    if (request.action === 'expand-files') {
      var fileHeaders = document.querySelectorAll('div.file.open div.file-header button.js-details-target');
      fileHeaders.forEach(function (element) {
        element.click()
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
