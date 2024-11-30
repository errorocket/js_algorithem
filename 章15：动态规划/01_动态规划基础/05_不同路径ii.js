/**
 * m * n数组：给定m * n规模的数组，数组中的空格和障碍物分别用0和1表示
 * 求：从起始位置(0, 0)到终止位置(n - 1, m - 1)的所有不同路径
 */
function countPath2(grid) {
    const col = grid.length;
    const row = grid[0].length;
    if (grid[0][0] || grid[col - 1][row - 1]) { // 起点或终点被障碍物阻挡
        return 0;
    }
    const dp = new Array(col);
    for(let j = 0; j < col; j++) {
        let a = new Array(row).fill(0);
        dp[j] = a;
    }
    /**
     * 1. dp[i][j]的含义
     * 2.递推公式 dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
     * 3.初始化
     * 4.遍历顺序
     * 5.查看dp数组
     */
    for(let i = 0; i < row && !grid[0][i]; i++) { // 初始化row=0的行
        dp[0][i] = 1; // 有障碍物后面均不初始化
    }
    for(let j = 0; j < col && !grid[j][0]; j++) { // 初始化col=0的列
        dp[j][0] = 1; // 有障碍物下面均不初始化
    }
    for(let i = 1; i < col; i++) {
        for(let j = 1; j < row; j++) {
            if (!grid[i][j]) { // 对空格处应用递推公式
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    return dp[col - 1][row - 1];
}
function run() {
    console.log(countPath2([[0, 0, 0], [0, 1, 0], [0, 0, 0]]));
    console.log(countPath2([[0, 1], [0, 0]]));
}
run();
