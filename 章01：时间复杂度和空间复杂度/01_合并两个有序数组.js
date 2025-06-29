/**
 * 给出两个有序数组，以O(n)的时间复杂度和O(1)的空间复杂度，合并这两个数组
 * 给定的数据：有序数组1、有序数组2、有序数组1的长度、有序数组2的长度
 * 解题核心：清楚3个指针的移动条件
 */

function run(arr1, arr2, n, m) {
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

    console.log('resArr: ', arr1);
}

/**
 * test data 1
 */
const a = [1, 2,3,7,9];
const b = [1, 2, 4, 5, 6, 6, 10, 23];

/**
 * test data 2
 */
const c = [1, 2, 4, 5, 6, 6, 10, 23];
const d = [1, 2,3,7,9];

/**
 * run test
 */
run(a, b, a.length, b.length);
run(c, d, c.length, d.length);
