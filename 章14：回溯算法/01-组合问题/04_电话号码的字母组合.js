
/**
 * 数字字符串：拨号序列
 * 求：拨号序列中的数字包含的字符之间的组合结果
 */
function phoneNumCombination(str) {
    const rst = [];
    const map = {
        1: '',
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    let s = [];
    function backTracking(index) {
        if (index === str.length) { // 终止条件，收集数据
            rst.push(s.concat().join(''));
            return;
        }
        const chars = map[str[index]];
        for (let i = 0; i < chars.length; i++) {
            s.push(chars[i]);
            backTracking(index + 1); // 深入下一层，找寻下一位的字符串
            s.pop();
        }
    }
    backTracking(0);
    return rst;
}
console.log(phoneNumCombination('12'));
console.log(phoneNumCombination('23'));
console.log(phoneNumCombination('234'));
