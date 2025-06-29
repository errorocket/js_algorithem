// 未做冲突处理
class SimpleHash {
    constructor() {
        this.initSize = 1000;
        this.table = new Array(this.initSize);
    }
    hash(key) {
        key += '';
        const n = key.length;
        let codeVal = 0;
        // 某种散列算法
        for(let i = 0; i < n; i++) {
            codeVal += key.charCodeAt(i);
        }
        codeVal = Math.pow(codeVal, 2) + '';
        const mid = codeVal.length / 2;
        codeVal = codeVal.charAt(mid - 1) * 10 + codeVal.charAt(mid) * 1;
        return codeVal;
    }
    insert(key, val) {
        const index = this.hash(key);
        this.table[index] = {
            key,
            val
        }
    }
    get(key) {
        const index = this.hash(key);
        return this.table[index] || {}
    }
    forEach() {
        const n = this.table.length;
        let node = '';
        for(let i = 0; i < n; i++) {
            node = this.table[i];
            if (node) {
                console.log(this.table[i]);
            }
        }
    }
}
// 测试：SimpleHash
function simpleHashTest() {
    const map = new SimpleHash();
    map.insert('wangxun', 'happy');
    console.log(map);
    console.log(map.get('wangxun'));
    map.forEach();
}
// 开散列节点
class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.next = null;
    }
}
// 开散列
class OpenHash {
    constructor() {
        this.capacity = 100;
        this.table = new Array(this.capacity);
    }
    hash(key) {
        key += '';
        let val = 0;
        const seed = 31;
        for(let i = 0; i < key.length; i++) {
            // val = key[i].charCodeAt() + val * seed;
            val += key[i].charCodeAt();
        }
        return val % this.capacity; // 约束散列长度
    }
    get(key) {
        const index = this.hash(key);
        let node = this.table[index];
        while(node) {
            if (node.key === key + '') {
                return node;
            }
            node = node.next;
        }
    }
    insert(key, val) {
        const index = this.hash(key);
        let oldNode = this.table[index];
        if (!oldNode) {
            this.table[index] = new Node(key, val);
            return;
        }
        const head = oldNode;
        while(oldNode) {
            if (oldNode.key === key + '') {
                // key相同, update旧值
                oldNode.val = val;
                return;
            }
            oldNode = oldNode.next;
        }
        // 将新节点挂在开链表的第一个元素上
        const newNode = new Node(key, val);
        this.table[index] = newNode;
        newNode.next = head;
    }
    remove(key) {
        const index = this.hash(key);
        let oldNode = this.table[index];
        while(oldNode) {
            if (oldNode.key === key + '') {
                oldNode.val = null;
                return;
            }
            oldNode = oldNode.next();
        }
    }
}
// 测试：OpenHash
function openHashTest() {
    const openHash = new OpenHash();
    openHash.insert('nefu', '东北林业');
    openHash.insert('student', '学生');
    openHash.insert('name', 'wangxun');
    openHash.insert('anem', 'HAPPY');
    openHash.insert('anen', 'HAPPY');
    openHash.insert('enen', 'HAPPY');
    console.log(openHash.get('nefy'));
    console.log(openHash.get('nefu'));
    openHash.remove('anem');
    openHash.remove('anen');
    openHash.remove('enen');
    openHash.insert('nefu', '林大');
    openHash.insert('k101', 'keep on');
    openHash.insert('101k', 'keep on');
    openHash.insert('phone', 'apple');
    openHash.insert('we have', 'orange');
    console.log(openHash);
}
openHashTest();
