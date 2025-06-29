/**
 * m * n: 数组规模 m *n
 * 移动规则：每次只能向右或向下移动1格
 * 求：从起始位置(0 ,0)到右下角(n - 1, m - 1)有多少种不同的路径
 */
function countPath(m, n) {
    const dp = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(m);
        dp[i] = a;
    }
    /**
     * dp[i][j] 从(0, 0) -> (i, j)一共有多少种不同的路径
     * 递推公式：dp[i][j] = dp[i - 1][j] + dp[i][j - 1]; (临近位置：目标位置的左方 + 目标位置的上方)
     * 初始化：row=0的行，以及col=0的列 均初始化为1
     */
    for(let i = 0; i < m; i++) { // 初始化row=0的行
        dp[0][i] = 1;
    }
    for(let i = 0; i < n; i++) { // 初始化col=0的列
        dp[i][0] = 1;
    }
    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[n - 1][m - 1];
}
function run() {
    console.log(countPath(3, 7));
    console.log(countPath(3, 2));
}
run();
