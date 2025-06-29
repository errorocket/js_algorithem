class Stack {
    constructor() {
        this.data = [];
    }
    pop() {
        return this.data.pop();
    }
    push(el) {
        this.data.push(el);
    }
    size() {
        return this.data.length;
    }
    isEmpty() {
        return this.data.length === 0;
    }
    top() {
        return this.data[this.size() - 1];
    }
}

// 栈的应用一：检测符号配对问题
function strMatch(str) {
    const n = str.length;
    const stack = new Stack();
    const strMap = {
        '{': '}',
        '[': ']',
        '(': ')',
        '<': '>'
    };
    let isMatch = true;
    let leftChar = '';
    let curStr = ''
    for(let i = 0; i < n; i++) {
        curStr = str[i];
        if (strMap[curStr]) {
            // 左侧字符入栈
            stack.push(curStr);
            continue;
        }
        // 比对右侧字符是否配对
        leftChar = stack.pop();
        if (strMap[leftChar] !== curStr) {
            isMatch = false;
            break;
        }
    }
    if (stack.size()) {
        // 右侧字符缺失
        isMatch = false;
    }
    return isMatch;
}

function strMatchTest() {
    const strArr = ['[({<>})]', '[{<}]', '[{<>>}]', '{[()]}{'];
    strArr.forEach(str => {
        console.log(strMatch(str));
    });
}

// 应用二：十进制转其他进制
function baseConvert(num, base) {
    const stack = new Stack();
    while(num > 0) {
        stack.push(num % base);
        num = ~~(num / base);
    }
    let ret = '';
    // 使用当前指定进制规范下的数值去表示
    const dights = '0123456789abcdef';
    while(stack.size()) {
        ret += dights[stack.pop()];
    }
    return ret;
}

console.log(baseConvert(2007, 8));
