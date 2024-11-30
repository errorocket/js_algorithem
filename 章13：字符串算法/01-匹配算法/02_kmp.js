class Kmp {
    static indexOf(target, pattern) {
        const pmt = Kmp.getPMT(pattern);
        const lt = target.length;
        const lp = pattern.length;
        let i = 0;
        let j = 0;
        while (i < lt && j < lp) {
            if (target[i] === pattern[j]) {
                i++;
                j++;
            } else {
                if (j === 0) {
                    i++;
                } else {
                    j = pmt[j - 1];
                }
            }
        }
        return j === lp ? (i - j) : -1;
    }
    static getPMT(pattern) {
        const pmt = [0];
        const n = pattern.length;
        let i = 1; // 最长后缀子串的索引
        let j = 0; // 前缀子串的索引
        while (i < n && j < n) {
            if (pattern[i] === pattern[j]) {
                pmt[i] = j + 1;
                i++;
                j++;
            } else {
                pmt[i] = 0;
                if (j === 0) {
                    i++;
                } else {
                    j = pmt[j - 1];
                }
            }
        }
        return pmt;
    }
}
function run() {
    const target = 'Engineering is Magic';
    const pattern1 = 'cool';
    const pattern2 = 'magic';
    const pattern3 = 'Magic';
    const pattern4 = 'is';
    const pattern5 = 'gineer';
    const pattern6 = 'Engineer';
    const pattern7 = 'c';
    console.log(Kmp.indexOf(target, pattern1));
    console.log(Kmp.indexOf(target, pattern2));
    console.log(Kmp.indexOf(target, pattern3));
    console.log(Kmp.indexOf(target, pattern4));
    console.log(Kmp.indexOf(target, pattern5));
    console.log(Kmp.indexOf(target, pattern6));
    console.log(Kmp.indexOf(target, pattern7));
}
run();
