class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.size = 1;
        this.fix = ~~(Math.random() + '').slice(2, 5);
    }
    maintain() {
        this.size = (this.left?.size || 0) +
            (this.right?.size || 0) + 1;
    }
}
class Pair { // 用于合并和分裂
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
}
class Treap {
    constructor() {
        this.root = null;
    }
    merge(a, b) {
        if (!a || !b) { // 递归的出口，开始反向拼接节点
            return a || b; // ab中有空的，则返回非空的
        }
        if (a.fix < b.fix) { // 合并结果返回给上层，继续合并
            a.right = this.merge(a.right, b);
            a.maintain();
            return a;
        } else {
            b.left = this.merge(a, b.left);
            b.maintain();
            return b;
        }
    }
    split(node, val) {
        if (!node) {
            return new Pair(null, null); // 递归的出口，开始反向收集数据
        }
        let p = null;
        if (node.val <= val) { // 继续向右分支找寻小值
            p = this.split(node.right, val);
            node.right = p.first;
            p.first = node; // 将当前小值收集到pair中
        } else { // 继续向左分支找寻大值
            p = this.split(node.left, val);
            node.left = p.second;
            p.second = node;
        }
        node.maintain();
        return p; // 将收集到的结果返回给上层，继续收集
    }
    add(val) {
        const p = this.split(this.root, val);
        const node = new Node(val);
        this.root = this.merge(this.merge(p.first, node), p.second);
    }
    remove(val) {
        const p1 = this.split(this.root, val);
        const p2 = this.split(p1.first, val - 1); // val在p2.second中
        this.root = this.merge(p2.first, p1.second);
    }
    find(val) {
        const p1 = this.split(this.root, val);
        const p2 = this.split(p1.first, val - 1);
        this.root = this.merge(this.merge(p2.first, p2.second), p1.second); // val仍包含在内
        return p2.second;
    }
    getSize(node) {
        return node ? node.size : 0;
    }
    getRank(val) { // 获取排名
        const p = this.split(this.root, val - 1);
        const rank = this.getSize(p.first) + 1;
        this.root = this.merge(p.first, p.second);
        return rank;
    }
    doGetKth(node, k) { // 根据排名获取值
        while (node) {
            let lSize = this.getSize(node.left);
            if (lSize + 1 === k) {
                return node;
            } else if (k <= lSize) {
                node = node.left;
            } else {
                k -= (lSize + 1);
                node = node.right;
            }
        }
        return null;
    }
    getKth(rank) {
        return this.doGetKth(this.root, rank);
    }
    getPreNode(val) { // 获取前驱节点
        const p = this.split(this.root, val - 1);
        const preNode = this.doGetKth(p.first, this.getSize(p.first));
        this.root = this.merge(p.first, p.second);
        return preNode;
    }
    getSuccNode(val) { // 获取后继节点
        const p = this.split(this.root, val);
        const succNode = this.doGetKth(p.second, 1);
        this.root = this.merge(p.first, p.second);
        return succNode;
    }
    getMin() {
        return this.doGetKth(this.root, 1);
    }
    getMax() {
        return this.doGetKth(this.root, this.root.size);
    }
}
function run() {
    const treap = new Treap();

    // 添加节点
    treap.add(7);
    treap.add(9);
    treap.add(3);
    treap.add(6);
    treap.add(0);
    treap.add(10);
    treap.add(14);

    // 删除节点
    // treap.remove(6);

    // 查找节点
    // console.log(treap.find(9));
    // console.log(treap.find(9));

    // 获取排名
    // console.log(treap.getRank(10));
    // console.log(treap.getRank(0));
    // console.log(treap.getRank(7));

    // 根据排名获取值
    // console.log(treap.getKth(1));
    // console.log(treap.getKth(2));
    // console.log(treap.getKth(3));
    // console.log(treap.getKth(4));

    // 获取前驱和后继
    // console.log(treap.getPreNode(7));
    // console.log(treap.getSuccNode(14));
    // console.log(treap.getPreNode(14));

    // 获取最值
    console.log(treap.getMin());
    console.log(treap.getMax());

    // 输出无旋Treap
    console.log(treap);
}
run();
