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
        return this.arr[el];
    }
    isConnected(e1, e2) {
        return this.query(e1) === this.query(e2);
    }
    merge(e1, e2) {
        if (this.isConnected(e1, e2)) {
            return;
        }
        const group1 = this.query(e1);
        const group2 = this.query(e2);
        for (let i = 0; i < this.size; i++) {
            if (this.arr[i] === group1) {
                this.arr[i] = group2;
            }
        }
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
    unionFind.merge(2, 3);
    console.log(unionFind.toString(), ' --->size: ', unionFind.getGroupNum());
    unionFind.merge(3, 8);
    console.log(unionFind.toString(), ' --->size: ', unionFind.getGroupNum());
}

unionFindTest();
