function saveOptions() {
  let githubUserId = document.querySelector("#github-user-id").value;
  chrome.storage.sync.set({
    githubUserId: githubUserId
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('save').addEventListener('click', saveOptions);
});
