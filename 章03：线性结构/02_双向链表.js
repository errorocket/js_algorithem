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
        // 首个
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            this.length++;
            return;
        }
        // 其余
        this.tail.next = node;
        node.pre = this.tail;
        this.tail = node;
        this.length++;
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
        if (node) {
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
list.insert(10);
list.insert(11);
list.insert(12);
list.insert(13);
list.insert(14);
// console.log(list);
// console.log(list.getSize());
list.remove(1);
list.remove(1);
// list.remove(1);
// list.remove(1);
// list.remove(1);
// console.log(list);
// console.log(list.getSize());
list.update(1, 9);
console.log(list);
console.log(list.getSize());
