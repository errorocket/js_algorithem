/*
 给你一个 只包含正整数 的 非空 数组 nums
 请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 核心：指定容量的0/1背包能否被放满
*/

function splitNums(arr) {
    const target = arr.reduce((sum, cur) => {
        return sum + cur;
    }, 0) / 2;
    if ((target + '').indexOf('.') !== -1) {
        return false;
    }
    /**
     * 1.dp[j]含义：容量为j的背包的最大价值为dp[j]
     * 将arr中的正整数理解为物品的重量和价值
     * 目标：dp[target] === target
     * 2.dp[j] = Math.max(dp[j], dp[j - arr[i]] + arr[i]);
     * 3.初始化
     */
    const dp = new Array(target + 1).fill(0); // 背包容量范围 0 - target
    for(let i = 0; i < arr.length; i++) { // 物品
        for(j = target; j >= arr[i]; j--) { // 背包
            dp[j] = Math.max(dp[j], dp[j - arr[i]] + arr[i] || 0);
        }
    }
    // console.log(JSON.stringify(dp));
    return dp[target] === target;
}
function run() {
    console.log(splitNums([1,5,11,5]));
    console.log(splitNums([1,2,3,5]));
    console.log(splitNums([1,2,4,5]));
}
run();