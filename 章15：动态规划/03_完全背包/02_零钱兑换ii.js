/**
    给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
    请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
    假设每一种面额的硬币有无限个。
    题目数据保证结果符合 32 位带符号整数。
    核心：求装满背包有几种方式 + 元素可以重复使用(完全背包)
 */

function countMethods(coins, amount) {
    if (amount % Math.min(...coins) !== 0) return 0;
    /**
     * 1.dp[j]含义：装满容量为j的背包的方式有dp[j]种
     * 2.递推公式
     * dp[j] += dp[j - nums[i]] (i >= 0 && i < nums.length)
     * 3.初始化
     * dp[0] = 1 (coins: [0] amount: 0)
     */
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for(let i = 0; i < coins.length; i++) { // 物品
        for(let j = 0; j <= amount; j++) { // 背包
            dp[j] += dp[j - coins[i]] || 0;
        }
    }
    // console.log(dp);
    return dp[amount];
}
function run() {
    console.log(countMethods([1, 2, 5], 5));
    console.log(countMethods([2], 3));
}
run();