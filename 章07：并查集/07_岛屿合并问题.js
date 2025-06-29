function getIslandNum(grid) {
    let size = 0;
    let total = 0;
    let row = null;
    let preRow = null;
    let rowLength = grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < rowLength; j++) {
            if (grid[i][j]) {
                size++;
            }
            total++;
        }
    }
    // 初始化并查集
    const unionFind = new UnionFind(total);
    unionFind.setSize(size);

    for (let i = 0; i < grid.length; i++) {
        row = grid[i];
        preRow = grid[i - 1]; // 上一行
        for (let j = 0; j < rowLength; j++) {
            if (row[j] && row[j + 1]) { // 左右岛屿相连
                unionFind.merge(i * rowLength + j, i * rowLength + j + 1);
            }
            if (preRow && row[j] && preRow[j]) { // 上下岛屿相连
                unionFind.merge(i * rowLength + j, (i - 1) * rowLength + j);
            }
        }
    }
    return unionFind.getGroupNum();
}
function run() {
    const grid1 = [
        [1, 1, 1, 1, 0],
        [1, 1, 0, 1, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    const grid2 = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ];
    const grid3 = [
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ];
    const grid4 = [
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1]
    ];
    console.log(getIslandNum(grid1));
    console.log(getIslandNum(grid2));
    console.log(getIslandNum(grid3));
    console.log(getIslandNum(grid4));
}
run();
