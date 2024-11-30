/**
 * n: 台阶的阶数(正整数)，一次只能上1阶或2阶
 * 求: 从地面上到第n阶一共有几种方法
 * 核心:
 * 确定临近的状态，确定到达临近状态的转换有几种方式，因为从临近状态到目标状态的方式是唯一的,
 * 所以到达临近状态的方式总和即为到达目标状态的方式总和
 */
function climbStairs(n) {
    const dp = [];
    dp[1] = 1;
    dp[2] = 2;
    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
function run() {
    console.log(climbStairs(4));
}
run();
