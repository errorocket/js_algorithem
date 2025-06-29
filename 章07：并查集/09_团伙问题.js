function getGangs(n, metrix) {
    const size = n;
    const unionFind = new UnionFind(size);
    const enemy = new Array(size).fill(0);
    for (let i = 0; i < metrix.length; i++) {
        const [type, a, b] = metrix[i];
        if (type === 'F') {
            unionFind.merge(a, b);
        } else {
            if (enemy[a] === 0) {
                enemy[a] = unionFind.query(b);
            } else {
                unionFind.merge(enemy[a], b);
            }
            if (enemy[b] === 0) {
                enemy[b] = unionFind.query(a);
            } else {
                unionFind.merge(enemy[b], a);
            }
        }
    }
    return unionFind.getGroupNum();
}
function run() {
    const metrix1 = [
        ['E', 1, 4],
        ['F', 3, 5],
        ['F', 4, 5],
        ['E', 1, 2]
    ];
    const metrix2 = [
        ['F', 0, 1],
        ['F', 1, 2],
        ['F', 2, 3],
        ['F', 3, 4],
        ['F', 4, 5],
    ];
    console.log(getGangs(6, metrix1));
    console.log(getGangs(6, metrix2));
}
run();
