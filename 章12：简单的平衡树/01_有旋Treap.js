class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.size = 1;
        this.count = 1;
        this.fix = ~~(Math.random() + '').slice(2, 7); // 节点的修正值
        this.parent = null;
    }
    maintain() {
        this.size = this.count;
        const { left, right } = this;
        if (left) {
            this.size += left.size;
        }
        if (right) {
            this.size += right.size;
        }
    }
}
class RotateTreap {
    constructor() {
        this.root = null;
    }
    rotateImpl(tree, node, dir, setParent) { // 旋转
        const other = dir === 'left' ? 'right' : 'left'; // 需要上浮的子节点
        if (!node[other]) {
            return;
        }
        const top = node[other]; // 上浮的节点
        const tmp = top[dir]; // 需要过继的节点(也许存在)
        if (setParent) {
            if (!node.parent) {
                tree.root = top; // 根节点为新上浮的节点
            } else if (node.parent.left === node) { // 更新子属性
                node.parent.left = top;
            } else {
                node.parent.right = top;
            }
            top.parent = node.parent; // 更新父属性
            node.parent = top;
            tmp && (tmp.parent = node); // 上浮节点的dir方向的节点过继给原先父节点的other位置
        }
        node[other] = tmp;
        top[dir] = node;
        node.maintain(); // 先更新下面的，再更新上面的
        top.maintain();
        return top;
    }
    rightRotate(node) {
        return this.rotateImpl(this, node, 'right', false);
    }
    leftRotate(node) {
        return this.rotateImpl(this, node, 'left', false);
    }
    insert(val) {
        this.root = this.doInsert(this.root, val);
    }
    doInsert(node, val) {
        if (!node) {
            return new Node(val);
        } else if (node.val === val) {
            node.count++;
            node.maintain();
            return node;
        } else if (val < node.val) {
            node.left = this.doInsert(node.left, val);
            if (node.left.fix < node.fix) {
                node = this.rightRotate(node);
            }
        } else {
            node.right = this.doInsert(node.right, val);
            if (node.right.fix < node.fix) {
                node = this.leftRotate(node);
            }
        }
        node.maintain();
        return node; // 将node返回给上一层，从底到上，将需要旋转的逐层都进行旋转操作(最终的出口：node === root)
    }
    find(val) {
        let node = this.root;
        let delta = 0;
        while (node) {
            delta = val - node.val;
            if (!delta) {
                return node;
            } else if (delta < 0) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return false;
    }
    remove(val) {
        const parents = [];
        let node = this.root;
        let delta = 0;
        while (node) {
            delta = val - node.val;
            if (!delta) {
                break;
            } else if (delta < 0) {
                parents.push(node);
                node = node.left;
            } else {
                parents.push(node);
                node = node.right;
            }
        }
        if (node) {
            if (node.count > 1) {
                node.count--;
                node.maintain();
            } else {
                let parent = parents[parents.length - 1];
                let newParent = null;
                while (node.left && node.right) {
                    let dir = parent?.left === node ? 'left' : 'right';
                    if (node.left.fix < node.fix) {
                        newParent = this.rightRotate(node);
                    } else {
                        newParent = this.leftRotate(node);
                    }
                    if (!parent) {
                        this.root = newParent;
                    } else {
                        parent[dir] = newParent;
                    }
                    parent = newParent; // 目标节点的新父节点
                    parents.push(parent);
                }
                if (!parent) {
                    this.root = node.left || node.right || null;
                } else {
                    let dir = parent.left === node ? 'left' : 'right';
                    parent[dir] = node.left || node.right || null;
                }
                while (parents.length) {
                    let p = parents.pop(); // 底层节点是后push进来的，先底层后上层
                    p.maintain();
                }
            }
            return true;
        }
        return false;
    }
    getRank(val) { // 获取排名
        return this.doGetRank(this.root, val);
    }
    getSize(node) {
        return node ? node.size : 0;
    }
    doGetRank(node, val) {
        if (!node) {
            return 0;
        }
        if (node.val === val) {
            return this.getSize(node.left) + 1;
        } else if (val < node.val) {
            return this.doGetRank(node.left, val);
        } else {
            return this.getSize(node.left) + node.count + this.doGetRank(node.right, val);
        }
    }
    getKth(k) { // 根据排名获取数值
        let node = this.root;
        while (node) {
            if (k <= this.getSize(node.left)) {
                node = node.left;
            } else if (k > (this.getSize(node.left) + node.count)) {
                k -= (this.getSize(node.left) + node.count);
                node = node.right;
            } else {
                return node;
            }
        }
        return null;
    }
}
function run() {
    const arr = [1, 9, 2, 5, 3, 2, 1, 0, 6, 5];
    const rotateTreap = new RotateTreap();

    // 有旋treap插入
    arr.forEach(item => {
        rotateTreap.insert(item);
    });

    // find
    // console.log(rotateTreap.find(10));
    // console.log(rotateTreap.find(1));
    // console.log(rotateTreap.find(7));

    // remove
    // console.log(rotateTreap.remove(1));
    // console.log(rotateTreap.find(1));

    // 获取排名
    console.log(rotateTreap.getRank(1));
    // console.log(rotateTreap.getRank(9));

    // 根据排名获取数值
    console.log(rotateTreap.getKth(10));
    console.log(rotateTreap.getKth(1));

    // 输出有旋treap
    console.log(rotateTreap);
}
run();
