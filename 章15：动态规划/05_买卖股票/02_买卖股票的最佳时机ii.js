/**
    给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格
    在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票
    你也可以先购买，然后在 同一天 出售。
    返回 你能获得的 最大 利润
 */

function maxProfit(prices) {
    /**
     * 1.
     * dp[i][0] 第i天持有股票时，手上的最大现金
     * dp[i][1] 第i天不持有股票时，手上的最大现金
     * 2.递推公式
     * dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
     * dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[1]);
     * 3.初始化
     * dp[0][0] = -prices[0];
     * dp[0][1] = 0;
     */
    const dp = new Array(prices.length);
    for (let i = 0; i < prices.length; i++) {
        const a = [0, 0];
        dp[i] = a;
    }
    dp[0][0] = -prices[0];
    dp[0][1] = 0;
    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
    }
    return Math.max(dp[prices.length - 1][0], dp[prices.length - 1][1]);
}
function run() {
    console.log(maxProfit([7, 1, 5, 3, 6, 4]));
    console.log(maxProfit([1,2,3,4,5]));
    console.log(maxProfit([7, 6, 4, 3, 1]));
}
run();