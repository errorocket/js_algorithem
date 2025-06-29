/*
    有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
    每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
    如果 x == y，那么两块石头都会被完全粉碎；
    如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
    最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。
*/

function lastStone(stones) {
    const sum = stones.reduce((sum, cur) => {
        return sum + cur;
    }, 0);
    let target = sum >> 1; // 目标堆的最大值
    /**
     * 1.dp[j]含义：容量为j的背包的最大价值为dp[j]
     * 将arr中的正整数理解为物品的重量和价值
     * 目标：dp[target] === target
     * 2.dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
     * 3.初始化
     */
    const dp = new Array(target + 1).fill(0); // 背包容量范围 0 - target
    for(let i = 0; i < stones.length; i++) { // 物品
        for(j = target; j >= stones[i]; j--) { // 背包
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i] || 0);
        }
    }
    console.log(JSON.stringify(dp));
    target = Math.max(...dp); // 期望值的实际最大值
    const other = sum - target; // 另一堆
    return Math.abs(target - other);
}
function run() {
    console.log(lastStone([2,7,4,1,8,1]));
    console.log(lastStone([31,26,33,21,40]));
}
run();