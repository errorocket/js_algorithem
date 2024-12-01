/**
    你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金
    这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的
    同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
    给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额
 */
function maxRob(nums) {
    /**
     * 1.dp[i]含义：考虑下标为0-i的放假，该范围内所能偷得的最大金额为dp[i]
     * 2.递推公式
     * dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
     * 3.初始化
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
function circleMaxRob(nums) {
    const targetNums = [];
    targetNums.push(nums.slice(0, nums.length - 1));
    targetNums.push(nums.slice(1));
    const res = [];
    targetNums.forEach(nums => {
        res.push(maxRob(nums));
    });
    return Math.max(...res);
}
function run() {
    console.log(circleMaxRob([2,3,2]));
    console.log(circleMaxRob([1,2,3,1]));
    console.log(circleMaxRob([1,2,3]));
}
run();