class Queue {
    constructor() {
        this.data = [];
        this.front = 0;
        this.end = 0; // 指向有效数据的后一位
    }
    add(el) {
        return this.data[this.end++] = el;
    }
    remove() {
        if (this.end > 0) {
            return this.data[--this.end];
        }
    }
    isEmpty() {
        return this.front === this.end;
    }
    size() {
        return this.end;
    }
    top() {
        if (!this.isEmpty()) {
            return this.data[0];
        }
    }
}

const queue = new Queue();
queue.add(1);
queue.add(2);
queue.add(3);
queue.add(4);
queue.remove();
queue.remove();
queue.remove();
// queue.remove();
console.log(queue.size());
console.log(queue.top());
console.log(queue);
console.log(queue.isEmpty());
