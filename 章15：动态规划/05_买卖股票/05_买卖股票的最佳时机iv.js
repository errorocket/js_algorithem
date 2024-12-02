/**
    给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​
    设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
    卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
    注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 */

function maxProfit(prices) {
    /**
     * -----买入---卖出-冷冻------
     * 1.
     * dp[i][0] 到第i天，持有股票时，手上的最大金额
     * dp[i][1] 到第i天，保持卖出股票状态时，手上的最大资金
     * dp[i][2] 第i天，卖出股票时，手上的最大资金
     * dp[i][3] 第i天，冷冻期时，手上的最大资金
     * 2.递推公式
     * dp[i][0] = max(
     * dp[i - 1][0] (延续之前持有股票的状态),
     * dp[i - 1][3] - prices[i] (买入新股票，且前一天是冷冻期),
     * dp[i - 1][1] - prices[i] (买入新股票，切当前时“保持股票出售的状态”)
     * )
     * dp[i][1] = max(dp[i - 1][1](保持之前一直是卖出股票的状态), dp[i - 1][3]) // 都是未卖出
     * dp[i][2] = dp[i - 1][0] + prices[i]; // 有卖出操作
     * dp[i][3] = dp[i - 1][2];
     * 3.初始化：
     * dp[0][0] = prices[0]
     * dp[0][1] = 0;
     * dp[0][0] = 0;
     * dp[0][0] = 0;
     */
    const dp = new Array(prices.length);
    for(let i = 0; i < prices.length; i++) {
        const a = [0, 0, 0, 0];
        dp[i] = a;
    }
    dp[0][0] = -prices[0];
    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][3] - prices[i], dp[i - 1][1] - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
        dp[i][2] = dp[i - 1][0] + prices[i];
        dp[i][3] = dp[i - 1][2];
    }
    return Math.max(...dp[prices.length - 1]);
}
function run() {
    console.log(maxProfit([1,2,3,0,2]));
    console.log(maxProfit([1]));
}
run();