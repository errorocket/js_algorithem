function accountsMerge(accounts) {
    const size = accounts.length;
    const unionFind = new UnionFind(size);
    const owners = {};
    let account = null;
    // 合并组
    for (let i = 0; i < size; i++) {
        account = accounts[i];
        for (let j = 1; j < account.length; j++) { // emails
            const email = account[j];
            const index = owners[email];
            if (index === undefined) { // 编号可为0，需指明undefined
                owners[email] = i;
            } else {
                unionFind.merge(i, index);
            }
        }
    }
    // 收集每组对应的所有邮箱(需去重)
    const data = {};
    const ret = [];
    for (let i = 0; i < size; i++) {
        const index = unionFind.query(i); // 真实的组编号
        account = accounts[i];
        if (!data[index]) {
            data[index] = new Set(); // 存储当前组的所有email
        }
        for (let j = 1; j < account.length; j++) {
            data[index].add(account[j]);
        }
    }
    // 整理数据并添加账户名
    Object.keys(data).forEach(key => {
        const index = +key;
        const accountName = accounts[index][0];
        const accountItem = [];
        accountItem.push(accountName);
        data[key].forEach(email => {
            accountItem.push(email);
        });
        ret.push(accountItem);
    });
    return ret;
}
function run() {
    const accounts1 = [
        ['John', 'johnsmith@mail.com', 'john00@mail.com'],
        ['John', 'johnnybravo@mail.com'],
        ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
        ['Mary', 'mary@mail.com'],
        ['John', 'johnnybravo@mail.com', 'johnishappy@mail.com']
    ];
    const accounts2 = [
        ['John', 'johnsmith@mail.com', 'john00@mail.com'],
        ['John', 'johnnybravo@mail.com'],
        ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
        ['Mary', 'mary@mail.com'],
        ['John', 'johnnybravo@mail.com', 'johnishappy@mail.com'],
        ['John', 'johnlikecoding@mail.com']
    ];
    console.log(accountsMerge(accounts1));
    console.log(accountsMerge(accounts2));
}
run();
