/**
 * n: 棋盘的规模n*n
 * 求: n皇后的所有摆放结果
 */
function nQueen(n) {
    const rst = [];
    const chessboard = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(n).fill('');
        chessboard[i] = a;
    }
    function backTracking(row) { // row代表树的层次
        if (row === n) { // 终止条件
            rst.push(copyChessBoard(chessboard, n)); //收集数据
            return;
        }
        for(let col = 0; col < n; col++) {
            if (isValidForQueen(chessboard, n, row, col)) { // 判断当前摆放位置是否可以摆放
                chessboard[row][col] = 'Q';
            } else {
                continue;
            }
            backTracking(row + 1);
            chessboard[row][col] = ''; // 清除棋盘痕迹，往上层回溯
        }
    }
    backTracking(0);
    return rst;
}
// 判断在当前规模的棋盘的当前坐标能否摆放
function isValidForQueen(chessboard, n, row, col) {
    let xCount = 0; // 横向
    let yCount = 0; // 纵向
    let four_count = 0; // 45度斜向
    const rowArr = chessboard[row];
    rowArr.forEach(item => { // 统计横向
        item && xCount++;
    });
    for(let i = 0; i < n; i++) { // 统计纵向
        chessboard[i][col] && yCount++;
    }
    four_dirs_count(chessboard, n, row, col).forEach(([i, j]) => {
        chessboard[i][j] && four_count++;
    });
    return !xCount && !yCount && !four_count;
}
function four_dirs_count(chessboard, n, row, col) { // 统计当前坐标的斜方向上的所有坐标
    let DIR_MAP = {
        leftUp: 'leftUp', // 左上
        rightUp: 'rightUp', // 右上
        rightDown: 'rightDown', // 右下
        leftDown: 'leftDown', // 左下
    }
    let dirs = []; // 需要处理的方向
    if (row && col) {
        Object.keys(DIR_MAP).forEach(key => {
            dirs.push(DIR_MAP[key]);
        });
    } else if (row) {
        dirs.push(DIR_MAP.leftDown, DIR_MAP.rightDown);
    } else if (col) {
        dirs.push(DIR_MAP.rightUp, DIR_MAP.rightDown);
    } else {
        dirs.push(DIR_MAP.rightDown);
    }
    let i = null;
    let j = null;
    let curDir = null;
    const rst = [];
    while(dirs.length) {
        curDir = dirs.pop();
        i = row;
        j = col;
        switch(curDir) {
            case DIR_MAP.leftUp:
                while(i > 0 && j > 0) {
                    i--;
                    j--;
                    rst.push([i, j]);
                }
                break;
            case DIR_MAP.rightUp:
                while(i < n - 1 && j > 0) {
                    i++;
                    j--;
                    rst.push([i, j]);
                }
                break;
            case DIR_MAP.rightDown:
                while(i < n - 1 && j < n - 1) {
                    i++;
                    j++;
                    rst.push[i, j];
                }
                break;
            case DIR_MAP.leftDown:
                while(i > 0 && j < n - 1) {
                    i--;
                    j++;
                    rst.push([i, j]);
                }
                break;
            default:
                break;
        }
    }
    return rst;
}
function copyChessBoard(chessboard, n) {
    const rst = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(n);
        rst[i] = a;
    }
    for(let i = 0; i < n; i++) {
        for(j = 0; j < n; j++) {
            rst[i][j] = chessboard[i][j];
        }
    }
    return rst;
}
function test() {
    const n = 4;
    const chessboard = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(n).fill('');
        chessboard[i] = a;
    }
    chessboard[0][0] = 'Q';
    // chessboard[1][3] = 'Q';
    console.log(isValidForQueen(chessboard, n, 2, 1));
    console.log(chessboard[0]);
    console.log(chessboard[1]);
}
console.log(nQueen(4));
console.log(nQueen(8));
