
/**
 * arr: 给定数组(可以有重复元素)
 * 求：给定数组arr的所有递增子序列
 * 核心：数层去重 + 收集节点数据的时机
 */
function increasingSubsequence(arr) {
    const rst = [];
    const path = [];
    function backTracking(startIndex) {
        const set = new Set(); // 统计当前数层中已经使用过的元素
        if (startIndex >= arr.length) return;
        for (let i = startIndex; i < arr.length; i++) {
            if (path.length && arr[i] < path.slice(-1) // 不满足递增
                || set.has(arr[i]) // 数层去重
            ) {
                continue;
            }
            path.push(arr[i]);
            set.add(arr[i]);
            if (path.length > 1) {
                rst.push(path.concat()); // 收集节点数据
            }
            backTracking(i + 1);
            path.pop();
        }
    }
    backTracking(0);
    return rst;
}
console.log(increasingSubsequence([4, 7, 6, 7]));
