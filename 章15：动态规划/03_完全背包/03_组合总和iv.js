/**
    给你一个由 不同 整数组成的数组 nums，和一个目标整数 target
    请你从 nums 中找出并返回总和为 target 的元素组合的个数
    题目数据保证答案符合 32 位整数范围
    请注意，顺序不同的序列被视作不同的组合
 */

function countMix(nums, target) {
    if (target % Math.min(...nums) !== 0) return 0;
    /**
     * 1.dp[j]含义：容量为j的背包，其装满的方式有dp[j]种
     * 2.dp[j] += dp[j - nums[i]] (i >= 0 && i < nums.length)
     * 3.初始化:dp[0] = 1
     * 4.遍历顺序：排列问题（先背包再物品）
     */
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for(let j = 0; j <= target; j++) { // 背包
        for(let i = 0; i < nums.length; i++) { // 物品
            dp[j] += dp[j - nums[i]] || 0;
        }
    }
    return dp[target];
}
function run() {
    console.log(countMix([1,2,3], 4));
    console.log(countMix([9], 3));
}
run();