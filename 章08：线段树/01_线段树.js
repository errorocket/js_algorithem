class Node {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
        this.sum = 0;
        this.max = 0;
        this.min = 0;
        this.sumTag = 0;
    }
}
class SegmentTree {
    constructor(arr) {
        this.arr = arr;
        this.size = arr.length;
        this.root = this.build(arr);
    }
    // 构建线段树
    build(arr) {
        this.arr = arr;
        return this.doBuild(0, arr.length - 1);
    }
    doBuild(start, end) {
        const node = new Node(start, end);
        if (start === end) {
            node.sum = this.arr[start];
            node.max = node.min = node.sum;
            return node;
        }
        const mid = (start + end) >> 1;
        node.left = this.doBuild(start, mid);
        node.right = this.doBuild(mid + 1, end);
        node.sum = node.left.sum + node.right.sum;
        node.max = Math.max(node.left.max, node.right.max);
        node.min = Math.min(node.left.min, node.right.min);
        return node;
    }
    // 单点查询
    query(index) {
        if (index >= 0 && index < this.size) {
            return this.doQuery(this.root, index);
        }
    }
    doQuery(node, index) {
        const { start, end, left, right } = node;
        if (start === end) {
            return node;
        }
        const mid = (start + end) >> 1;
        if (index <= mid) {
            return this.doQuery(left, index);
        }
        return this.doQuery(right, index);
    }
    // 单点修改
    update(index, delta) {
        this.doUpdate(this.root, index, delta);
    }
    doUpdate(node, index, delta) {
        const { start, end, left, right } = node;
        if (start === end && start === index) {
            // 更新当前节点的sum值
            node.sum += delta;
            this.updateMaxAndMin(node);
            return node.sum;
        }
        const mid = (start + end) >> 1;
        if (index <= mid) {
            node.sum = this.doUpdate(left, index, delta) + node.right.sum;
            this.updateMaxAndMin(node);
            return node.sum;
        } else {
            node.sum = this.doUpdate(right, index, delta) + node.left.sum;
            this.updateMaxAndMin(node);
            return node.sum;
        }
    }
    // 区间查询
    rangeQuery(p1, p2) {
        return this.doRangeQuery(this.root, p1, p2);
    }
    doRangeQuery(node, p1, p2) {
        if (!node) {
            return;
        }
        if (node.sumTag) {
            // 查询前先更新当前节点的值
            this.pushDown(node);
        }
        const { start, end, left, right, sum } = node;

        if (start === p1 && end === p2) {
            return sum;
        }
        const mid = (start + end) >> 1;
        if (p2 <= mid) {
            return this.doRangeQuery(left, p1, p2);
        } else if (p1 > mid) {
            return this.doRangeQuery(right, p1, p2)
        } else {
            return this.doRangeQuery(left, p1, mid) + this.doRangeQuery(right, mid + 1, p2);
        }
    }
    rangeMax(p1, p2) {
        return this.doRangeMax(this.root, p1, p2);
    }
    doRangeMax(node, p1, p2) {
        if (!node) {
            return;
        }
        if (node.sumTag) {
            // 查询前先更新当前节点的最值
            this.pushDown(node);
        }
        const { start, end, left, right, sum, max } = node;

        if (start === p1 && end === p2) {
            return max;
        }
        const mid = (start + end) >> 1;
        if (p2 <= mid) {
            return this.doRangeMax(left, p1, p2);
        } else if (p1 > mid) {
            return this.doRangeMax(right, p1, p2)
        } else {
            return Math.max(
                this.doRangeMax(left, p1, mid),
                this.doRangeMax(right, mid + 1, p2)
            );
        }
    }
    rangeMin(p1, p2) {
        return this.doRangeMin(this.root, p1, p2);
    }
    doRangeMin(node, p1, p2) {
        if (!node) {
            return;
        }
        if (node.sumTag) {
            // 查询前先更新当前节点的最值
            this.pushDown(node);
        }
        const { start, end, left, right, sum, min } = node;

        if (start === p1 && end === p2) {
            return min;
        }
        const mid = (start + end) >> 1;
        if (p2 <= mid) {
            return this.doRangeMin(left, p1, p2);
        } else if (p1 > mid) {
            return this.doRangeMin(right, p1, p2)
        } else {
            return Math.min(
                this.doRangeMin(left, p1, mid),
                this.doRangeMin(right, mid + 1, p2)
            );
        }
    }
    // 区间修改
    rangeUpdate(left, right, delta) {
        this.doRangeUpdate(this.root, left, right, delta);
    }
    doRangeUpdate(node, p1, p2, delta) {
        if (!node) {
            return;
        }
        if (node.sumTag) {
            this.pushDown(node);
        }
        const { start, end, left, right } = node;
        if (start === p1 && end === p2) {
            node.sumTag += delta;
            node.max += delta;
            node.min += delta;
            return node.sum += (end - start + 1) * delta;
        }
        const mid = (start + end) >> 1;
        if (p2 <= mid) {
            // 递归返回更新后的node.sum是为了及时更新父节点的sum值
            return node.sum = (this.doRangeUpdate(left, p1, p2, delta) + node.right.sum);
        } else if (p1 > mid) {
            return node.sum = (this.doRangeUpdate(right, p1, p2, delta) + node.left.sum);
        } else {
            return node.sum = (this.doRangeUpdate(left, p1, mid, delta) + this.doRangeUpdate(right, mid + 1, p2, delta));
        }
    }
    pushDown(node) {
        const { left, right, sumTag } = node;
        if (left) {
            const { start, end } = left;
            left.sumTag += sumTag;
            left.sum += (end - start + 1) * sumTag;
            left.max += sumTag;
            left.min += sumTag;
        }
        if (right) {
            const { start, end } = right;
            right.sumTag += sumTag;
            right.sum += (end - start + 1) * sumTag;
            right.max += sumTag;
            right.min += sumTag;
        }
        node.sumTag = 0;
    }
    updateMaxAndMin(node) {
        const { left, right, sum } = node;
        node.max = Math.max(left?.max || sum, right?.max || sum);
        node.min = Math.min(left?.min || sum, right?.min || sum);
    }
}
function run() {
    const arr = [1, 2, 9, 8, 4, 3, 2, 7, 5];
    // 构建线段树
    const segmentTree = new SegmentTree(arr);

    // 单点更新
    // segmentTree.update(4, 1);

    // 单点查询
    // console.log(segmentTree.query(4));

    // 范围查询
    // console.log(segmentTree.rangeQuery(0, 8));

    // 范围修改
    // segmentTree.rangeUpdate(0, 8, -1);
    // console.log(segmentTree.rangeQuery(0, 8));

    // 范围最大值
    // console.log(segmentTree.rangeMax(3, 8));

    // 范围最小值
    console.log(segmentTree.rangeMin(3, 5));

    // 输出线段树
    console.log(segmentTree);
}
run();
