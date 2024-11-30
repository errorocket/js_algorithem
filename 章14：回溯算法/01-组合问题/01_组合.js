
/**
 * 1 - n: n个数
 * 长度为k的所有组合
 */
function combination(n, k) {
    const rst = [];
    const path = [];
    let count = 0;
    function backTracking(startIndex) {
        count++;
        if (path.length === k) {
            rst.push(path.concat()); // 收集数据
            return;
        }
        for (let i = startIndex; i <= n; i++) {
            path.push(i); // 当前层的基数
            backTracking(i + 1); // 以当前i为基数，还要下潜几层，取决于k
            path.pop(i); // 弹出当前层的基数
            // 一个核心：当前层次只能修改当前对应层push进去的数，修改不了上层push进去的数
        }
    }
    backTracking(1);
    console.log('未剪枝, backTracking执行次数', count);
    return rst;
}
console.log(combination(4, 3));
console.log(combination(4, 2));
console.log(combination(100, 4));
