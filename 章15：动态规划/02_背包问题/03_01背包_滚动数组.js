/**
 * arr:[[0(物品编号), 1(物品重量), 15(物品价值)], [1, 3, 20], [2, 4, 30]]
 * w: 总重量
 * 每个物品仅一件
 * 求：当前背包重量下，能选择的最大价值
 */
function bag_01(arr, w) {
    const n = arr.length;
    const dp = new Array(w + 1).fill(0);
    /**
     * 1.dp[j]含义：当背包容量为j时，背包的最大价值为dp[j]
     * 2.递推公式:
     *
     * a)i物品不放入背包: dp[j]
     * b)i物品放入背包: dp[j] = dp[j - arr[i][1]] + arr[i][2];
     * dp[j] = Math.max(dp[j], dp[j - arr[i][1]] + arr[i][2]);
     *
     * 3.初始化：
     *
     * dp[0] = 0;
     * 其余都初始化为0，因为dp[j] = Math.max(dp[j], dp[j - arr[i][1]] + arr[i][2]);
     * 初始化值不影响dp[j]选取到较大值即可
     *
     * 4.遍历顺序
     * 倒叙：确保每个物品只被添加一次(不然会把余下的容量，自动映射到可以放对应容量的物品的价值上)
     * 先物品后容量：防止背包中都是一个物品的价值(背包中的价值可以形成有效的叠加)
     * 5.打印dp数组
     */
    for(let i = 0; i < n; i++) { // 物品
        for(let j = w; j >= 0 ; j--) { // 背包
            const a = dp[j];
            const b = dp[j - arr[i][1]] + arr[i][2] || 0;
            dp[j] = Math.max(a, b);
        }
    }
    // for(let j = w; j >= 0 ; j--) { // 背包
    //     for(let i = 0; i < n; i++) { // 物品
    //         const a = dp[j];
    //         const b = dp[j - arr[i][1]] + arr[i][2] || 0;
    //         dp[j] = Math.max(a, b);
    //         console.log(dp[j]);
    //     }
    //     console.log('-------');
    // }
    return Math.max(...dp);
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
        [2, 1, 31],
        [3, 1, 31]
    ], 4));
}
run();