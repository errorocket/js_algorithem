class BinaryIndexedTree {
    constructor(arr) {
        this.arr = arr;
        this.BIT = new Array(arr.length + 1).fill(0);
        this.build();
    }
    // 构建子集和数组
    build() {
        const arr = this.arr;
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            // 原数组中的当前项 + 子节点在子集和数组中的前项和
            this.BIT[i + 1] = arr[i] + this.getPreData(i + 1, this.BIT);
        }
    }
    lowbit(n) {
        return n & (~n + 1);
    }
    getPreData(index, arr) {
        const children = this.getChildren(index);
        let sum = 0;
        children.forEach(c => {
            sum += arr[c];
        });
        return sum;
    }
    getChildren(index) {
        const ret = [];
        for (let i = 1; i < index; i++) {
            if (i + this.lowbit(i) === index) {
                ret.push(i);
            }
        }
        return ret;
    }
    // 单点查询
    get(index) {
        if (index < 1 || index > this.arr.length) {
            return;
        }
        return this.BIT[index] - this.getPreData(index, this.BIT);
    }
    // 单点修改
    update(index, delta, stopBoundary) {
        if (index < 1 || index > this.arr.length) {
            return;
        }
        while (index <= this.arr.length) {
            this.BIT[index] += delta;
            index += this.lowbit(index); // 更新后续的父节点
            if (stopBoundary && index > stopBoundary) {
                break;
            }
        }
    }
    // 单点重置
    set(index, newVal) {
        const delta = newVal - this.BIT[index];
        this.update(index, delta);
    }
    // 前n项和
    sum(index) {
        if (index < 1 || index > this.arr.length) {
            return;
        }
        let ret = 0;
        while (index > 0) {
            ret += this.BIT[index];
            index -= this.lowbit(index);
        }
        return ret;
    }
    // 求 a ~ b 项和
    rangeSum(a, b) {
        return this.sum(b) - this.sum(a - 1);
    }
    // 区间更新:stupid
    rangeUpdate(a, b, delta) {
        this.update(a, delta, b);
        // this.update(a, delta);
        // this.update(b + 1, -delta);
    }
    // 区间最值: todo
    rangeMax() {
    }
}
function run() {
    const arr = [10, 18, 12, 5, 7, 11, 4, 15];
    const bit = new BinaryIndexedTree(arr);
    console.log(bit);

    // 单点查询
    // console.log(bit.get(4));
    // console.log(bit.get(7));

    // 单点修改
    // bit.update(4, 1);

    // 前n项和
    // console.log(bit.sum(7));
    // console.log(bit.sum(3));

    // 区间和
    // console.log(bit.rangeSum(4, 7));

    // 区间更新
    // bit.rangeUpdate(4, 7, 1);
    // console.log(bit.rangeSum(4, 7));

    // 输出树状数组
    console.log(bit);
}
run();
