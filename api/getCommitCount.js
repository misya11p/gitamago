async function getPublicRepo(user_name) {
    const url = `https://api.github.com/users/${user_name}/repos`;
    console.log(url);
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

async function getCommitCount(user_name, repo_name, since_time) {
    const url = `https://api.github.com/repos/${user_name}/${repo_name}/commits?since=${since_time}`;
    console.log(url);
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

async function getTotalCommitCount(user_name, since_time) {
    try {
        const publicRepo = await getPublicRepo(user_name);
        // プロミスの配列を作成
        const promises = publicRepo.map(repo_name => getCommitCount(user_name, repo_name, since_time));
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
// const since_time = '2023-07-29T08:24:01+0900';
// getTotalCommitCount(user_name, since_time)
//     .then(totalCommitCount => console.log('Total Commit Count:', totalCommitCount))
//     .catch(error => console.error('Error:', error));