const {run} = require('../utils');

// 希尔排序
function shellSort(arr) {
    const n = arr.length;

    // 增量数组
    const gaps = [1];
    let gap = 1;
    while(true) {
        gap = gap * 3 + 1;
        if (gap >= n) {
            break;
        }
        gaps.push(gap);
    }

    // 每个增量
    while((gap = gaps.pop())) {

        // 当前增量下的分组
        for(let g = 0; g < gap; g++) {
            let target = 0;

            //  当前分组下排序
            for(let i = g + gap; i < n; i += gap) {
                target = arr[i]; // 无序区取元素
                let j = i - gap; // 当前分组下的左侧元素
                while(j >= 0 && arr[j] > target) {
                    arr[j + gap] = arr[j];
                    j -= gap;
                }
                arr[j + gap] = target;
            }
        }
    }
}

run({sortFunc:shellSort, dataSize:100000, showSortedArr: true});
