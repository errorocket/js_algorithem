// 获取整数的位数
function getLoopTimes(n) {
    let num = 0;
    do {
        if (n >= 1) {
            num++;
        } else {
            break;
        }
    } while((n = n / 10));
    return num;
}

// 获取桶编号
function getBucketIndex(n, loopTimes) {
    const char = (n + '').split('').reverse()[loopTimes - 1];
    if (char) {
        return +char;
    }
    return 0;
}

// LSD基数排序
function lsdBaseSort(arr) {
    const max = Math.max.apply(0, arr);
    const loopTimes = getLoopTimes(max);
    const buckets = [];
    for(let i = 0; i < 10; i++) {
        buckets.push([]);
    }
    doLsdBaseSort(arr, buckets, loopTimes);
}

// lsd基数排序
function doLsdBaseSort(arr, buckets, loopTimes) {
    // 位数轮次(低位 -> 高位)
    for(let i = 1; i <= loopTimes; i++) {
        // 入桶
        for(let j = 0; j < arr.length; j++) {
            const index = getBucketIndex(arr[j], i);
            buckets[index].push(arr[j]);
        }

        // 重写原桶
        let index = 0;
        for(let k = 0; k < 10; k++) {
            const bucket = buckets[k];
            if (bucket.length) {
                for(let n = 0; n < bucket.length; n++) {
                    arr[index++] = bucket[n];
                }
                // 清空桶
                buckets[k] = [];
            }
        }
    }
}

// 基数排序
function msdBaseSort(arr) {
    const max = Math.max.apply(0, arr);
    const loopTimes = getLoopTimes(max);
    // 位数轮次(高位 -> 低位)
    doMsdBaseSort(arr, loopTimes);
}

function doMsdBaseSort(arr, loopTimes) {
    // 每次msd基数排序都需要准备新桶
    const buckets = [];
    for(let i = 0; i < 10; i++) {
        buckets.push([]);
    }
    if (arr.length > 1) {
        // 入桶
        for(let i = 0; i < arr.length; i++) {
            const index = getBucketIndex(arr[i], loopTimes)
            buckets[index].push(arr[i]);
        }
        // 递归子桶
        for(let i = 0; i < 10; i++) {
            // 防止含有相同元素的子桶重复循环递归，需要根据位数轮次限制递归入口
            if (buckets[i].length > 1 && loopTimes - 1){
                doMsdBaseSort(buckets[i], loopTimes - 1);
            }
        }
        // 合并子桶
        let i = 0;
        for(let j = 0; j < 10; j++) {
            const bucket = buckets[j];
            if (bucket.length) {
                for(let k = 0; k < bucket.length; k++)
                arr[i++] = bucket[k];
            }
        }
    }
}

// 最大字符串长度
function getMaxStrLength(arr) {
    let maxLength = arr[0].length;
    for(let i = 1; i < arr.length; i++) {
        if (arr[i].length > maxLength) {
            maxLength = arr[i].length;
        }
    }
    return maxLength;
}

// 字符串转数字数组
function toNum(str, length) {
    const str2NumMap = buildStr2NumMap();
    const nums = [];
    nums.str = str;
    for(let i = 0; i < length; i++) {
        nums[i] = str2NumMap[str[i]] || 0;
    }
    return nums;
}

// 数值数组的数组 => 转字符串数组
function toStr(fromArr, toArr) {
    for(let i = 0; i < fromArr.length; i++) {
        toArr[i] = fromArr[i].str;
    }
}

// 建立字符与数字的映射关系
function buildStr2NumMap() {
    let start = 'a'.charCodeAt();
    const end = start + 25;
    let i = 1;
    const map = {};
    for(start; start <= end; start++) {
        map[String.fromCharCode(start)] = i;
        i++;
    }
    return map;
}

// 获取字符串对应的数值数组的桶编号
function getStrBucketIndex(arr, i) {
    return arr[i];
}

// MSD基数排序的应用：字符串数组的字典序
function strMsdBaseSort(arr) {
    const loopTimes = getMaxStrLength(arr);
    const nums = [];
    // 字符串数组->数值数组的数组(按照最长字符串的规格去转，缺位的补0)
    for(let i = 0; i < arr.length; i++) {
        nums.push(toNum(arr[i], loopTimes));
    }
    doStrMsdBaseSort(nums, 0, loopTimes);
    toStr(nums, arr);
}

function doStrMsdBaseSort(arr, curLoop, loopTimes) {
    const buckets = [];
    for(let i = 0; i <= 26; i++) {
        buckets.push([]);
    }

    if (arr.length > 1) {
        // 入桶
        for(let i = 0; i < arr.length; i++) {
            const str2NumArr = arr[i];
            const index = getStrBucketIndex(str2NumArr, curLoop);
            buckets[index].push(str2NumArr);
        }

        // 递归子桶
        for(let i = 0; i <= 26; i++) {
            const bucket = buckets[i];
            // !bucket.str(确保数值数组的原子性)
            if (bucket.length > 1 && !bucket.str && curLoop < loopTimes) {
                doStrMsdBaseSort(bucket, curLoop + 1, loopTimes);
            }
        }

        // 重写原桶
        let index = 0;
        for(let i = 0; i <= 26; i++) {
            const bucket = buckets[i];
            if (bucket.length) {
                for(let j = 0; j < bucket.length; j++) {
                    arr[index++] = bucket[j];
                }
            }
        }
    }
}

const arr = ['zsds', 'a', 'abc', 'df', 'asdfdfdf', 'sdfdsfs'];
strMsdBaseSort(arr);
console.log(arr);
