function getCircleNum(matrix) {
    const size = matrix.length;
    const unionFind = new UnionFind(size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j]) {
                unionFind.merge(i, j);
            }
        }
    }
    return unionFind.getGroupNum();
}
function run() {
    const matrix1 = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1]
    ];

    const matrix2 = [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 1]
    ];
    console.log(getCircleNum(matrix1));
    console.log(getCircleNum(matrix2));
}
run();
