
/**
 * n: 1 - n, n个数
 * k: 组合数的长度
 * 求：长度为k和为n的所有组合数
 * 2个剪枝叶优化：
 * 1.sum的求和角度
 * 2.组合数的个数角度
 */
function combination(n, k) {
    const rst = [];
    const path = [];
    let sum = 0;
    function backTracking(startIndex) {
        if (sum > n) return;
        if (path.length === k && sum === n) {
            rst.push(path.concat()); // 收集结果
            return;
        }
        for (let i = startIndex; i <= (n - (k - path.length) + 1); i++) {
            path.push(i);
            sum += i;
            backTracking(i + 1);
            sum -= i; // 为当前层次的下一个数腾出位置
            path.pop(i);
        }
    }
    backTracking(1);
    return rst;
}
console.log(combination(6, 2));
console.log(combination(9, 2));
