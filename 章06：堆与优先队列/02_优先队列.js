class PriorityQueue {
    constructor(arr) {
        this.heap = arr;
        this.heapSort();
    }
    heapSort() {
        const arr = this.heap;
        const n = arr.length;
        for (let i = n >> 1; i >= 0; i--) {
            this.doMinHeapSort(arr, i, n);
        }
        for (let i = n - 1; i > 0; i--) {
            swap(arr, 0, i);
            this.doMinHeapSort(arr, 0, i);
        }
    }
    doMinHeapSort(arr, parent, n) {
        let left = 0;
        let right = 0;
        let smallIndex = -1;
        while (parent < n) {
            left = 2 * parent + 1;
            right = left + 1;
            smallIndex = -1;
            if (left < n && arr[left] < arr[parent]) {
                smallIndex = left;
            }
            if (right < n && arr[right] < arr[left]) {
                smallIndex = right;
            }
            if (smallIndex >= 0) {
                // 有比parent更小的元素
                swap(arr, smallIndex, parent);
                parent = smallIndex;
            } else {
                break;
            }
        }
    }
    insert(data) {
        const arr = this.heap;
        arr.push(data);
        let child = arr.length - 1; // 已知子节点，寻找父节点
        let parent = -1;
        while (true) {
            parent = (child - 1) >> 1;
            if (arr[child] < arr[parent]) { // 小的往上
                swap(arr, child, parent);
                child = parent;
            } else {
                break;
            }
        }
    }
    remove(data) {
        const arr = this.heap;
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === data) {
                index = i;
                break;
            }
        }
        swap(arr, index, arr.length - 1);
        let target = arr[index];
        let parent = 0; // 已知父节点，寻找子节点
        let child = 0;
        while (true) {
            child = 2 * parent + 1;
            // 找较小的子节点
            if (arr[child] > arr[child + 1] && arr[child + 1] !== target) {
                child++;
            }
            if (arr[parent] > arr[child] && arr[child] !== target) {
                swap(arr, parent, child); // 小节点往上
                parent = child;
            } else {
                break;
            }
        }
        arr.pop();
    }
}

function priorityQueueTest() {
    const arr = [1, 2, 9, 10, 5000, 889];
    const prQueue = new PriorityQueue(arr);
    prQueue.insert(50001);
    prQueue.insert(888);
    prQueue.insert(3);
    prQueue.remove(1);
    prQueue.heapSort();
    console.log(arr);
}

priorityQueueTest();
