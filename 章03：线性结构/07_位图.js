class BitMapBase {
    constructor(arr) {
        let num = 0;
        for(let i = 0; i < arr.length; i++) {
            num = this.change1(num, arr[i]);
        }
        this.binary = num;
        console.log('str: ', num.toString(2));
    }
    // 将指定位改为1
    change1(num, digit) {
        const mask = 1 << digit;
        num = num | mask;
        return num;
    }
    // 将指定位改为0
    change0(num, digit) {
        const mask = 1 << digit;
        num = num & (~mask);
        return num;
    }
    // 获取二进制位中的某一位
    getBit(num, digit) {
        num = num >> digit;
        return num & 1;
    }
    toNumArr() {
        const num = this.binary;
        const n = num.toString(2).length;
        const ret = [];
        for(let i = 0; i < n; i++) {
            if (this.getBit(num, i)) {
                ret.push(i);
            }
        }
        return ret;
    }
    // 测试类的成员函数
    methodTest() {
        console.log(this.change1(Number('0b0010'), 2));
        console.log(this.change0(Number('0b0010'), 1));
        console.log(this.change0(Number('0b0011'), 1));
        console.log(this.getBit(Number('0b1010'), 0));
        console.log(this.getBit(Number('0b1010'), 1));
        console.log(this.getBit(Number('0b1010'), 2));
        console.log(this.getBit(Number('0b1010'), 3));
    }
}
// 测试类的功能
function bitMapBaseTest() {
    // 获取测试数据: macbook air m1 13.5 / chrome:130.0.6723.117
    const arr = [32, 2, 1, 7, 9, 0, 11, 31]; // 32bit(实际为64位，负数范围-正数范围)
    const bitMap = new BitMapBase(arr);
    console.log(bitMap.toNumArr());
}

class BitMap {
    constructor(arr) {
        this.buckets = [];
        this.capacity = 16;
        let bucketIndex = 0;
        let bitIndex = 0;
        for(let i = 0; i < arr.length; i++) {
            bucketIndex = Math.floor(arr[i] / this.capacity);
            bitIndex = arr[i] % this.capacity;
            // 定位数据
            const bucketData = this.buckets[bucketIndex];
            if (!bucketData) {
                this.buckets[bucketIndex] = this.change1(0, bitIndex);
            } else {
                this.buckets[bucketIndex] = this.change1(bucketData, bitIndex);
            }
        }
    }
    // 将指定位改为1
    change1(num, digit) {
        const mask = 1 << digit;
        num = num | mask;
        return num;
    }
    // 将指定位改为0
    change0(num, digit) {
        const mask = 1 << digit;
        num = num & (~mask);
        return num;
    }
    // 获取二进制位中的某一位
    getBit(num, digit) {
        num = num >> digit;
        return num & 1;
    }
    binaryToNumArr(binary) {
        const n = binary.toString(2).length;
        const ret = [];
        for(let i = 0; i < n; i++) {
            if (this.getBit(binary, i)) {
                ret.push(i);
            }
        }
        return ret;
    }
    toNumArr() {
        const buckets = this.buckets;
        const n = buckets.length;
        const ret = [];
        let bucketData = '';
        for(let i = 0; i < n; i++) {
            bucketData = buckets[i];
            let modDataArr = [];
            if (bucketData) {
                modDataArr = this.binaryToNumArr(bucketData)
                modDataArr.forEach(modData => {
                    ret.push(i * this.capacity + modData);
                });
            }
        }
        return ret;
    }
    isExist(num) {
        const bucketIndex = Math.floor(num / this.capacity);
        const bitIndex = num % this.capacity;
        const bucket = this.buckets[bucketIndex];
        return bucket && this.getBit(bucket, bitIndex);
    }
}
// 测试类的功能: BitMap类
function bitMapTest() {
    const arr = [500000000, 31, 2, 1, 7, 9, 0, 11, 32, 16, 15];
    const bitMap = new BitMap(arr);
    console.log(bitMap.toNumArr());
    console.log(bitMap.isExist(500000001));
    console.log(bitMap.isExist(500000000));
    console.log(bitMap.isExist(16));
}
bitMapTest();
// bitMapBaseTest();
