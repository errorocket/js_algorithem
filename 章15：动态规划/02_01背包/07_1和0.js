/**
 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。
 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 核心：背包有两个维度的限制条件
 */

 function oneAndZero(strs, m, n) {
    /**
     * 1.dp[i][j]含义：含有i个0和j个1的背包的最大元素个数为dp[i][j]
     * 2.递推公式:
     * 假设待放入背包的元素含有x个0和y个1
     * a)元素不放入背包：dp[i][j]
     * b)元素放入背包：dp[i-x][j-y] + 1
     * dp[i][j] = Math.max(dp[i][j], dp[i-x][j-y] + 1);
     * 3.初始化
     * dp[0][0] = 0;
     * 其余也初始化为0，防止初始值干预与dp[i-x][j-y] + 1的值的大小比较
     */
    const dp = new Array(m + 1);
    for(let i = 0; i <= m; i++) {
        const a = new Array(n + 1).fill(0);
        dp[i] = a;
    }
    strs.forEach(str => {
        let x = 0;
        let y = 0;
        [...str].forEach(chr => {
            if (chr === '0') {
                x++;
            } else y++;
        });
        for(let i = m; i >= x; i--) { // 背包限制维度1: 0的个数
            for(let j = n; j >= y; j--) { // 背包限制维度2: 1的个数
                dp[i][j] = Math.max(dp[i][j], dp[i - x][j - y] + 1);
            }
        }
    });
    // console.log(JSON.stringify(dp));
    return dp[m][n];
 }

 function run() {
    console.log(oneAndZero(['10', '0001', '111001', '1', '0'], 5, 3));
    console.log(oneAndZero(["10", "0", "1"], 1, 1));
 }
 run();