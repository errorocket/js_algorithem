
/*
* str: 字符串
* 求：对字符串进行切割操作，求切割结果是回文串的所有切割方法
* 核心：利用回溯可获取所有切割到的子串，然后判断并收集回文串
*/
function splitPalindrome(str) {
    const rst = [];
    const path = [];
    function backTracking(startIndex) {
        if (startIndex >= str.length) { // 终止条件，切割结束
            rst.push(path.concat()); // 收集组合(回文串)
            return;
        }
        for (let i = startIndex; i < str.length; i++) {
            if (isPalindrome(str, startIndex, i)) { // 判断切割的子串是否为回文串
                path.push(str.slice(startIndex, i + 1)); // 统计回文串
            } else continue;
            backTracking(i + 1);
            path.pop();
        }
    }
    backTracking(0);
    return rst;
}
console.log(splitPalindrome('abbc'));
console.log(splitPalindrome('aba'));
console.log(splitPalindrome('abba'));
console.log(splitPalindrome('abc'));
