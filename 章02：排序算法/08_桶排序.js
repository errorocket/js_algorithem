const {run} = require('../utils');

// 桶排序
function bucketSort(arr, bucketNum) {
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
    const capacity = size / bucketNum;
    const buckets = new Array(size);
    // 入桶
    for(let i = 0; i < n; i++) {
        const val = arr[i];
        // 桶编号
        const bucketIndex = Math.floor((val - min) / capacity);
        const bucket = buckets[bucketIndex];
        if (bucket) {
            // 插入排序，使组内仍然有序
            const n = bucket.length;
            let targetIndex = -1;
            for(let i = n - 1; i >= 0; i--) {
                if (val >= bucket[i]) {
                    targetIndex = i;
                    break;
                }
            }
            for(let i = n - 1; i > targetIndex; i--) {
                bucket[i + 1] = bucket[i]
            }
            bucket[targetIndex + 1] = val;
        } else {
            // 新建组
            buckets[bucketIndex] = [val];
        }
    }
    // 合并
    let index = 0;
    for(let i = 0; i < bucketNum; i++) {
        // 取出桶
        const bucket = buckets[i];
        const n = bucket.length
        // 合并桶中的数据
        for(let j = 0; j < n; j++) {
            arr[index++] = bucket[j];
        }
    }
}
run({
    sortFunc:bucketSort,
    dataSize:10000,
    hasNegative:true,
    showSortedArr: true,
    funcArgs:[20]
});
