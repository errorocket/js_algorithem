/**
    给你一个整数数组 nums
    请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    子数组是数组中的一个连续部分。
 */
function maxSubArray(nums) {
    /**
     * 1.dp[i] 以nums[i]结尾的子数组的最大和为dp[i]
     * 2.
     * ------j----i------
     * dp[i] = max(dp[i - 1] + nums[i], nums[i])
     * 3.初始化
     * dp[0] = nums[0]
     */
    const dp = new Array(nums).fill(0);
    dp[0] = nums[0];
    for(let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    }
    return Math.max(...dp);
}
function run() {
    console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
    console.log(maxSubArray([1]));
    console.log(maxSubArray([5,4,-1,7,8]));

}
run();