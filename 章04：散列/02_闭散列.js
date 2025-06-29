// 闭散列节点
class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.state = true; // 标识数据节点是否被删除
    }
}
// 闭散列：二次探测法
class Hash {
    constructor() {
        this.table = [];
        this.capacity = 100;
        this.length = 0;
    }
    hash(key) {
        key += '';
        let val = 0;
        const seed = 31;
        for(let i = 0; i < key.length; i++) {
            // val = key[i].charCodeAt() + val * seed;
            val = key[i].charCodeAt();
        }
        return val & 0x7fffffff;
    }
    getHash(key) {
        return this.hash(key) % this.capacity;  // 约束散列数组的长度
    }
    insert(key, val) {
        let inserted = false;
        const index = this.find(key, node => {
            console.log('相同key, 更新val, node --> ', node);
            // key相同，update val
            node.val = val;
            inserted = node.state = true;
            if (!node.state) {
                this.length++;
            }
        });
        if (!inserted) {
            // 新插入的节点
            this.table[index] = new Node(key, val);
            this.length++;
        }
        const needExpand = (this.length / this.capacity) * 10 > 6; // 填充因子，判断是否需要扩容
        if (needExpand) {
            this.capacity *= 2;
        }
        return true;
    }
    find(key, cb) {
        let index = this.getHash(key);
        let node = this.table[index];
        let i = 1;
        while(node) {
            if (node.key === key + '') {
                cb(node);
                return index;
            }
            index = index + 2 * i - 1; // 二次探测的策略
            index = index % this.capacity;
            node = this.table[index]; // 寻找新的空白节点
            i++;
            console.log('发生二次探测---');
        }
        return index;
    }
    get(key) {
        let val = null;
        this.find(key, node => {
            if (node.state) {
                val = node;
            }
        });
        return val;
    }
    remove(key) {
        const oldSize = this.length;
        let needReduce = false;
        this.find(key, node => {
            node.state = false;
            this.length--;
            needReduce = (this.length / this.capacity) * 10 < 6; // 是否需要减少空间容量
            if (needReduce) {
                this.capacity /= 2;
            }
        });
        return oldSize !== this.length
    }
    size() {
        return this.length;
    }
}
// 测试：闭散列
function hashTest() {
    const hash = new Hash();
    hash.insert('nefu', '东北林业');
    hash.insert('student', '学生');
    hash.insert('k101', 'keep on');
    hash.insert('k101', 'keeping on');
    console.log(hash.get('student'));
    hash.insert('studnet', '新的学生值');
    console.log(hash);
}

// 散列的应用一：数组去重
function noRepeat(arr) {
    const map = {};
    let key = '';
    for(let i = 0; i < arr.length; i++) {
        key = '.' + arr[i];
        map[key] = arr[i];
    }
    const res = [];
    Object.keys(map).forEach(key => {
        res.push(map[key]);
    });
    return res;
}

// 散列的应用二：求只出现过一次的数字
function singleNum(arr) {
    const map = {};
    arr.forEach(item => {
        if (map[item]) {
            map[item].count++;
        } else {
            map[item] = {
                count: 1,
                data: item
            }
        }
    });
    const ret = [];
    Object.keys(map).forEach(key => {
        if (map[key].count === 1) {
            ret.push(map[key].data);
        }
    });
    return ret;
}

// 散列的应用三：两元素和为指定值
function twoNumSum(arr, target) {
    const map = {};
    let other = '';
    let cur = '';
    for(let i = 0; i < arr.length; i++) {
        cur = arr[i];
        if (map[cur]) {
            return [i, map[cur].index];
            break;
        }
        other = target - arr[i];
        map[other] = {
            val: cur,
            index: i
        }
    }
    return [];
}

const arr = [9, 10, 8, 7, 5, 3, 1, 2];
console.log(twoNumSum(arr, 10));
