const {swap, run} = require('../utils');

// 基本冒泡
function bubbleSort1(arr) {
    const n = arr.length;
    for(let i = 1; i < n; i++) {
        for(let j = 0; j < n - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}

// 优化1: 新增终止判定条件
function bubbleSort2(arr) {
    const n = arr.length;
    let hasSort = false;
    for(let i = 1; i < n; i++) {
        hasSort = false;
        for(let j = 0; j < n - i; j++){
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                hasSort = true;
            }
        }
        if (!hasSort) {
            break;
        }
    }
}

// 优化2: 动态修改内部循环的边界值
function bubbleSort3(arr) {
    const n = arr.length;
    let borderCheckIndex = n - 1;
    let newBorder = 0;
    for(let i = 1; i < n; i++) {
        hasSort = false;
        for(let j = 0; j < borderCheckIndex; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                hasSort = true;

                // 保存新的检测边界
                newBorder = j;
            }
        }
        if(!hasSort) {
            break;
        }
        borderCheckIndex = newBorder;
    }
}

// 优化3：鸡尾酒冒泡
function bubbleSort4(arr) {
    let left = 0;
    let right = arr.length - 1;
    let index = 0;

    while(right > left) {
        let hasSort = false;

        // 向右侧查询
        for(let i = 0; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                hasSort = true;

                // 记录发生交换的下标
                index = i;
            }
        }
        right = index;

        // 向左侧查询
        for(let i = right; i > left; i--) {
            if (arr[i] < arr[i - 1]) {
                swap(arr, i, i - 1);
                hasSort = true;
                index = i;
            }
        }
        left = index;

        if(!hasSort) {
            break;
        }
    }
}

run({sortFunc:bubbleSort1,dataSize:100000});
run({sortFunc:bubbleSort2,dataSize:100000});
run({sortFunc:bubbleSort3,dataSize:100000});
run({sortFunc:bubbleSort4,dataSize:100000});
