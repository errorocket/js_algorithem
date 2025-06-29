// 前缀树节点
class Node {
    constructor(val) {
        this.val = val;
        this.passCount = 0;
        this.endCount = 0;
        this.children = []; // key使用charCode
    }
}
// 前缀树
class Trie {
    constructor() {
        this.root = new Node(null);
    }
    // 添加字符串
    insert(word) {
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
    // 删除字符串
    remove(word) {
        return this.search(word, (cur) => {
            let charCode = '';
            if (cur.endCount) { // 没缺字符 && 是一个字符串的结尾
                cur = this.root;
                nodes.forEach(node => {
                    charCode = node.val.charCodeAt();
                    node.passCount--;
                    if (!node.passCount) {
                        delete cur.children[charCode];
                    }
                    cur = node;
                });
                cur.endCount--;
            } else {
                return false;
            }
        });
    }
    // 是否包含目标字符串，至于要求是前缀字符串还是完全相等
    // 则交给callback函数去自行处理
    search(word, cb) {
        const n = word.length;
        if (!n) return;

        let cur = this.root;
        let char = '';
        let charCode = ''
        let node = null;
        const nodes = [];
        for (let i = 0; i < n; i++) {
            char = word[i];
            charCode = word.charCodeAt(i);
            node = cur.children[charCode];
            if (!node) { // 缺少与word匹配的字符
                return false;
            }
            nodes.push(node);
            cur = node;
        }
        // 没缺字符
        return cb(cur, nodes);
    }
    // 是否包含某个字符串
    isContainWord(word) {
        return this.search(word, cur => {
            return cur.endCount > 0;
        });
    }
    // 是否包含某个前缀
    isContainPrefix(word) {
        return this.search(word, cur => {
            return cur !== this.root;
        })
    }
    // 统计字符串出现的次数
    wordCount(word) {
        return this.search(word, cur => {
            return cur.endCount;
        }) || 0;
    }
    // 统计字符串前缀出现的次数
    prefixCount(word) {
        return this.search(word, cur => {
            return cur.passCount;
        }) || 0;
    }
    // 字符串的字典序排序
    getSortedArr() {
        this.root.val = '';
        const arr = [];
        function collect(node, str, cb) {
            let nextStr = str + node.val;
            if (node.endCount) {
                cb(nextStr);
            }
            for (let i in node.children) {
                // 按照字典序取codeKey, 开启若干条起跑线
                collect(node.children[i], nextStr, cb);
            }
        }
        collect(this.root, '', nextStr => {
            arr.push(nextStr);
        });
        return arr;
    }
}
function run() {
    const trie = new Trie();
    const words = ['ruby', 'rubycon', 'older', 'oldman', 'test']

    // 添加字符串
    words.forEach(word => {
        trie.insert(word);
    });

    // 删除字符串
    // trie.remove('rubycon');
    // trie.remove('test');
    // trie.remove('oldman');

    // 是否包含某个字符串
    // console.log(trie.isContainWord('ruby'));
    // console.log(trie.isContainWord('older'));
    // console.log(trie.isContainWord('rubycon'));
    // console.log(trie.isContainWord('test'));
    // console.log(trie.isContainWord('oldman'));

    // 是否包含某个前缀
    // console.log(trie.isContainPrefix('rub'));

    // 某个字符出现的次数
    // console.log(trie.wordCount('ruby'));
    // console.log(trie.wordCount('oldman'));
    // console.log(trie.wordCount('ruby2'));

    // 某个前缀出现的次数
    // console.log(trie.prefixCount('ruby'));
    // console.log(trie.prefixCount('oldman'));
    // console.log(trie.prefixCount('ruby2'));

    // 字符串排序
    console.log(trie.getSortedArr())

    // 打印前缀树
    console.log(trie);
}
run();

