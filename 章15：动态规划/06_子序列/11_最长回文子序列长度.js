/**
    给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
    子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 */
function longestPalindromeSubseq(s) {
    /**
     * 1.dp[i][j]含义：以i,j为起始位置的字符串[i, j]所包含的回文子序列的长度为dp[i][j]
     * 2.
     * --------i-(i+1)----(j-1)-j---------
     * if (s[i] === s[j]) {
     *     dp[i][j] = dp[i+1][j-1] + 2
     * } else {
     *     dp[i][j] = max(dp[i][j - 1], dp[i+1][j])
     * }
     * 3.初始化：
     * dp[i][i] = 1; // 单个字符
     * 其余初始化为0
     * 4.遍历顺序:左下->右上
     * ------------------------------------
     * --(i, j-1)---------(i,j)------------
     * --(i+1, j-1)-----(i+1, j)-----------
     * ------------------------------------
     */
    const dp = new Array(s.length);
    for(let i = 0; i < s.length; i++) {
        const a = new Array(s.length).fill(0);
        a[i] = 1; // i === j 单个字符情况
        dp[i] = a;
    }
    // console.log(JSON.stringify(dp));
    for(let i = s.length - 1; i >= 0; i--) {
        for(let j = i + 1; j < s.length; j++) { // i === i 已被初始化
            if(s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
            }
        }
    }
    return dp[0][s.length - 1];
}
function run() {
    console.log(longestPalindromeSubseq("bbbab"));
    console.log(longestPalindromeSubseq("cbbd"));
}
run();