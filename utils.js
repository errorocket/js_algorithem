// 交换
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

//  产生部分有序数据
function getTestData({dataSize = 10000, hasNegative = false}) {
    const arr = [];
    const onePartSize = dataSize * 0.1;
    const midData = dataSize / 2;
    for(let i = 0; i < dataSize; i++) {
        if(i < onePartSize) {
            arr[i] = hasNegative ? onePartSize - i - midData : onePartSize - i;
        } else {
            arr[i] = hasNegative ? i - midData : i;
        }
    }
    return arr;
}

// 产生完全无序的数据
function shakeData(arr) {
    const size = arr.length;
    for(let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * size);
        const safeRandomIndex = randomIndex ? randomIndex - 1 : randomIndex;
        swap(arr, safeRandomIndex, safeRandomIndex + 1);
    }
}

// 运行算法函数，检测算法性能
function run({
    sortFunc,
    dataSize = 50000,
    showSortedArr = false,
    funcArgs = [],
    hasNegative = false
}) {
    const arr = getTestData({dataSize, hasNegative});
    // console.log('data: ', arr);
    let start = Date.now();

    // 调用目标函数处理部分有序数据
    sortFunc(arr, ...funcArgs);

    let cost =  Date.now() - start;
    console.log(`部分有序，${sortFunc.name} 用时 ${cost}`);
    shakeData(arr);
    // console.log('shakeData: ', arr);
    start = Date.now();

    // 调用目标函数处理完全无序数据
    sortFunc(arr, ...funcArgs);

    cost =  Date.now() - start;
    console.log(`完全无序，${sortFunc.name} 用时 ${cost}`);

    if (showSortedArr) {
        console.log(arr);
    }
}

// 基于权重的并查集
class UnionFind {
    constructor(size) {
        this.size = size;
        this.parents = new Array(size);
        this.weight = new Array(size);
        for(let i = 0; i < size; i++) {
            this.parents[i] = i;
            this.weight[i] = 1;
        }
    }
    query(el) {
        const parents = this.parents;
        while(el !== parents[el]) {
            el = parents[el];
        }
        return el;
    }
    isConnected(el1, el2) {
        return this.query(el1) === this.query(el2);
    }
    merge(e1, e2) {
        if (!this.isConnected(e1, e2)) {
            const g1 = this.query(e1);
            const g2 = this.query(e2);
            const parents = this.parents;
            if (this.weight[g1] > this.weight[g2]) {
                parents[g2] = g1;
                this.weight[g1]++;
            } else {
                parents[g1] = g2;
                this.weight[g2]++;
            }
            this.size--;
        }
    }
    getGroupNum() {
        return this.size;
    }
    toString() {
        return this.parents.join(' ');
    }
    getWeightArr() {
        return this.weight;
    }
    setSize(size) {
        this.size = size;
    }
}

function unionFindTest() {
    const unionFind = new UnionFind(10);
    console.log('query: ', unionFind.query(3));
    console.log('height: ', unionFind.getWeightArr());

    console.log('isConnected: ', unionFind.isConnected(1, 2));
    unionFind.merge(1, 2);
    console.log(unionFind.toString(), ' --->size: ', unionFind.getGroupNum());
    console.log('isConnected: ', unionFind.isConnected(1, 2));

    unionFind.merge(1, 3);
    console.log(unionFind.toString(), ' --->size: ', unionFind.getGroupNum());
    console.log('isConnected: ', unionFind.isConnected(1, 3));
    console.log('isConnected: ', unionFind.isConnected(2, 3));

    unionFind.merge(3, 8);
    console.log(unionFind.toString(), ' --->size: ', unionFind.getGroupNum());
    console.log('isConnected: ', unionFind.isConnected(1, 8));
    console.log('isConnected: ', unionFind.isConnected(2, 8));
}

// 是否是回文串
function isPalindrome(str, left, right) {
    while(left < right) {
        if (str[left] === str[right]) {
            left++;
            right--;
        } else {
            return false;
        }
    }
    return true;
}

function testLegalRange() {
    const n = 4;
    const board = new Array(n);
    for(let i = 0; i < n; i++) {
        let a = new Array(n).fill('.');
        board[i] = a;
    }
    board[0] = [1, 2, 3, 4];
    // console.log(isValidLonelyNum(board, n, 1, 0, 1));
    console.log(isValidLonelyNum(board, n, 1, 0, 2));
    console.log(board);
}

// 以当前坐标为中心的宫格范围
function getLegalRange(n, row, col) {
    const step = Math.sqrt(n);
    const TYPE_MAP = {
        iMin: 'iMin',
        iMax: 'iMax',
        jMin: 'jMin',
        jMax: 'jMax'
    }
    const types = Object.keys(TYPE_MAP);
    const rst = {};
    let curType = null;
    let index = null;
    let count = null;
    while(types.length) {
        curType = types.pop();
        switch(curType) {
            case TYPE_MAP.iMin:
                index = row;
                count = step - 1;
                while(count && index > 0) { // 有限的移动步长内，探索i的合法底线
                    index --;
                    count--;
                }
                rst[TYPE_MAP.iMin] = index;
                break;
            case TYPE_MAP.iMax:
                index = row;
                count = step - 1;
                while(count && index < n - 1) {
                    index++;
                    count--;
                }
                rst[TYPE_MAP.iMax] = index;
                break;
            case TYPE_MAP.jMin:
                index = col;
                count = step - 1;
                while(count && index > 0) {
                    index--;
                    count--;
                }
                rst[TYPE_MAP.jMin] = index;
                break;
            case TYPE_MAP.jMax:
                index = col;
                count = step - 1;
                while(count && index < n - 1) {
                    index++;
                    count--;
                }
                rst[TYPE_MAP.jMax] = index;
                break;
            default:
                break;
        }
    }
    return rst;
}

module.exports =  {
    // 排序相关工具
    swap,
    getTestData,
    shakeData,
    run,
    // 并查集相关工具
    UnionFind,
    unionFindTest,
    // 回文串相关工具
    isPalindrome,
    // 回溯相关
    getLegalRange
}