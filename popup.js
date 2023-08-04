function loadOptions() {
  console.log("loadOptions");
  chrome.storage.sync.get({
    githubUserId: ""
  }, function(items) {
    console.log("items", items);
    document.getElementById("github-user-id").innerHTML = items.githubUserId;
  });
}

loadOptions();
