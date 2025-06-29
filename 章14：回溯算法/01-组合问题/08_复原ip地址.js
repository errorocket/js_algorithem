
/**
 * str: 数字字符串
 * 求：对str进行切割，要求切割结果为合法的ip地址，返回所有切割所得的合法ip地址
 */
function restoreIpAddress(str, targetPointSum = 3) {
    const rst = [];
    const path = [];
    let pointSum = 0;
    function backTracking(startIndex) {
        if (pointSum === targetPointSum) {
            if (isValidIpStr(str, startIndex, str.length - 1)) {
                path.push(str.slice(startIndex)); // 收集最后一段
                rst.push(path.concat().join('.')); // path中的所有合法段
                path.pop(); // 手动pop掉追加的最后一段，因为倒数第二段还有可能有其他组合
            }
            return;
        }
        for (let i = startIndex; i < str.length; i++) {
            if (isValidIpStr(str, startIndex, i)) { // 判断当前切割的字符串是否合法
                path.push(str.slice(startIndex, i + 1)); // 存储合法段
            } else {
                continue;
            }
            pointSum++;
            backTracking(i + 1);
            path.pop();
            pointSum--;
        }
    }
    backTracking(0);
    return rst;
}
function isValidIpStr(str, left, right) {
    if (!str) return false; // 空串
    const target = str.slice(left, right + 1);
    const tmp = +target + '';
    const val = +target;
    if (target.length !== tmp.length) return false; // 高位包含0
    if (val < 0 || val > 255) return false; // 值域不合法
    return true;
}
console.log(restoreIpAddress('25525511135'));
console.log(restoreIpAddress('2550123255'));
console.log(restoreIpAddress('2123255'));
