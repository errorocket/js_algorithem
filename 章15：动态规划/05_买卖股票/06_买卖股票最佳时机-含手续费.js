/**
    给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
    你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
    返回获得利润的最大值。
    注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
 */
function maxProfit(prices, fee) {
    /**
     * 1.dp[i][0] 到第i天 持有股票时 手上的最大金额
     * dp[i][1] 到第i天 处于卖出股票状态时 手上的最大金额
     * dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] - prices[i]) // 持有股票时不花手续费
     * dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] + prices - fee); // 抛售股票时花手续费
     * 2.初始化
     * dp[0][0] = - prices[0]
     * dp[0][1] = 0 or -fee
     */
    const dp = new Array(prices.length).fill(0);
    for(let i = 0; i < prices.length; i++) {
        const a = [0, 0];
        dp[i] = a;
    }
    dp[0][0] = -prices[0];
    dp[0][1] = -fee;
    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee);
    }
    return Math.max(...dp[prices.length - 1]);
}
function run() {
    console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));
    console.log(maxProfit([1,3,7,5,10,3], 3));
}
run();