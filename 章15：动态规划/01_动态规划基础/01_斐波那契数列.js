
// 1 1 2 3 5 8 ...
function fibonacci(n) {
    const dp = []; // dp[i]的含义(i与dp[i]的含义)
    dp[0] = 1; // dp数组的初始化
    dp[1] = 1;
    for(let i = 2; i <= n; i++) { // 遍历的顺序
        dp[i] = dp[i - 1] + dp[i - 2]; // 递推公式
    }
    console.log(dp); // 打印dp数组
    return dp[n];
}
// 状态压缩
function fibonacci2(n) {
    if (n < 2) {
        return n;
    }
    let dp1 = 1;
    let dp2 = 1;
    let sum = 0;
    for(let i = 2; i <= n; i++) {
        sum = dp1 + dp2;
        dp1 = dp2;
        dp2 = sum;
    }
    return sum;
}
function run() {
    console.log('func1: ', fibonacci(8));
    console.log('func1: ', fibonacci(10));
    console.log('func2: ', fibonacci2(8));
    console.log('func2: ', fibonacci2(10));
}
run();
