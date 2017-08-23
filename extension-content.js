chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender);

    let alreadyExists = document.getElementById('lucidity-list-pr-files-container');
    if (alreadyExists !== null) {
      return;
    }

    if (request.action === 'list-pr-files') {
      let fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]');
      let filePaths = [];
      fileHeaders.forEach(function (element) {
        filePaths.push(element.title);
      });

      filePaths = filePaths.sort();
      let filesDiv = document.createElement('div');
      filesDiv.setAttribute('id', 'lucidity-list-pr-files-container');
      let filesDivContent = document.createElement('div');

      let closeButton = document.createElement('div');
      closeButton.innerHTML = 'Close files list';
      closeButton.setAttribute('class', 'lucidity-list-pr-files-close-btn');
      closeButton.addEventListener('click', function (event) {
        // event.target.parentElement.remove();
        document.getElementById('lucidity-list-pr-files-container').remove();
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


    if (request.action === 'toggle-collapse') {
      var fileHeaders = document.querySelectorAll('div.file-header button.js-details-target');
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

//"matches": ["*://github.com/*/pull/*/files*"],
// var fileHeaders = document.querySelectorAll('div.file-header button.js-details-target'); console.log(fileHeaders); fileHeaders.forEach(function (element) {element.click()});
// var fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]'); var filePaths = []; fileHeaders.forEach(function (element) {filePaths.push(element.title)}); console.log(filePaths.sort());
// var fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]'); var filePaths = []; fileHeaders.forEach(function (element) {filePaths.push(element.title)}); filePaths = filePaths.sort(); var filesDiv = document.createElement('div'); var filesDivContent = document.createElement('div'); filesDivContent.innerHTML = filePaths.join(" <br /> "); filesDiv.appendChild(filesDivContent); document.body.appendChild(filesDiv);
