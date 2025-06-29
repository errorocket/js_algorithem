class UnionFind {
    constructor(size) {
        this.init(size);
    }
    init(size) {
        this.size = size;
        this.arr = new Array(size);
        this.weight = new Array(size);
        for (let i = 0; i < size; i++) {
            this.arr[i] = i;
            this.weight[i] = 1;
        }
        this.searchCount = 0;
    }
    query(el) {
        // 上报所在组的最大编号: 实现快速合并
        while (el !== this.arr[el]) {
            this.searchCount++;
            // 把后一步老大的位置折叠到当前位置
            this.arr[el] = this.arr[this.arr[el]]; // 如果一样就到顶，不一样就继续折叠，往上找
            el = this.arr[el];
        }
        return el;
    }
    isConnected(e1, e2) {
        return this.query(e1) === this.query(e2);
    }
    merge(e1, e2) {
        if (this.isConnected(e1, e2)) {
            return;
        }
        const index1 = this.query(e1);
        const index2 = this.query(e2);
        // 基于权重：将原先组的最大编号合并成最新的编号
        if (this.weight[index1] > this.weight[index2]) {
            this.arr[index2] = index1;
            // 更新当前组的元素个数
            this.weight[index1] += this.weight[index2];
        } else {
            this.arr[index1] = index2;
            this.weight[index2] += this.weight[index1];
        }
        this.size--;
    }
    getGroupNum() {
        return this.size;
    }
    toString() {
        return this.arr.join(' ');
    }
    getWeightArr() {
        return this.weight;
    }
    getSearchCount() {
        return this.searchCount;
    }
}

function unionFindTest() {
    const unionFind = new UnionFind(10);
    unionFind.merge(1, 2);
    unionFind.merge(2, 3);
    unionFind.merge(3, 4);
    unionFind.merge(4, 5);
    unionFind.merge(1, 8);
    console.log('searchCount: ', unionFind.getSearchCount());
}
unionFindTest();
