class Node {
    constructor(val, level) {
        this.val = val;
        this.level = level;
        this.next = null;
        this.down = null;
    }
}
class SkipList {
    constructor(maxLevel) {
        this.maxLevel = maxLevel || 4;
        this.init();
    }
    init() {
        const heads = [];
        let downNode = null;
        let node = null;
        for (let i = 0; i <= this.maxLevel; i++) {
            node = new Node(-Infinity, i);
            heads.push(node);
            if (downNode) {
                node.down = downNode;
            }
            downNode = node;
        }
        this.heads = heads;
    }
    // 插入节点
    insert(val) {
        let level = this.randomLevel();
        let node = this.heads[level];
        let newNode = null;
        let upNode = null;
        let next = null;
        while (true) {
            if (node.val === val) {
                break;
            }
            if (node.next && node.next.val <= val) { // 继续向右找
                node = node.next;
                continue;
            }
            if (!node.next || node.next.val > val) { // 右侧无节点or右侧节点比val大
                next = node.next;
                newNode = new Node(val, level);
                newNode.next = next;
                node.next = newNode;
                if (upNode) {
                    upNode.down = newNode; // 修建楼梯捷径
                }
                upNode = newNode; // 记录新节点的位置
                level--;
                node = node.down || this.heads[level]; // 优先走捷径
                if (node) {
                    continue;
                } else {
                    break;
                }
            }
        }
    }
    // 查找节点
    find(val) {
        let node = this.heads[this.maxLevel];
        while (true) {
            if (node.val === val) {
                return true;
            }
            if (node.next && node.next.val <= val) {
                node = node.next; // 继续向右找
                continue;
            }
            node = node.down; // 以node为起点在下层接着找
            if (node) {
                continue;
            }
            return false;
        }
    }
    // 移除节点
    remove(val) {
        let node = this.heads[this.maxLevel];
        let pre = node;
        while (true) {
            if (node.val === val) {
                pre.next = node.next; // 移除当前层
                node.next = null;
                node = pre.down || this.heads[node.level - 1]; // 如果还存在下一层
                if (!node) {
                    break;
                }
            }
            if (node.next && node.next.val <= val) { // 继续向右找
                pre = node;
                node = pre.next;
                continue;
            }
            node = node.down;
            if (node) {
                continue;
            }
            break;
        }
    }
    getSortedArr() {
        const res = [];
        let node = this.heads[0];
        while (node.next) {
            node = node.next;
            res.push(node.val);
        }
        return res;
    }
    randomLevel() {
        return Math.floor(Math.random() * (this.maxLevel + 1)); // [0, maxLevel]
    }
}
function run() {
    const skipList = new SkipList(2);

    // 插入元素
    skipList.insert(1);
    skipList.insert(6);
    skipList.insert(2);
    skipList.insert(8);
    skipList.insert(9);
    skipList.insert(7);

    // 查找元素
    // console.log(skipList.find(2));

    // 删除元素
    // skipList.remove(2);
    // console.log(skipList.find(2));

    // 获取排序好的数组
    console.log(skipList.getSortedArr());

    // 打印跳表
    console.log(skipList);
}
run();
