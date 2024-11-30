class Node { // 前缀树节点
    constructor(val) {
        this.val = val;
        this.passCount = 0;
        this.endCount = 0;
        this.children = []; // key使用charCode
    }
}
class Trie { // 前缀树
    constructor() {
        this.root = new Node(null);
    }
    insert(word) { // 添加字符串
        const n = word.length;
        if (!n) return;

        let cur = this.root;
        let char = '';
        let charCode = '';
        let node = null;
        for (let i = 0; i < n; i++) {
            char = word[i];
            charCode = word.charCodeAt(i);
            if (!cur.children[charCode]) {
                cur.children[charCode] = new Node(char);
            }
            cur = cur.children[charCode];
            cur.passCount++;
        }
        cur.endCount++;
    }
    getSortedArr() { // 字符串的字典序排序(前提：完成前缀树的建立即可)
        this.root.val = '';
        const arr = [];
        function collect(node, str, cb) {
            let nextStr = str + node.val;
            if (node.endCount) {
                for (let i = 0; i < node.endCount; i++) {
                    cb(nextStr); // 收集重复的元素
                }
            }
            for (let i in node.children) {
                collect(node.children[i], nextStr, cb); // 按照字典序取codeKey, 开启若干条起跑线
            }
        }
        collect(this.root, '', nextStr => {
            arr.push(nextStr);
        });
        return arr;
    }
    // 最长公共前缀
    getLongestSamePrefix() {
        let cur = this.root;
        let lsp = '';
        let wordCount = 0;
        while (true) {
            let counts = 0;
            let kids = cur.children;
            let key = null;
            for (let i in kids) {
                if (kids.hasOwnProperty(i)) {
                    key = i;
                    counts++;
                }
            }
            if (counts === 1) { // 各字符串是否分叉
                cur = kids[key];
                if (!wordCount) {
                    wordCount = cur.passCount; // 只统计一次, 体现字符串的纵向差异
                }
                if (wordCount === cur.passCount) {
                    lsp += cur.val;
                } else {
                    // 各字符串的公共部分结束
                    break;
                }
            } else {
                break;
            }
        }
        return lsp;
    }
}
function run() {
    const trie = new Trie();
    // const words = ['ruby', 'rubycon', 'older', 'oldman', 'test', 'a', 'older', 'a']
    const words = ['abcdef', 'abcdeh', 'abcd', 'abcd']

    // 添加字符串
    words.forEach(word => {
        trie.insert(word);
    });

    // 字符串排序
    // console.log(trie.getSortedArr());

    // 最长公共前缀
    console.log('最长公共前缀: ', trie.getLongestSamePrefix());

    // 打印前缀树
    console.log(trie);
}
run();
