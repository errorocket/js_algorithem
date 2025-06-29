// 定义节点
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.pre = null;
    }
}
// 定义链表
class List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    insert(data) {
        const node = new Node(data);
        this.length++;
        // 首个
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            return;
        }
        // 其余
        let cur = this.head;
        while(cur) {
            if (cur.data >= data) {
                break;
            }
            cur = cur.next;
        }
        if (cur) {
            switch(cur) {
                case this.head:
                    node.next = this.head;
                    this.head.pre = node;
                    this.head = node;
                    break;
                case this.tail:
                    this.tail.pre.next = node;
                    node.pre = this.tail.pre;
                    node.next = this.tail;
                    this.tail.pre = node;
                    break;
                default:
                    cur.pre.next = node;
                    node.pre = cur.pre;
                    node.next = cur;
                    cur.pre = node;
                    break;
            }
            return;
        }
        // 待插入的元素是最大的
        this.tail.next = node;
        node.pre = this.tail;
        this.tail = node;
    }
    find(index) {
        if (index >= 1 && index <= this.length) {
            let node = this.head;
            index--;
            while(index) {
                node = node.next;
                index--;
            }
            return node;
        }
    }
    remove(index) {
        if (index >= 1 && index <= this.length) {
            let cur = this.head;
            while(--index) {
                cur = cur.next;
            }
            this.length--;
            // 列表仅一个元素
            if (!this.length) {
                this.head = this.tail = cur = null;
                return;
            }
            switch(cur) {
                case this.head:
                    // 移除首位
                    this.head = cur.next;
                    cur.next.pre = null;
                    cur.next = null;
                    cur = null;
                    break;
                case this.tail:
                    // 移除末尾
                    this.tail = cur.pre;
                    cur.pre.next = null;
                    cur.pre = null;
                    cur = null;
                    break;
                default:
                    // 移除中间元素
                    cur.pre.next = cur.next;
                    cur.next.pre = cur.pre;
                    cur.next = cur.pre = null;
                    cur = null;
                    break;
            }
        }
    }
    update(index, data) {
        const node = this.find(index);
        const preNode = node.pre;
        const nextNode = node.next;
        // 是否需要动态调整被修改节点在链表中的位置
        let noChange = false;
        if (preNode && nextNode) {
            noChange = preNode.data <= data && data <= nextNode.data;
            // 有前后元素，并且元素的修改导致了原顺序被破坏
            if (!noChange) {
                // 摘除被修改节点
                node.pre.next = node.next;
                node.next.pre = node.pre;
                node.next = node.pre = null;
                this.length--;
                // 将新值重新插入链表
                this.insert(data);
                return;
            }
            // 修改对链表的整体有序性无影响
            node.data = data;
        } else if (!preNode && !nextNode){
            // 无前后节点，直接修改
            node.data = data;
        } else if (!preNode) {
            // 无前节点但有后节点，即：修改的是头节点
            noChange = data <= nextNode.data;
            // 影响顺序
            if (!noChange) {
                this.head = node.next;
                this.head.pre = null;
                node.next = null;
                this.length--;
                this.insert(data);
                return;
            }
            // 不影响顺序
            node.data = data;
        } else {
            // 无后节点，但有前节点，即：修改的是尾部节点
            noChange = data >= preNode.data;
            // 影响顺序
            if (!noChange) {
                this.tail = node.pre;
                this.tail.next = null;
                node.pre = null;
                this.length--;
                this.insert(data);
                return;
            }
            // 不影响顺序
            node.data = data;
        }
    }
    getSize() {
        return this.length;
    }
    clear() {
        this.length = 0;
        this.head = this.tail = null;
    }
}
const list = new List();
list.insert(12);
// list.insert(11);
// list.insert(13);
// list.insert(10);
// list.insert(14);
// list.remove(1);
// list.remove(1);
list.update(1, 15);
console.log(list);
console.log(list.getSize());
