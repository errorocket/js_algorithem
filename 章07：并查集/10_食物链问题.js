function getLies(n, metrix) {
    // 0 - n 同类
    // n - 2n 食物
    // 2n - 3n 天敌
    const size = 3 * n;
    const unionFind = new UnionFind(size);
    let counts = 0;
    for (let i = 0; i < metrix.length; i++) {
        const [type, a, b] = metrix[i];
        // 假话的第三个判断标准
        if (type === 2 && a === b) { // a吃a
            counts++;
            continue;
        }
        // 假话的第二个判断标准
        if (a >= n || b >= n) { // a或b超过标号上限
            counts++;
            continue;
        }
        // 假话的第一个判断标准（与已知真话矛盾）
        if (type === 1) { // a和b是同类
            if (unionFind.isConnected(a + n, b) || unionFind.isConnected(a + 2 * n, b)) {
                counts++;
                continue;
            }
            // a和b是同类成立
            unionFind.merge(a, b);
            unionFind.merge(a + n, b + n);
            unionFind.merge(a + 2 * n, b + 2 * n);
            continue;
        }
        if (type === 2) { // a吃b
            if (unionFind.isConnected(a, b) || unionFind.isConnected(a, b + n)) {
                counts++;
                continue;
            }
            // a吃b成立
            unionFind.merge(a + n, b);
            unionFind.merge(a, b + 2 * n);
            unionFind.merge(a + 2 * n, b + n);
        }
    }
    return counts;
}
function run() {
    const metrix1 = [
        [1, 101, 1],
        [2, 1, 2],
        [2, 2, 3],
        [2, 3, 3],
        [1, 1, 3],
        [2, 3, 1],
        [1, 5, 5]
    ]
    const metrix2 = [
        [1, 100, 1],
        [2, 1, 2],
        [2, 2, 3],
        [2, 3, 1],
        [2, 4, 3],
        [2, 3, 4],
        [1, 6, 6]
    ]
    const metrix3 = [
        [1, 100, 1],
        [2, 1, 2],
        [2, 2, 1],
        [2, 2, 3],
        [2, 3, 2],
        [2, 3, 4],
        [1, 6, 6]
    ]
    console.log(getLies(100, metrix1));
    console.log(getLies(100, metrix2));
    console.log(getLies(100, metrix3));
}
run();
