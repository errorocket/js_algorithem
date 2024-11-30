
const {run} = require('../utils');

function insertSort(arr) {
    const n = arr.length;
    let target = 0;
    for(let i = 1; i < n; i++) {
        let j = i - 1;
        target = arr[i];
        // 寻找当前元素的插入位置
        for(j; j >= 0; j--) {
            if (target > arr[j]) {
                break;
            }
        }

        if (j !== i - 1) {
            // 比target大的元素依次后移一位
            for(let k = i - 1; k > j; k--) {
                arr[k + 1] = arr[k];
            }
            arr[j + 1] = target;
        }
    }
}

// 合并内部循环
function insertSort2(arr) {
    const n = arr.length;
    let target = 0;
    for(let i = 1; i < n; i++) {
        target = arr[i];
        let j = i - 1;
        for(j; j >= 0 && arr[j] > target; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = target;
    }
}

// while
function insertSort3(arr) {
    const n = arr.length;
    let target = 0;
    let j = 0;
    for(let i = 1; i < n; i++) {
        target = arr[i];
        j = i - 1;
        while(j >= 0 && arr[j] > target) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = target;
    }
}
run({sortFunc:insertSort, dataSize:100000, showSortedArr: true});
run({sortFunc:insertSort2, dataSize:100000, showSortedArr: true});
run({sortFunc:insertSort3, dataSize:100000, showSortedArr: true});
