const {run, swap} = require('../utils');

// 左右指针法
function getMidIndex(arr, left, right) {
    const midIndex = right;
    const midVal = arr[right];
    while(left < right) {
        // 找寻大于midIndex处值的下标
        while(left < right && arr[left] <= midVal) {
            left++;
        }
        // 找寻小于midIndex处值的下标
        while(left < right && arr[right] >= midVal) {
            right--;
        }
        swap(arr, left, right);
    }
    swap(arr, left, midIndex);
    return left;
}

// 坑位法(数据分布：左小右大): 无需swap,减少耗时
function getMidIndex2(arr, left, right) {
    const midVal = arr[right];
    let midIndex = right;
    while(left < right) {
        while(left < right && arr[left] <= midVal) {
            left++;
        }
        // 不断变换的是坑位
        arr[midIndex] = arr[left];
        midIndex = left;
        while(left < right && arr[right] >= midVal) {
            right--;
        }
        arr[midIndex] = arr[right];
        midIndex = right;
    }
    arr[left] = midVal;
    return left;
}

// 坑位法(数据分布：左大右小): 无需swap,减少耗时
function getMidIndex4(arr, left, right) {
    const midVal = arr[right];
    let midIndex = right;
    while(left < right) {
        while(left < right && arr[left] >= midVal) {
            left++;
        }
        // 不断变换的是坑位
        arr[midIndex] = arr[left];
        midIndex = left;
        while(left < right && arr[right] <= midVal) {
            right--;
        }
        arr[midIndex] = arr[right];
        midIndex = right;
    }
    arr[left] = midVal;
    return left;
}

// 前后指针法
function getMidIndex3(arr, left, right) {
    let cur = left; // 找大数
    let pre = cur - 1; // 找小数
    const midVal = arr[right];
    while(cur <= right) {
        if (arr[cur] <= midVal && ++pre != cur) {
            swap(arr, cur, pre);
        }
        cur++;
    }
    return pre;
}

// 快速排序: 递归实现
function quickSort(arr) {
    function QuickSort(arr, left, right) {
        if (left < right) {
            let midIndex = getMidIndex2(arr, left, right);
            QuickSort(arr, left, midIndex - 1);
            QuickSort(arr, midIndex + 1, right);
        }
    }
    QuickSort(arr, 0, arr.length - 1);
}

// 快速排序：非递归
function quickSort2(arr) {
    function QuickSort(arr, left, right) {
        let stack = [];
        stack.push(right);
        stack.push(left);
        while(stack.length) {
            const left = stack.pop();
            const right = stack.pop();
            let midIndex = getMidIndex4(arr, left, right);
            if (left < midIndex - 1) {
                stack.push(midIndex - 1);
                stack.push(left);
            }
            if (midIndex + 1 < right) {
                stack.push(right);
                stack.push(midIndex + 1);
            }
        }
    }
    QuickSort(arr, 0, arr.length - 1);
}

// 快速排序的应用：topK问题
function getTopK(arr, k) {
    let left = 0;
    let right = arr.length - 1;
    const targetGetMidIndexFunc = getMidIndex4;
    let midIndex = targetGetMidIndexFunc(arr, left, right);
    while(midIndex != k - 1) {
        if (midIndex > k - 1) {
            // 向左侧收敛
            right = midIndex - 1;
            // midIndex = getMidIndex2(arr, left, right); //数据分布（左小右大）
            midIndex = targetGetMidIndexFunc(arr, left, right); //数据分布（左大右小）
            continue;
        }
        // 向右侧收敛
        left = midIndex + 1;
        midIndex = targetGetMidIndexFunc(arr, left, right);
    }
    const res = [];
    for(let i = 0; i <= midIndex; i++) {
        res[i] = arr[i];
    }
    console.log(`topK: ${k}`);
    console.log(`midIndex: ${midIndex}`);
    console.log(`res: ${res}`);
    return res;
}

// 测试快速排序函数性能
// run({sortFunc:quickSort, dataSize:10000, showSortedArr: true}); // 递归溢出
// run({sortFunc:quickSort, dataSize:5000, showSortedArr: true}); // 递归快排的数据量上限
// run({sortFunc:quickSort2, dataSize:1000, showSortedArr: true}); // 非递归快速排序

// 测试topK
run({sortFunc:getTopK, funcArgs:[20], dataSize:100000, showSortedArr: true});
