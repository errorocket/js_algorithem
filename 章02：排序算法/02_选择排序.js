const {swap, run} = require('../utils');

// 选择排序
function selectSort(arr) {
    const n = arr.length;
    for(let i = 0; i < n - 1; i++) {
        for(let j = i + 1; j < n; j++) {
            if (arr[j] < arr[i]) {
                swap(arr, j, i);
            }
        }
    }
}

// 双向选择排序
function selectSort2(arr) {
    let left = 0;
    let right = arr.length - 1;
    let min = 0;
    let max = 0;
    while(left < right) {
        min = left;
        max = left;
        for(let i = left; i <= right; i++) {
            if(arr[i] < arr[min]) {
                min = i;
            }

            if (arr[i] > arr[max]) {
                max = i;
            }
        }
        swap(arr, left, min);
        swap(arr, right, max);
        left++;
        right--;
    }
}

run({sortFunc:selectSort, dataSize:50000, showSortedArr: false});
run({sortFunc:selectSort2, dataSize:50000, showSortedArr: false});
