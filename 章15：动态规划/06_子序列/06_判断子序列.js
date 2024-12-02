/**
    给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
    字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。
    (例如，"ace"是"abcde"的一个子序列，而"aec"不是)
 */
function isSubsequence(s, t) {
    /**
     * 1.dp[i][j] 以i-1为结尾的s的字符串和以j-1为结尾的t的字符串的公共长度的最大值
     * 2.
     * ----------(i-1)------
     * --(j-2)---(j-1)------
     * if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
     * else dp[i][j] = dp[i][j - 1] (将范围锁定为i-1和j-2的范围)
     * 3.初始化：均为0
     */
    const dp = new Array(s.length + 1);
    for(let i = 0; i < s.length + 1; i++) {
        const a = new Array(t.length + 1).fill(0);
        dp[i] = a;
    }
    for(let i = 1; i <= s.length; i++) {
        for(let j = 1; j <= t.length; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = dp[i][j - 1]; // t的字符退让
            }
        }
    }
    return dp[s.length][t.length] === s.length;
    // let max = -Infinity;
    // dp.forEach(arr => {
    //     const rst = Math.max(...arr);
    //     if (rst > max) max = rst;
    // });
    // return max === s.length;
}
function run() {
    console.log(isSubsequence("abc", "ahbgdc"));
    console.log(isSubsequence("axc", "ahbgdc"));
}
run();