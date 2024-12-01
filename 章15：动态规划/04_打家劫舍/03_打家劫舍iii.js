/**
小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
除了 root 之外，每栋房子有且只有一个“父“房子与之相连。
一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
 */

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class RobTree {
    constructor(nodes) {
        this.root = null;
        this.build(nodes);
    }
    build(nodes) { // 由二叉树的BFS构建二叉树
        let cur = null;
        const queue = [this.root];
        while(nodes.length) {
            cur = queue.shift();
            if (cur === null) {
                this.root = new Node(nodes.shift());
                cur = this.root;
            }
            const left = new Node(nodes.shift() || null);
            const right = new Node (nodes.shift() || null);
            cur.left = left;
            cur.right = right;
            queue.push(left);
            queue.push(right);
        }
    }
}

function robTree(nodes) {
    const tree = new RobTree(nodes);
    /**
     * dp[0]: 不偷当前节点时可获得的最大总金额
     * dp[1]: 偷当前节点时可获得的最大总金额
     */
    function getMaxVal(node) {
        if (!node) { // 递归终止条件
            return [0, 0];
        }
        const leftDp = getMaxVal(node.left);
        const rightDp = getMaxVal(node.right);

        const val1 = Math.max(leftDp[0], leftDp[1]) + Math.max(rightDp[0], rightDp[1]); // 不偷当前节点
        const val2 = node.val + leftDp[0] + rightDp[0] // 偷当前节点
        return [val1, val2];
    }
    const [val1, val2] = getMaxVal(tree.root);
    return Math.max(val1, val2);
}
function run() {
    console.log(robTree([3,2,3,null,3,null,1]));
    console.log(robTree([3,4,5,1,3,null,1]));
}
run();