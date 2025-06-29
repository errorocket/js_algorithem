
/**
 * arr: 无重复的正整数数组
 * target: 目标和数
 * 求：arr中若干数的组合之和为target，数组中的元素可以重复
 */
function combination(arr, target) {
    arr.sort((a, b) => a - b);
    const rst = [];
    const path = [];
    let sum = 0;
    function backTracking(startIndex) {
        if (sum > target) return;
        if (sum === target) { // 终止条件
            rst.push(path.concat()); // 收集组合
            return;
        }
        for (let i = startIndex; i < arr.length; i++) {
            path.push(arr[i]);
            sum += arr[i];
            backTracking(i); // 元素可重复使用;
            path.pop();
            sum -= arr[i];
        }
    }
    backTracking(0);
    return rst;
}
console.log(combination([2, 3, 5], 4));
console.log(combination([2, 3, 1], 4));
