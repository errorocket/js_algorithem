
// 对01_组合进行剪枝优化
function combination(n, k) {
    const rst = [];
    const path = [];
    let count = 0;
    function backTracking(startIndex) {
        count++;
        if (path.length === k) {
            rst.push(path.concat()); // 递归出口，收集数据
            return;
        }
        for (let i = startIndex; i <= (n - (k - path.length) + 1); i++) {
            path.push(i);
            backTracking(i + 1);
            path.pop(i);
        }
    }
    backTracking(1);
    console.log('剪枝, backTracking执行次数', count);
    return rst;
}
console.log(combination(4, 3));
console.log(combination(4, 2));
console.log(combination(100, 4));
