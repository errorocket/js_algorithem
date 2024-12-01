/**
    给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
    计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
    你可以认为每种硬币的数量是无限的。
 */

function coinsChange(coins, amount) {
    if (amount % Math.min(...coins) !== 0) return -1;
    /**
     * 1.dp[j]含义：装满容量为j的背包，需要的最少物品个数为dp[j]
     * 2.递推公式：
     * a)不放物品i: dp[j]
     * b)放物品i: dp[j - coins[i]] + 1
     * dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
     * 3.初始化
     * dp[0] = 0;
     * 其余初始化为：Infinity，使得初始化的值不影响最小值的选取
     * 4.遍历顺序：完全背包
     */
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for(let i = 0; i < coins.length; i++) {
        for(j = 0; j <= amount; j++) {
            dp[j] = Math.min(dp[j], (dp[j - coins[i]] || 0) + 1);
        }
    }
    return dp[amount];
}
function run() {
    console.log(coinsChange([1, 2, 5], 11));
    console.log(coinsChange([2], 3));
    console.log(coinsChange([1], 0));
}
run();