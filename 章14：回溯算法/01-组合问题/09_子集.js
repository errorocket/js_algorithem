
/**
 * arr：给定的数组(无重复元素)
 * 求：返回已知数组的所有子集
 * 核心：终止条件 + 收集数据(每个节点)
 */
function findSubSet(arr) {
    const rst = [{}];
    const path = [];
    function backTracking(startIndex) {
        if (startIndex >= arr.length) { // 终止条件
            return;
        }
        for (let i = startIndex; i < arr.length; i++) {
            path.push(arr[i]);
            rst.push(path.concat());
            backTracking(i + 1);
            path.pop();
        }
    }
    backTracking(0);
    return rst;
}
console.log(findSubSet([1, 2, 3, 4]));
