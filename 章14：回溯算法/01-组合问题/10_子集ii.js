
/*
 * arr: 数字数组(元素可重复)
 * 求: arr的所有子集
*/
function findSubSet(arr) {
    arr.sort((a, b) => a - b);
    const rst = [{}];
    const path = [];
    const used = new Array(arr.length).fill(false);
    function backTracking(startIndex) {
        if (startIndex >= arr.length) return; // 终止条件
        for (let i = startIndex; i < arr.length; i++) {
            if (i > 0 && (arr[i] === arr[i - 1]) && !used[i - 1]) { // 数层去重
                continue;
            }
            path.push(arr[i]);
            rst.push(path.concat()); // 收集节点数据
            used[i] = true;
            backTracking(i + 1);
            path.pop();
            used[i] = false;
        }
    }
    backTracking(0);
    return rst;
}
console.log(findSubSet([1, 2, 2]));
console.log(findSubSet([1, 2, 3, 4, 4]));
