/**
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列
 */
function lengthOfLIS(nums) {
    /**
     * 1.dp[i]含义：以nums[i]为结尾的最长递增子序列
     * 2.
     * -----j------i------
     * dp[i] = max(dp[j] + 1, dp[i]) (j > 0 && j < i)
     * 3.初始化
     * dp[i] = 1至少有自身1个字符串
     */
    const dp = new Array(nums.length).fill(1);
    for(let i = 1; i < nums.length; i++) {
        for(let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) { // 严格递增
                dp[i] = Math.max(dp[j] + 1, dp[i]); // 寻找更优解
            }
        }
    }
    return Math.max(...dp);
}
function run() {
    console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));
    console.log(lengthOfLIS([0,1,0,3,2,3]));
    console.log(lengthOfLIS([7,7,7,7,7,7,7]));
}
run();