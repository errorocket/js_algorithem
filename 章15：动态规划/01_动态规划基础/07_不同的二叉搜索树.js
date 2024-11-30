/**
 * n: 正整数
 * 求: 以 1 ～ n 的值作为搜索二叉树的节点时，二叉搜索树的最大种类
 */
function countBST(n) {
    const dp = [];
    /**
     * 1.dp[i]含义：给定值为i时，搜索二叉树的最大种类为dp[i]
     * 2.递推公式：dp[i] += dp[j - 1] * dp[i - j] (j >= 1 && j <= n, j代表根节点的所有取值情况)
     * 3.初始化
     * dp[0] = 1
     * dp[1] = dp[0] * dp[0] = 1 (此时j >= 1 && j <= 1)
     * 4.遍历顺序
     */
    dp[0] = 1;
    let sum = 0;
    for(let i = 1; i <= n; i++) {
        sum = 0;
        for(let j = 1; j <= i; j++) { // 当前i值下，根节点的所有情况
            sum += dp[j - 1] * dp[i - j];
        }
        dp[i] = sum; // 当前i值对应的所有搜索二叉树
    }
    return dp[n];
}
function run() {
    console.log(countBST(3));
    console.log(countBST(1));
    console.log(countBST(5));
}
run();