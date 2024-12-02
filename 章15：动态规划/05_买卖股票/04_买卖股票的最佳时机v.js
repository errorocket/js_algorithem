/**
    给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
    设计一个算法来计算你所能获取的最大利润。
    你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。
    注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 */

function maxProfit(prices, k) {
    /**
     * 递推公式
     * dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
     * dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[1])
     * 核心：二维数组的规模 + 初始化 + 用for循环表示每一天的各种出售情况 + price的正负值
     *
     */
    const dp = new Array(prices.length);
    for(let i = 0; i < prices.length; i++) {
        const a = new Array(2 * k + 1);
        dp[i] = a;
    }
    for(let j = 0; j <= 2 * k; j++) { // 初始化
        // 0 1 2 3 4 5 6  index
        // 0 - 0 - 0 - 0  value
        const price = j % 2 === 0 ? 0 : -prices[0];
        dp[0][j] = price;
    }
    for(let i = 1; i < prices.length; i++) {
        for(let j = 0; j <= 2 * k; j++) {
            if (j === 0) {
                dp[i][j] = 0;
            } else {
                const price = j % 2 === 0 ? prices[i] : -prices[i];
                //                  前一天 当前状态   前一天  前一种状态 买入股票/抛出股票
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + price);
            }
        }
    }
    return Math.max(...dp[prices.length - 1]);
}
function run() {
    console.log(maxProfit([2,4,1], 2));
    console.log(maxProfit([3,2,6,5,0,3], 2));
}
run();