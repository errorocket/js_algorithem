const {run} = require('../utils');

function mergeArr(arr1, arr2) {
    const n = arr1.length;
    const m = arr2.length;
    let newArrLastIndex = n + m - 1;
    let arr1LastIndex = n - 1;
    let arr2LastIndex = m - 1;

    //最终都存放到arr1中，往哪个数组中放否可以
    while(arr2LastIndex >= 0) {
        if (arr1LastIndex >= 0) {
            if(arr2[arr2LastIndex] >= arr1[arr1LastIndex]) {
                arr1[newArrLastIndex] = arr2[arr2LastIndex];
                newArrLastIndex--;
                arr2LastIndex--;
            } else {
                arr1[newArrLastIndex] = arr1[arr1LastIndex];
                newArrLastIndex--;
                arr1LastIndex--;
            }
        } else {
            // arr2比arr1要长
            arr1[newArrLastIndex] = arr2[arr2LastIndex];
            newArrLastIndex--;
            arr2LastIndex--;
        }
    }
    return arr1;
}

function mergeSort(arr, toMerge) {
    // 分割阶段
    if (arr.length > 1 && !toMerge) {
        const top = arr;
        const mid = arr.length >> 1;
        top.left = arr.slice(0, mid);
        top.right = arr.slice(mid);
        top.left.top = arr;
        top.right.top = arr;
        // 持续分割
        mergeSort(top.left);
        mergeSort(top.right);
    } else {
        // 合并阶段
        if (arr.top && !arr.merged) {
            const isLeft = arr === arr.top.left;
            const neighbor = isLeft ? arr.top.right : arr.top.left;
            if (neighbor.length === 1 || neighbor.sorted) {
                const tmpArr = mergeArr(arr, neighbor);
                const n = tmpArr.length;
                for(let i = 0; i < n; i++) {
                    arr.top[i] = tmpArr[i];
                }
                neighbor.merged = true;
                arr.top.sorted = true;
                // 持续合并
                mergeSort(arr.top, true);
            }
        }
    }
}
run({sortFunc:mergeSort, dataSize:100000, showSortedArr: true});
