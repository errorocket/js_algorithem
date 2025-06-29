/**
 * arr:[[0(物品编号), 1(物品重量), 15(物品价值)], [1, 3, 20], [2, 4, 30]]
 * w: 总重量
 * 每个物品仅一件
 * 求：当前背包重量下，能选择的最大价值
 */
function bag_01(arr, w) {
    const n = arr.length;
    const dp = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(w + 1).fill(0);
        dp[i] = a;
    }
    /**
     * 1.dp[i][j]含义：编号为0-i的物品，放入容量为j的背包中时，背包的价值
     * 2.递推公式:
     * a)i物品不放入背包: dp[i][j] = dp[i - 1][j]
     * b)i物品放入背包: dp[i][j] = dp[i - 1][j - arr[i][1]] + arr[i][2];
     * dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - arr[i][1]] + arr[i][2]);
     * 3.初始化：
     *     背包   0   1    2    3   4   j
     *   i 物品0  0   15   15   15  15
     *     物品1  0
     *     物品2  0
     * 4.遍历顺序
     * 5.打印dp数组
     */
    for(let j = 0; j <= w; j++) { // 初始化 row=0
        if (arr[0][1] <= j) { // 物品0的重量小于背包容量，保存物品价值
            dp[0][j] = arr[0][2];
        }
    }
    for(let i = 0; i < n; i++) {
        dp[i][0] = 0; // 背包容量=0的，价值均为0
    }
    for(let i = 1; i < n; i++) { // 物品
        for(let j = 1; j < w + 1; j++) { // 背包
            const a = dp[i - 1][j];
            const b = dp[i - 1][j - arr[i][1]] + arr[i][2] || 0;
            dp[i][j] = Math.max(a, b);
        }
    }
    let max = -Infinity;
    dp.forEach(arr => {
        const rst = Math.max(...arr);
        rst > max && (max = rst);
    });
    return max;
}
function run() {
    console.log(bag_01([
        [0, 1, 15],
        [1, 3, 20],
        [2, 4, 30]
    ], 4));
    console.log(bag_01([
        [0, 1, 15],
        [1, 1, 20],
        [2, 1, 30]
    ], 4));
}
run();