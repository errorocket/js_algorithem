// 定义节点
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
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
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            this.length++;
            return;
        }
        this.tail.next = node;
        this.tail = this.tail.next;
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
            let pre = null;
            while(--index) {
                pre = cur;
                cur = cur.next;
            }
            this.length--;
            // 移除首位
            if (!pre) {
                // 列表仅一个元素
                if (!this.length) {
                    this.head = this.tail = cur = null;
                    return;
                }
                // 列表有多个元素
                this.head = cur.next;
                cur.next = null;
                cur = null;
                return;
            }
            // 移除非首位
            pre.next = cur.next;
            cur.next = null;
            if (cur === this.tail) {
                tail = pre;
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
// list.remove(1);
// list.remove(1);
// list.remove(1);
// console.log(list);
// console.log(list.getSize());
list.update(1, 9);
console.log(list);
console.log(list.getSize());
