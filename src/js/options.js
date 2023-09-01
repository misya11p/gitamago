function saveOptions() {
  let githubUserId = document.querySelector("#github-user-id").value;
  let skinColor = document.querySelector("#skin-color").value;
  chrome.storage.sync.set({
    githubUserId: githubUserId,
    skinColor: skinColor
  });
}

async function setGithubUserId() {
  chrome.storage.sync.get({
    githubUserId: ""
  }, function(items) {
    document.querySelector("#github-user-id").value = items.githubUserId;
  });
}

async function setColor() {
  chrome.storage.sync.get({
    skinColor: "yellow"
  }, function(items) {
    document.querySelector("#skin-color").value = items.skinColor;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('save').addEventListener('click', saveOptions);
});

setGithubUserId();
setColor();
