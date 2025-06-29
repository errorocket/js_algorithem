
/**
 * arr: 元素可重复的数组，内部元素不可以重复使用
 * target: arr中若干元素组合的求和目标
 * 求：arr中元素的组合的和为target的所有组合（组合结果不可以重复）
 * 核心：对于树枝和树层，对数层中的元素限制重复使用
 */
function combination(arr, target) {
    arr.sort((a, b) => a - b);
    const rst = [];
    const path = [];
    const used = new Array(arr.length).fill(false);
    let sum = 0;
    function backTracking(startIndex) {
        if (sum > target) return; // 剪枝
        if (sum === target) {
            rst.push(path.concat()); // 收集组合
            return;
        }
        for (let i = startIndex; i < arr.length; i++) {
            if (i > startIndex && (arr[i] === arr[i - 1]) && !used[i - 1]) { // 树层去重
                continue;
            }
            path.push(arr[i]);
            sum += arr[i];
            used[i] = true;
            backTracking(i + 1); // 数组中的元素不可以重复使用
            path.pop();
            sum -= arr[i];
            used[i] = false;
        }
    }
    backTracking(0);
    return rst;
}
console.log(combination([1, 1, 2, 4, 5, 6, 8, 9], 4));
console.log(combination([1, 1, 2, 4, 5, 6, 8, 9], 3));
