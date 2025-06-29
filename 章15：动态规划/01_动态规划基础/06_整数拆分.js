/**
 * num: 正整数
 * 求：将num拆分成若干整数，求这些拆分结果的最大积
 */
function splitNumber(num) {
    const dp = [];
    /**
     * 1.dp[i]：整数i的拆分结果的最大积
     * 2.递推公式: dp[i] = Math.max(j * (i - j), dp[j] * dp[i - j])
     * 3.初始化 dp[0] = 0 dp[1] = 0 dp[2] = 1
     */
    dp[0] = 0;
    dp[1] = 0;
    dp[2] = 1;
    for(let i = 3; i <= num; i++) {
        for(let j = 1; j < i; j++) {
            dp[i] = Math.max(j * (i - j), dp[j] * dp[i - j], dp[i] || 0);
        }
    }
    return dp[num];
}
function run() {
    console.log(splitNumber(2));
    console.log(splitNumber(10));
}
run();
