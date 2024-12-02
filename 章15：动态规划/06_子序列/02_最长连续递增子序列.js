/**
    给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
    连续递增的子序列 可以由两个下标 l 和 r（l < r）确定
    如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1]
    那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
 */

function findLengthOfLCIS(nums) {
    /**
     * 1.dp[i]:以nums[i]为结尾的最长连续递增子序列的长度为dp[i]
     * 2.递推公式
     * dp[i] = dp[i - 1] + 1 (dp[i - 1] < dp[i])
     * 3.初始化：
     * dp[i] = 1
     */
    const dp = new Array(nums.length).fill(1);
    for(let i = 1; i < nums.length; i++) {
        if (nums[i - 1] < nums[i]) { // 严格递增
            dp[i] = dp[i - 1] + 1;
        }
    }
    return Math.max(...dp);
}
function run() {
    console.log(findLengthOfLCIS([1,3,5,4,7]));
    console.log(findLengthOfLCIS([2,2,2,2,2]));
}
run();