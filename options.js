function saveOptions() {
  let githubUserId = document.querySelector("#github-user-id").value;
  let skinColor = document.querySelector("#skin-color").value;
  chrome.storage.sync.set({
    githubUserId: githubUserId,
    skinColor: skinColor
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('save').addEventListener('click', saveOptions);
});
