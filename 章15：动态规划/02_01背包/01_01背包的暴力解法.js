/**
 * arr:[[0(物品编号), 1(物品重量), 15(物品价值)], [1, 3, 20], [2, 4, 30]]
 * w: 总重量
 * 每个物品仅一件
 * 求：当前背包重量下，能选择的最大价值
 */
function bag_01(arr, w) {
    const n = arr.length;
    const rst = [];
    const path = [];
    let weight = 0;
    const used = new Array(n).fill(false);
    function backTracking() {
        if (weight >= w || path.length === n) { // 终止条件(超重或已经全部收集)
            rst.push(path.concat()); // 收集合法的价值
            return path.length === n; // 若已全部收集则直接返回上层
        }
        for(let i = 0; i < n; i++) {
            if (used[i] || weight + arr[i][1] > w) continue;
            weight += arr[i][1];
            path.push(arr[i][2]); // value
            used[i] = true;
            if (backTracking()) return true; // 不再继续遍历
            path.pop();
            used[i] = false;
            weight -= arr[i][1];
        }
    }
    backTracking();
    let max = -Infinity;
    rst.forEach(arr => {
        const rst = arr.reduce((rst, cur) => {
            return rst + cur;
        }, 0);
        if (rst > max) max = rst;
    });
    return max;
}
function run() {
    console.log(bag_01([
        [0, 1, 15],
        [1, 3, 20],
        [2, 4, 30]
    ], 4));
    console.log(bag_01([
        [0, 1, 15],
        [1, 1, 20],
        [2, 1, 30]
    ], 4));
}
run();