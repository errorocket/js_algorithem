/**
 * cost[i]: 体力消耗数组，表示离开第i阶台阶需要消耗的体力，离开第i台阶后可以选择上1级或2级台阶
 * 初始站位：初始可以选择站在0或1位置开始向上爬
 * 求：爬到楼顶需要的最小体力消耗
 */
function minCostClimbStairs(cost) {
    const n = cost.length;
    const dp = [] // dp[i]到达第i阶台阶需要消耗的最少体力值
    /**
     * 1. 临近体力值: 到达临近位置的最小体力消耗 + 离开临近位置到达目标位置的体力消耗
     * 2. 取目标位置的最小临近体力值
     * dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
     * dp[4] dp[3] dp[2] dp[1] dp[0] // 由近及远，已知推导未知
     * dp[1] = 0
     * dp[0] = 0
     */
    dp[0] = 0; // 2个可选的初始位置均不消耗体力
    dp[1] = 0;
    for(let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }
    return dp[n];
}
function run() {
    console.log(minCostClimbStairs([10, 15, 20]));
    console.log(minCostClimbStairs([1,100,1,1,1,100,1,1,100,1]));
}
run();