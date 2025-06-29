// 节点
class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.count = 0; // 统计相同节点
        this.left = this.right = null;
    }
}
// 二叉树
class Tree {
    static TRAVERSE_TYPE = {
        preOrder: 'preOrder',
        inOrder: 'inOrder',
        postOrder: 'postOrder'
    }

    constructor(arr) {
        this.size = 0;
        this.root = null;
        this.buildTree(arr);
    }
    buildTree(arr) {
        arr.forEach(el => {
            this.insert(el);
        });
    }
    insert(data) {
        if (!this.root) {
            this.root = new Node(data);
            this.size++;
            return;
        }
        this.doInsert(this.root, data);
    }
    doInsert(node, data) {
        if (data === node.data) {
            node.count++;
            return;
        }
        if (data > node.data) {
            if (!node.right) {
                node.right = new Node(data);
                node.right.parent = node;
                this.size++;
                return;
            }
            this.doInsert(node.right, data);
        } else {
            if (!node.left) {
                node.left = new Node(data);
                node.left.parent = node;
                this.size++;
                return;
            }
            this.doInsert(node.left, data);
        }
    }
    // 中序遍历，非递归
    inOrder(cb) {
        const stack = [];
        let node = this.root;
        let hasRight = false;
        node && stack.push(node);
        while (stack.length) {
            while (node.left) { // 对当前节点首先做的事就是把左侧遍历完
                stack.push(node.left);
                node = node.left;
            }
            hasRight = false;
            // 当前节点无左侧节点
            while (stack.length && !hasRight) {
                node = stack.pop(); // 处理当前节点
                cb(node);
                if (node.right) { // 处理当前节点的右节点
                    stack.push(node.right);
                    hasRight = true;
                    node = node.right; // 更换当前节点的指向
                }
            }
        }
    }
    // 前序遍历，非递归
    preOrder(cb) {
        const stack = [];
        let node = this.root;
        node && stack.push(node);
        while (stack.length) {
            node = stack.pop(); // 直接弹出当前根节点
            cb(node);
            if (node.right) {
                stack.push(node.right); // 先入后出
            }
            if (node.left) {
                stack.push(node.left);
            }
        }
    }
    // 后序遍历，非递归
    postOrder(cb) {
        const stack = [];
        let node = this.root;
        let visited = false;
        node && stack.push(node);
        while (stack.length) {
            node = stack[stack.length - 1]; // 未pop出，仅读取，当前节点的优先级相对于子节点是最低的
            if (!node.left && !node.right
                || (visited && (visited === node.left || visited === node.right))
            ) {
                // 无子节点或已访问完子节点
                node = stack.pop();
                cb(node);
                visited = node;
            } else {
                // 继续存入节点
                if (node.right) {
                    stack.push(node.right);
                }
                if (node.left) {
                    stack.push(node.left);
                }
            }
        }
    }
    find(data) {
        if (!this.root) {
            return;
        }
        return this.doSearch(data, this.root);
    }
    doSearch(data, node) {
        if (data === node.data) {
            return node;
        }
        if (data > node.data && node.right) {
            return this.doSearch(data, node.right);
        }
        if (data < node.data && node.left) {
            return this.doSearch(data, node.left);
        }
    }
    update(data, newVal) {
        // 涉及到树中节点的动态转换: todo
        // const node = this.find(data);
        // node && (node.data = newVal);
    }
    remove(data) {
        let node = this.root;
        if (!node) {
            return;
        }
        if (data === node.data) {
            this.root = null;
            this.size = 0;
            return;
        }
        node = this.find(data);
        this.doRemove(node, data);
    }
    // 删除非根节点
    doRemove(node, data) {
        let { left, right } = node;
        const isLeft = node.parent?.left === node;
        if (!left && !right) {
            // 当前为叶子节点
            if (isLeft) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
        } else if (!left) {
            // 仅有右孩子
            if (isLeft) {
                node.parent.left = right;
            } else {
                node.parent.right = right;
            }
            right.parent = node.parent;
        } else if (!right) {
            // 仅有左孩子
            if (isLeft) {
                node.parent.left = left;
            } else {
                node.parent.right = left;
            }
            left.parent = node.parent;
        } else {
            // 有双子节点(剪枝)

            let point = left;
            // 找到当前节点的左孩子的最右侧孩子
            while (point.right) {
                point = point.right;
            }

            if (isLeft) {
                node.parent.left = left;
                left.parent = node.parent;
                point.right = right;
                right.parent = point;
            } else {
                node.parent.right = left;
                left.parent = node.parent;
                point.right = right;
                right.parent = point;
            }
        }
    }
    // 广度优先遍历
    levelOrder(cb) {
        const queue = [];
        let node = this.root;
        node && queue.push(node);
        while (queue.length) {
            node = queue.shift();
            cb(node);
            const { left, right } = node;
            if (left) {
                queue.push(left);
            }
            if (right) {
                queue.push(right);
            }
        }
    }
    // 获取当前节点的前驱节点
    frontNode(data) {
        const node = this.find(data);
        // 1: 左子树中的最大的
        if (node.left) {
            let target = node.left;
            while (target.right) {
                target = target.right;
            }
            return target;
        }
        // 2: 顺着左边的父亲往上找，直到出现右边往上的父亲路线
        let p = node;
        while (p.parent?.left === p) {
            p = p.parent;
        }
        return p.parent;
    }
    // 获取当前节点的后继节点
    backNode(data) {
        const node = this.find(data);
        // 1: 右子树中最小的
        if (node.right) {
            let target = node.right;
            while (target.left) {
                target = target.left;
            }
            return target;
        }
        // 2: 顺着右边的父亲往上找，直到出现左边往上的父亲路线
        let p = node;
        while (p.parent?.right === p) {
            p = p.parent;
        }
        return p.parent;
    }
    // 二叉树的递归遍历
    traverse(cb, type) {
        const node = this.root;
        if (!node) {
            return;
        }
        this.doTraverse(node, cb, type);
    }
    doTraverse(node, cb, type) {
        if (node) {
            switch (type) {
                case Tree.TRAVERSE_TYPE.preOrder:
                    cb(node);
                    this.doTraverse(node.left, cb, type);
                    this.doTraverse(node.right, cb, type);
                    break;
                case Tree.TRAVERSE_TYPE.inOrder:
                    this.doTraverse(node.left, cb, type);
                    cb(node);
                    this.doTraverse(node.right, cb, type);
                    break;
                case Tree.TRAVERSE_TYPE.postOrder:
                    this.doTraverse(node.left, cb, type);
                    this.doTraverse(node.right, cb, type);
                    cb(node);
                    break;
                default:
                    break;
            }
        }
    }
    // 第k大的节点
    kthNode(k) {
        k = this.size - (k-1);
        let index = 0;
        let target = null;
        const cb = node => {
            index++;
            if (index === k) {
                target = node;
                return true;
            }
        }
        function find(node, cb) {
            if (!node) return;
            find(node.left, cb);
            if (cb(node)) {
                return;
            }
            find(node.right, cb);
        }
        find(this.root, cb);
        return target;
    }
}

function treeTest() {
    const arr = [11, 9, 4, 6, 5, 10, 15, 13, 12, 14, 16, 17];
    const tree = new Tree(arr);
    const cb = item => {
        console.log(item.data);
    }


    // 3种遍历时序（深度优先，非递归）
    tree.inOrder(cb);
    // tree.preOrder(cb);
    // tree.postOrder(cb);

    // 获取第k大的节点
    console.log('--> ', tree.kthNode(4).data);

    // 删除某些元素
    // tree.remove(9);
    // tree.remove(15);
    // tree.remove(6);
    // tree.remove(4);
    // tree.remove(11);

    // 查找指定节点
    // console.log(tree.find(6));
    // console.log(tree.find(1));
    // console.log(tree.find(11));
    // console.log(tree.find(4));
    // console.log(tree.find(10));

    // 查找前驱节点
    // console.log(tree.frontNode(9));
    // console.log(tree.frontNode(12));
    // console.log(tree.frontNode(17));

    // 查找后继节点
    // console.log(tree.backNode(4));
    // console.log(tree.backNode(12));
    // console.log(tree.backNode(14));

    // 递归遍历
    // tree.traverse(cb, Tree.TRAVERSE_TYPE.inOrder);
    // tree.traverse(cb, Tree.TRAVERSE_TYPE.preOrder);
    // tree.traverse(cb, Tree.TRAVERSE_TYPE.postOrder);
}
treeTest();
