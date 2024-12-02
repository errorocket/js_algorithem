/**
    给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数
    你可以对一个单词进行如下三种操作：
    插入一个字符
    删除一个字符
    替换一个字符
 */
function minDistance(word1, word2) {
    /**
     * 1.dp[i][j]含义：
     * 将以i-1为结尾的word1和以j-1为结尾的word2变成相同字符串需要的最小操作数
     * 2.
     * if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i-1][j-1]
     * else {
     *     dp[i][j] = min(dp[i-1][j] + 1(删除操作), dp[i][j-1] + 1(删除操作), dp[i-1][j-1] + 1(替换操作))
     * }
     * 3.初始化
     * dp[i][0] = i;
     * dp[0][j] = j
     */
    const dp = new Array(word1.length + 1);
    for(let i = 0; i < word1.length + 1; i++) { // 初始化
        const a = new Array(word2.length + 1).fill(0);
        if (i === 0) {
            for(let j = 0; j < word2.length + 1; j++) {
                a[j] = j;
            }
        } else {
            a[0] = i;
        }
        dp[i] = a;
    }
    // console.log(JSON.stringify(dp));
    for(let i = 1; i <= word1.length; i++) {
        for(let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
            }
        }
    }
    return dp[word1.length][word2.length];
}
function run() {
    console.log(minDistance("horse", "ros"));
    console.log(minDistance("intention", "execution"));
}
run();