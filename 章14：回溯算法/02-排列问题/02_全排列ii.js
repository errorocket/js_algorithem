
/**
 * arr: 数字数组(元素可重复, 元素不可重复使用)
 * 求: 数组元素的全排列结果
 * 核心: 树层去重 + 树枝去重
 */
function permutation(arr) {
    arr.sort((a, b) => a - b);
    const rst = [];
    const path = [];
    const used = new Array(arr.length).fill(false);
    function backTracking() {
        if (path.length === arr.length) { // 终止条件
            rst.push(path.concat()); // 收集数据
            return;
        }
        for(let i = 0; i < arr.length; i++) {
            if (i > 0 && (arr[i] === arr[i - 1]) && !used[i - 1]) { // 树层去重
                continue;
            }
            if (used[i]) { // 树枝去重
                continue;
            }
            path.push(arr[i]);
            used[i] = true;
            backTracking();
            path.pop();
            used[i] = false;
        }
    }
    backTracking();
    return rst;
}
console.log(permutation([1, 1, 2]));
console.log(permutation([1, 1, 2, 3]));
