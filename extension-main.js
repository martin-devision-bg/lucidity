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
});
