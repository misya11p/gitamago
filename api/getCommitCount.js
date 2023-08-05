async function getPublicRepo(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // リポジトリの名前を取得して配列に格納
        const data = await response.json();
        var publicRepo = [];
        data.forEach(function(element){
            publicRepo.push(element['name'])
        });
        return publicRepo;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function getCommitCount(userName, repoName, sinceTime) {
    const url = `https://api.github.com/repos/${userName}/${repoName}/commits?since=${sinceTime}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // コミット数を取得
        const data = await response.json();
        const commitCount = data.length
        return commitCount;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function getTotalCommitCount(userName, sinceTime) {
    try {
        const publicRepo = await getPublicRepo(userName);
        // プロミスの配列を作成
        const promises = publicRepo.map(repoName => getCommitCount(userName, repoName, sinceTime));
        // すべてのプロミスを非同期に実行して結果を取得
        const commitCounts = await Promise.all(promises);
        // 各リポジトリのコミット数を合計する
        const totalCommitCount = commitCounts.reduce((total, count) => total + count, 0);
        return totalCommitCount;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


// usage
// const user_name = 'Rintaro-Fukui';
// const since_time = '2023-07-01T00:00:00+0900';
// getTotalCommitCount(user_name, since_time)
//     .then(totalCommitCount => console.log('Total Commit Count:', totalCommitCount))
//     .catch(error => console.error('Error:', error));