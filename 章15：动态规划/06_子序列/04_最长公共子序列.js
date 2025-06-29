/**
    给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
    一个字符串的 子序列 是指这样一个新的字符串：
    它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
    例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
    两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 */

function longestCommonSubsequence(text1, text2) {
    /**
     * 1.dp[i][j]含义：0 - i-1的text1字符串和 0 - j-1的text2字符串的公共子序列的最大长度
     * 2.
     * if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
     * else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
     * 3.初始化：0
     */
    const dp = new Array(text1.length + 1);
    for(let i = 0; i < text1.length + 1; i++) {
        const a = new Array(text2.length + 1).fill(0);
        dp[i] = a;
    }
    for(let i = 1; i <= text1.length; i++) {
        for(let j = 1; j <= text2.length; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // 把前面有限的非零数值传递到后面
            }
        }
    }
    let max = -Infinity;
    dp.forEach(arr => {
        const rst = Math.max(...arr);
        if (rst > max) max = rst;
    });
    return max;
}
function run() {
    console.log(longestCommonSubsequence("abcde", "ace"));
    console.log(longestCommonSubsequence("abc", "abc"));
    console.log(longestCommonSubsequence("abc", "def"));
}
run();