async function getCommitCount(user_name, repo_name, since_time) {
    const url = `https://api.github.com/repos/${user_name}/${repo_name}/commits?since=${since_time}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const commitCount = data.length
        return commitCount;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// usage
// getCommitCount('Rintaro-Fukui', 'Application-Task', '2023-07-01T00:00:00+0900')
//     .then(commitCount => {
//         if (commitCount) {
//             console.log('commit count:', commitCount);
//         } else {
//             console.log('commit not available.');
//         }
//     });