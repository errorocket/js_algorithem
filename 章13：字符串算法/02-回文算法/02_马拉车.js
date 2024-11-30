function palindrome(s) {
    if (!s?.length) return;
    const a = ['^', '#', ...s.split('').join('#'), '#', '$'];
    const p = new Array(a.length).fill(0);
    let c = 0; // 最大伞
    let r = 0; // 最大伞的最右边界
    let max = -Infinity;
    let index = -1;
    for (let i = 1; i < a.length - 1; i++) {
        if (i <= r) {
            p[i] = Math.min(r - i, 2 * c - i); // 优化
        }
        while (a[i - p[i] - 1] === a[i + p[i] + 1]) p[i]++; // 中心扩展
        if (i + p[i] > r) { // 维护
            r = i + p[i];
            c = i;
        }
        if (p[i] > max) { // 结果
            max = p[i];
            index = i;
        }
    }
    return {
        max,
        index: (index - max) >> 1,
        s
    }
}
function run() {
    console.log(palindrome('abbac'));
    console.log(palindrome('moon'));
    console.log(palindrome('abccba'));
    console.log(palindrome('abdccdbad'));
    console.log(palindrome('cfgabdccdbad'));
    console.log(palindrome('cfga'));
}
run();
