chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    console.log(request, sender);

    if (request.action == 'list-pr-files') {
      console.log('list pr files');

      var fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]');
      var filePaths = [];
      fileHeaders.forEach(function (element) {
        filePaths.push(element.title);
      });
      filePaths = filePaths.sort();
      var filesDiv = document.createElement('div');
      var filesDivContent = document.createElement('div');
      filesDivContent.innerHTML = filePaths.join(" <br /> ");
      filesDiv.appendChild(filesDivContent);
      document.body.appendChild(filesDivContent);
    }
  }
);

//"matches": ["*://github.com/*/pull/*/files*"],
// var fileHeaders = document.querySelectorAll('div.file-header button.js-details-target'); console.log(fileHeaders); fileHeaders.forEach(function (element) {element.click()});
// var fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]'); var filePaths = []; fileHeaders.forEach(function (element) {filePaths.push(element.title)}); console.log(filePaths.sort());
// var fileHeaders = document.querySelectorAll('div.file-header div.file-info a[title]'); var filePaths = []; fileHeaders.forEach(function (element) {filePaths.push(element.title)}); filePaths = filePaths.sort(); var filesDiv = document.createElement('div'); var filesDivContent = document.createElement('div'); filesDivContent.innerHTML = filePaths.join(" <br /> "); filesDiv.appendChild(filesDivContent); document.body.appendChild(filesDiv);
