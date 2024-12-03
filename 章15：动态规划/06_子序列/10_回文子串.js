/**
    给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目
    回文字符串 是正着读和倒过来读一样的字符串
    子字符串 是字符串中的由连续字符组成的一个序列
 */
function countSubstrings(s) {
    /**
     * 1.dp[i][j]含义：以i，j为起始的字符串，即：字符串区间[i,j]所包含的回文子串数目
     * 2.递推公式
     * -------i---(i+1)-----(j-1)---j--
     * let sum = 0;
     * if (s[i] === s[j]) {
     *     if (j - i <= 1) { // a 或者 aa
     *         sum++;
     *         dp[i][j] = true;
     *     } else if (dp[i+1][j-1]) { // 内部包含回文子串
     *         sum++;
     *         dp[i][j] = true;
     *     }
     * }
     * 3.初始化：false
     * 4.遍历顺序：dp[i][j]由左下方数据推导而来
     * i------(i,j)---------
     * ---------j-----------
     * ---------------------
     * --(i+1,j-1)----------
     */
    const dp = new Array(s.length);
    for(let i = 0; i < s.length; i++) {
        const a = new Array(s.length).fill(false);
        dp[i] = a;
    }
    // console.log(JSON.stringify(dp));
    let sum = 0;
    for(let i = s.length - 1; i >= 0; i--) { // 数据由左下往上推导
        for(let j = i; j < s.length; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1) {
                    sum++;
                    dp[i][j] = true;
                } else if (dp[i + 1][j - 1]) {
                    sum++;
                    dp[i][j] = true;
                }
            }
        }
    }
    // console.log(JSON.stringify(dp));
    return sum;
}
function run() {
    console.log(countSubstrings("abc"));
    console.log(countSubstrings("aaa"));
}
run();