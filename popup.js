async function loadOptions() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      githubUserId: ""
    }, function(items) {
      resolve(items.githubUserId);
    });
  });
}

function getCondition(totalCommitCount) {
  if (totalCommitCount < 5) {
    return 0;
  } else if (totalCommitCount < 20) {
    return 1;
  } else {
    return 2;
  }
}

async function main() {
  console.log("main");
  let githubUserId = await loadOptions();
  document.getElementById("github-user-id").innerHTML = githubUserId;
  console.log(githubUserId);

  let date = new Date();
  date.setDate(date.getDate() - 7);
  let sinceTime = date.toISOString().slice(0, 19) + '+0900';

  console.log(sinceTime);

  // let totalCommitCount = await getTotalCommitCount(githubUserId, sinceTime)
  //     .then(totalCommitCount => console.log('Total Commit Count:', totalCommitCount))
  //     .catch(error => console.error('Error:', error));
  let totalCommitCount = 50;

  var field = document.getElementById("animation");
  const SKIN_SIZE = 50;
  const FPS = 6;
  let condition = getCondition(totalCommitCount);
  let user = new User("yellow", condition, field, SKIN_SIZE, FPS);
  setInterval(() => {
    user.update();
  }, 1000 / FPS);

}

console.log("popup.js");
main();


