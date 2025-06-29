class UnionFind {
    constructor(size) {
        this.init(size);
    }
    init(size) {
        this.size = size;
        this.arr = new Array(size);
        for (let i = 0; i < size; i++) {
            this.arr[i] = i;
        }
    }
    query(el) {
        let index = this.arr[el];
        while (el !== index) { // 上报所在组的最大编号
            el = index;
            index = this.arr[index];
        }
        return index;
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
        this.arr[index1] = index2; // 将原先组的最大编号合并成最新的编号
        this.size--; // 集合数递减
    }
    getGroupNum() {
        return this.size;
    }
    toString() {
        return this.arr.join(' ');
    }
}

function unionFindTest() {
    const unionFind = new UnionFind(10);
    console.log('query: ', unionFind.query(3));

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

unionFindTest();
