class Node {
    constructor(val) {
        this.val = val;
        this.endCount = 0;
        this.children = {};
        this.fail = null;
    }
}
class Ac {
    constructor(patterns) {
        this.patterns = patterns;
        this.root = new Node(null);
        this.init();
    }
    init() {
        this.patterns.forEach(p => {
            this.buildTrie(p);
        });
        this.addFail();
    }
    buildTrie(pattern) { // 构建前缀树
        const n = pattern.length;
        let char = '';
        let node = null;
        let cur = this.root;
        for (let i = 0; i < n; i++) {
            char = pattern[i];
            node = cur.children[char];
            if (!node) {
                node = new Node(char);
                cur.children[char] = node;
            }
            cur = node;
        }
        cur.pattern = pattern;
        cur.endCount++;
    }
    addFail() { // 添加fail指针关系
        const queue = [this.root]; // 广度优先遍历，为前缀树的所有节点添加fail指针
        while (queue.length) {
            let node = queue.shift();
            for (let key in node.children) {
                let child = node.children[key];
                if (node === this.root) { // 第一层的fail均为root
                    child.fail = this.root;
                } else {
                    let p = node.fail;
                    while (p) {
                        if (p.children[key]) {
                            child.fail = p.children[key]; // 跳转到另外分支
                            break;
                        }
                        p = p.fail; // 继续发掘和建立横向的跳转关系
                    }
                    if (!p) {
                        child.fail = this.root;
                    }
                }
                queue.push(child); // 子节点入队
            }
        }
    }
    match(text) {
        const ret = [];
        const root = this.root;
        let p = root;
        let c = '';
        let node = null;
        let unique = {};
        for (let i = 0; i < text.length; i++) {
            c = text[i];
            if (!p.children[c] && p !== root) { // 失配，fail指针发挥作用，横向分支跳转继续搜索
                p = p.fail;
            }
            p = p.children[c];
            if (!p) {
                p = root; // 未找寻到，从root重新开始找
            }
            node = p; // 检验当前查找结果，并保留p的当前引用
            while (node !== root) {
                if (node.endCount) { // 找到匹配的pattern
                    console.log(`找到匹配的模式 ${node.pattern} 索引位置为 ${i - node.pattern.length + 1}`);
                    if (!unique[node.pattern]) {
                        unique[node.pattern] = 1;
                        ret.push(node.pattern); // 记录匹配的pattern
                    }
                }
                node = node.fail; // 继续横向找寻
            }
        }
        return ret;
    }
}
function run() {
    const patterns = ['she', 'shr', 'say', 'he', 'her'];
    const text = 'one day she say her has eaten many shrimps';

    const ac = new Ac(patterns);
    ac.match(text);

    // 输出ac自动机
    console.log(ac);
}
run();
