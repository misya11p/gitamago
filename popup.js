function loadOptions() {
  chrome.storage.sync.get({
    githubUserId: ""
  }, function(items) {
    document.getElementById("github-user-id").innerHTML = items.githubUserId;
  });
}

loadOptions();
