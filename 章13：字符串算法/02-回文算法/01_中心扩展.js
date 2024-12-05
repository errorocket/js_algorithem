function midExpand(s) {
    if (!s.length) return;
    const c = ['^', '#', ...[...s.split('')].join('#'), '#', '$'];
    let ret = 0; // 向左右扩展的步长，该步长等于原字符串中回文串的长度
    let max = -Infinity;
    let index = 0;
    for (let i = 1; i < c.length - 1; i++) {
        while (c[i - ret - 1] === c[i + ret + 1]) ret++;
        if (ret > max) {
            max = ret;
            index = i;
        }
        ret = 0;
    }
    return {
        max,
        index: (index - max) >> 1,
        s
    };
}
function run() {
    console.log(midExpand('abbac'));
    console.log(midExpand('moon'));
    console.log(midExpand('abccba'));
    console.log(midExpand('abdccdbad'));
    console.log(midExpand('cfgabdccdbad'));
    console.log(midExpand('cfga'));
}
run();
