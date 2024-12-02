/**
    给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
    你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。
    设计一个算法来计算你所能获取的最大利润。
    返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

function maxProfit(prices) {
    /**
     * 1.
     * dp[i][0] 第i天持有股票时，手上的最大现金
     * dp[i][1] 第i天不持有股票时，手上的最大现金
     * 2.递推公式
     * dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
     * dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[1]);
     * 3.初始化
     * dp[0][0] = -prices[0];
     * dp[0][1] = 0;
     */
    const dp = new Array(prices.length);
    for(let i = 0; i < prices.length; i++) {
        const a = [0, 0];
        dp[i] = a;
    }
    dp[0][0] = -prices[0];
    dp[0][1] = 0;
    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
    }
    return Math.max(dp[prices.length - 1][0], dp[prices.length - 1][1]);
}
function run() {
    console.log(maxProfit([7,1,5,3,6,4]));
    console.log(maxProfit([7,6,4,3,1]));
}
run();