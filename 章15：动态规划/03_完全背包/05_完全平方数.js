/**
    给你一个整数 n ，返回 和为 n 的完全平方数的最少数量
    完全平方数 是一个整数，其值等于另一个整数的平方
    换句话说，其值等于一个整数自乘的积
    例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是
 */
function numSquares(n) {
    /**
     * 1.dp[j]含义：装满容量为j的背包，需要的最少物品个数为dp[j]
     * 2.递推公式：
     * a)不放物品i: dp[j]
     * b)放物品i: dp[j - coins[i]] + 1
     * dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
     * 3.初始化
     * dp[0] = 1;
     * 其余初始化为：Infinity，使得初始化的值不影响最小值的选取
     * 4.遍历顺序：完全背包
     */
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for(let i = 1; i * i <= n; i++) { // 物品重量的范围
        for(j = i * i; j <= n; j++) { // 背包容量的范围
            dp[j] = Math.min(dp[j], (dp[j - i * i] || 0) + 1);
        }
    }
    return dp[n];
}
function run() {
    console.log(numSquares(12));
    console.log(numSquares(13));
}
run();