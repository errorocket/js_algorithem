
/**
 * bord：给定的二维棋盘(9 * 9)，棋盘的空位用字符-点'.'来表示，棋盘每个位置的数字为1-9之间的正整数
 * 求：当前棋盘的一种摆法
 * 核心：二维递归 + 向下递归与向上层回退，回退是为了更好的向下递归，向下递归到一个解之后，就迅速的向上层回退退出
 */
function lonelyNum(n) {
    const board = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(n).fill('.');
        board[i] = a;
    }
    function backTracking() {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) { // 定位棋盘的每一个位置，比n皇后多了一个纬度
                if (board[i][j] !== '.') continue;
                for(let k = 1; k <= n; k++) {
                    if (isValidLonelyNum(board, n, i, j, k)) {
                        board[i][j] = k;
                        if (backTracking()) return true;
                        board[i][j] = '.'; // 擦除当前非法结果
                    }
                }
                return false;
            }
        }
        return true;
    }
    if (backTracking()) return board;
    return [];
}
// 判断在当前规模的棋盘的目标位置处放置num是否合法
function isValidLonelyNum(board, n, row, col, num) {
    const xArr = board[row];
    for(let i = 0; i < n; i++) { // 横向查重
        if (xArr[i] === num) {
            return false;
        }
    }
    for(let i = 0; i < n; i++) { // 纵向查重
        if (board[i][col] === num) {
            return false;
        }
    }
    const step = Math.sqrt(n);
    const startRow = Math.floor(row / step) * step;
    const startCol = Math.floor(col / step) * step;
    for(let i = startRow; i < startRow + step; i++) { // 9宫格查重
        for(let j = startCol; j < startCol + step; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}
console.log(lonelyNum(9));
