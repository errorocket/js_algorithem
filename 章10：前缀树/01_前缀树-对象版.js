// 前缀树节点
class Node {
    constructor(val) {
        this.val = val;
        this.passCount = 0;
        this.endCount = 0;
        this.children = {};
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
        let node = null;
        for (let i = 0; i < n; i++) {
            char = word[i];
            if (!cur.children[char]) {
                cur.children[char] = new Node(char);
            }
            cur = cur.children[char];
            cur.passCount++;
        }
        cur.endCount++;
    }
    // 删除字符串
    remove(word) {
        return this.search(word, (cur) => {
            let char = '';
            if (cur.endCount) { // 没缺字符 && 是一个字符串的结尾
                cur = this.root;
                nodes.forEach(node => {
                    char = node.val;
                    node.passCount--;
                    if (!node.passCount) {
                        delete cur.children[char];
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
        let node = null;
        const nodes = [];
        for (let i = 0; i < n; i++) {
            char = word[i];
            node = cur.children[char];
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
    console.log(trie.prefixCount('ruby'));
    console.log(trie.prefixCount('oldman'));
    console.log(trie.prefixCount('ruby2'));

    // 打印前缀树
    console.log(trie);
}
run();

