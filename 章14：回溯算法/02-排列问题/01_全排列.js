
/**
 * arr: 数字数组(无重复元素, 元素不可重复使用)
 * 求: 数组元素的全排列结果
 */
function permutation(arr) {
    const rst = [];
    const path = [];
    const used = new Array(arr.length).fill(false);
    function backTracking() {
        if (path.length === arr.length) { // 终止条件
            rst.push(path.concat()); // 收集数据
            return;
        }
        for(let i = 0; i < arr.length; i++) {
            if (used[i]) {
                continue; // 禁止重复使用元素
            }
            used[i] = true; // 标记已使用的元素
            path.push(arr[i]);
            backTracking(i);
            path.pop();
            used[i] = false;
        }
    }
    backTracking(0);
    return rst;
}
console.log(permutation([1, 2, 3]));
console.log(permutation([1, 2, 3, 4]));
