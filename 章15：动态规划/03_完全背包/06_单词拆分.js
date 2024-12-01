/**
    给你一个字符串 s 和一个字符串列表 wordDict 作为字典
    如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
    注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 */
function splitWord(s, wordDict) {
    /**
     * 1.dp[i]含义：当字符串长度为i时，能否用wordDict中的单词表示
     *  若能：dp[i] === true 反之：dp[i] === false
     * 2.递推公式
     * ----part1----j----part2---i-------
     * j < i
     * dp[j] === true && (i - j)段的字符串可以由wordDict中的单词表示
     * 3.初始化
     * dp[0] = true 使得递推公式可以继续
     * 其余均为false，如果新拓展的字符可以由wordDict中的字符表示，再将dp[i]修改为true
     * 4.遍历顺序：需要严格限制物品的放置顺序，需要求排列数 (先遍历背包 再遍历物品)
     */
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    for(let i = 1; i  <= s.length; i++) { // 背包
        console.log(`第 ${i} 轮`);
        for(let j = 0; j < i; j++) {
            const moreStr = s.substr(j, i - j);
            console.log('moreStr --> ', moreStr);
            if (dp[j] && wordDict.includes(moreStr)) {
                dp[i] = true;
            }
        }
    }
    return dp[s.length];
}
function run() {
    console.log(splitWord("leetcode", ["leet", "code"]));
    // console.log(splitWord("applepenapple", ["apple", "pen"]));
    // console.log(splitWord("catsandog", ["cats", "dog", "sand", "and", "cat"]));
}
run();