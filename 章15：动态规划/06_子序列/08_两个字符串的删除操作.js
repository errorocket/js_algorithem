/**
    给定两个单词 word1 和 word2 ，返回使得 word1 和  word2 相同所需的最小步数
    每步 可以删除任意一个字符串中的一个字符。
 */
function minDistance(word1, word2) {
    /**
     * 1.dp[i][j]含义：将以i-1为结尾的字符串word1和以j-1为结尾的字符串word2变为相同字符串
     * 所需要的最小操作数
     * 2.
     * -------(i-2)----(i-1)------
     * -------(j-2)----(i-2)------
     * if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
     * else {
     *     dp[i][j] = min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i-1][j-1] + 2)
     * }
     * 3.初始化
     * dp[0][j] = j
     * dp[i][0] = i
     */
    const dp = new Array(word1.length + 1);
    for(let i = 0; i < word1.length + 1; i++) { // 初始化
        const a = new Array(word2.length + 1);
        if (i === 0) {
            for(let j = 0; j < word2.length + 1; j++) {
                a[j] = j;
            }
        } else {
            a[0] = i;
        }
        dp[i] = a;
    }
    for(let i = 1; i <= word1.length; i++) {
        for(let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 2);
            }
        }
    }
    return dp[word1.length][word2.length];
}
function run() {
    console.log(minDistance("sea", "eat"));
    console.log(minDistance("leetcode", "etco"));
}
run();