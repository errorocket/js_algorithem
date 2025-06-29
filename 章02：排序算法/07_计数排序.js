const {run} = require('../utils');

// 简单计数排序
function countSort(arr) {
    const n = arr.length;
    const counts = []
    for(let i = 0; i < n; i++) {
        let val = arr[i];
        counts[val] = counts[val] ? counts[val] + 1 : 1;
    }

    let index = 0;
    for(let i = 0; i < counts.length; i++) {
        let times = counts[i];
        while(times) {
            arr[index++] = i;
            times--;
        }
    }
}

// 计数排序优化:(非稳定排序)
function countSort2(arr) {
    const n = arr.length;
    if (n === 1) {
        return;
    }

    const max = Math.max.apply(0, arr);
    const min = Math.min.apply(0, arr);
    if (max === min) {
        return;
    }

    const size = max - min + 1;
    const bucket = new Array(size).fill(0);
    for(let i = 0; i < n; i++) {
        const val = arr[i] - min;
        bucket[val]++;
    }

    let index = 0;
    for(let i = 0; i < bucket.length; i++) {
        let time = bucket[i];
        while(time) {
            arr[index++] = i + min;
            time--;
        }
    }
}
run({sortFunc:countSort2, dataSize:100, hasNegative:true, showSortedArr: true});
