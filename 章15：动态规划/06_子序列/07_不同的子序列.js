/**
 * 给你两个字符串 s 和 t ，统计并返回在 s 的 子序列 中 t 出现的个数，结果需要对 109 + 7 取模。
 */
function numDistinct(s, t) {
    /**
     * 1.dp[i][j]含义：以i-1为结尾的字符串中包含的以j-1为结尾的字符串的个数
     * 2.
     * -------(i-2)----(i-1)------
     * -------(j-2)----(j-1)------
     * if (s[i - 1] === t[j - 1]) dp[i][j] = (dp[i - 1][j - 1] + 1) + dp[i - 1][j]
     * else dp[i][j] = dp[i - 1][j]
     * 3.初始化
     * dp[i][0] = 1;
     * dp[0][j] = 0;
     * dp[0][0] = 1;
     */
    const dp = new Array(s.length + 1);
    for(let i = 0; i < s.length + 1; i++) {
        const a = new Array(t.length + 1).fill(0);
        a[0] = 1;
        dp[i] = a;
    }
    console.log(dp);
    for(let i = 1; i <= s.length; i++) {
        for(let j = 1; j <= t.length; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = (dp[i - 1][j - 1]) + dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    console.log(JSON.stringify(dp));
    return dp[s.length][t.length];
}
function run() {
    console.log(numDistinct("rabbbit", "rabbit"));
    console.log(numDistinct("babgbag", "bag"));
}
run();