class UnionFind {
    constructor(size) {
        this.init(size);
    }
    init(size) {
        this.size = size;
        this.arr = new Array(size);
        this.height = new Array(size);
        for (let i = 0; i < size; i++) {
            this.arr[i] = i;
            this.height[i] = 1;
        }
    }
    query(el) {
        let index = this.arr[el];
        // 上报所在组的最大编号: 实现快速合并
        while (el !== index) {
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
        // 基于深度：将较浅的组合并到较深的组上
        if (this.height[index1] > this.height[index2]) {
            this.arr[index2] = index1;
        } else if (this.height[index1] < this.height[index2]) {
            this.arr[index1] = index2;
        } else {
            this.arr[index2] = index1;
            // 任选一个组的深度+1
            this.height[index1]++;
        }
        this.size--;
    }
    getGroupNum() {
        return this.size;
    }
    toString() {
        return this.arr.join(' ');
    }
    getHeightArr() {
        return this.height;
    }
}

function unionFindTest() {
    const unionFind = new UnionFind(10);
    console.log('query: ', unionFind.query(3));
    console.log('height: ', unionFind.getHeightArr());

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
