/**
    给你一个非负整数数组 nums 和一个整数 target 。
    向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
    例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
    返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 */

function targetSum(nums, target) {
    const sum = nums.reduce((sum, cur) => sum + cur, 0);
    /**
     * left + right = sum;
     * left - right = target;
     * => left = (sum + target) / 2;
     */
    const left = (sum + target) / 2;
    if ((left + '').indexOf('.') !== -1) {
        return 0;
    }
    /**
     * 1.dp[j]含义：装满容量为j的背包，共有dp[j]种方式
     * 2.dp[j] += dp[j - nums[i]]; (i >= 0 && i < nums.length)
     * 3.初始化 dp[0] = 1
     */
    const dp = new Array(left + 1).fill(0);
    dp[0] = 1;
    for(let i = 0; i < nums.length; i++) { // 物品
        for(let j = left; j >= nums[i]; j--) { // 背包
            dp[j] += dp[j - nums[i]];
        }
    }
    // console.log(JSON.stringify(dp));
    return dp[left];
}
function run() {
    console.log(targetSum([1,1,1,1,1], 3));
    console.log(targetSum([1,1,1,1,1], 2));
    console.log(targetSum([1], 1));
}
run();