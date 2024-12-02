/**
    给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
    设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
    注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 */

function maxProfit(prices) {
    /**
     * 1.
     * dp[i][0] 到第i天，不进行买卖操作时，手上的最大金额
     * dp[i][1] 到第i天，第一次持有股票时，手上的最大金额
     * dp[i][2] 到第i天，第一次不持有股票时，手上的最大金额
     * dp[i][3] 到第i天，第二次买入股票时，手上的最大金额
     * dp[i][4] 到第i天，第二次不持有股票时，手上的最大金额
     * 2.递推公式
     * dp[i][0] = 0;
     * dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i])
     * dp[i][2] = max(dp[i - 1][2], dp[i - 1][1] + prices[i])
     * dp[i][3] = max(dp[i - 1][3], dp[i - 1][2] - prices[i])
     * dp[i][4] = max(dp[i - 1][4], dp[i - 1][3] + prices[i])
     * 3.初始化：
     * dp[0][0] = 0;
     * dp[0][1] = -prices[0];
     * dp[0][2] = 0
     * dp[0][3] = -prices[0];
     * dp[0][4] = 0;
     */
    const dp = new Array(prices.length);
    for(let i = 0; i < prices.length; i++) {
        const a = [0, 0, 0, 0, 0];
        dp[i] = a;
    }
    dp[0][0] = 0;
    dp[0][1] = -prices[0];
    dp[0][2] = 0;
    dp[0][3] = -prices[0];
    dp[0][4] = 0;
    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = 0;
        dp[i][0] = 0;
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
        dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
        dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
    }
    return Math.max(...dp[prices.length - 1]);
}
function run() {
    console.log(maxProfit([3,3,5,0,0,3,1,4]));
    console.log(maxProfit([1,2,3,4,5]));
    console.log(maxProfit([7,6,4,3,1]));
}
run();