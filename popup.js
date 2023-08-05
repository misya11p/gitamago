const API_URL = "https://gsbmtic6zb.execute-api.ap-northeast-1.amazonaws.com/app";

async function loadGithubUserId() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      githubUserId: ""
    }, function(items) {
      resolve(items.githubUserId);
    });
  });
}

async function loadSkinColor() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      skinColor: "yellow"
    }, function(items) {
      resolve(items.skinColor);
    });
  });
}

async function getCommitCount(githubUserId) {
  try {
    if (githubUserId === "") {
      return null;
    }
    let url = `${API_URL}?username=${githubUserId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    let commitCount = data.commitCount;
    return commitCount;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
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
  let githubUserId = await loadGithubUserId();
  document.getElementById("github-user-id").innerHTML = githubUserId;

  try {
    let commitCount = await getCommitCount(githubUserId);

    var field = document.getElementById("animation");
    let skinColor = await loadSkinColor();
    const SKIN_SIZE = 50;
    const FPS = 6;
    let condition = getCondition(commitCount);
    let user = new User(skinColor, condition, field, SKIN_SIZE, FPS);
    setInterval(() => {
      user.update();
    }, 1000 / FPS);
  
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

main();
