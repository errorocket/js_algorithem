/**
    你是一个专业的小偷，计划偷窃沿街的房屋
    每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统
    如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
    给定一个代表每个房屋存放金额的非负整数数组
    计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额
 */

function maxRob(nums) {
    /**
     * 1.dp[i]含义：在0-i编号的房间中，一共能偷取到的最大金额dp[i]
     * 2.递推公式
     * ------i-2----i-1----i------
     * a)偷i: dp[i - 2] + nums[i];
     * b)不偷i: dp[i - 1];
     * dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
     * 3.初始化：
     * dp[0] = nums[0];
     * dp[1] = Math.max(nums[0], nums[1]);
     */
    const dp = new Array(nums.length).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for(let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[nums.length - 1];
}
function run() {
    console.log(maxRob([1,2,3,1]));
    console.log(maxRob([2,7,9,3,1]));
}
run();