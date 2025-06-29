function simpleMatch(target, pattern) {
    const lt = target.length;
    const lp = pattern.length;
    let i = 0;
    let j = 0;
    while (i < lt && j < lp) {
        if (target[i] === pattern[j]) {
            i++;
            j++;
        } else {
            i = i - j + 1; // 失配，需回退
            j = 0;
        }
    }
    return j === lp ? (i - j) : -1;
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
    console.log(simpleMatch(target, pattern1));
    console.log(simpleMatch(target, pattern2));
    console.log(simpleMatch(target, pattern3));
    console.log(simpleMatch(target, pattern4));
    console.log(simpleMatch(target, pattern5));
    console.log(simpleMatch(target, pattern6));
    console.log(simpleMatch(target, pattern7));
}
run();
