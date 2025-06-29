class Heap {
    static max = 'max';
    static min = 'min';

    constructor(arr, type = Heap.max) {
        this.heap = arr;
        this.heapSort(arr, type);
    }
    heapSort(arr, type) {
        let heapSortFunc = '';
        if (type === Heap.max) {
            heapSortFunc = this.doMaxHeapSort;
        } else if (type === Heap.min) {
            heapSortFunc = this.doMinHeapSort;
        }

        const n = arr.length;
        for (let i = n >> 1; i >= 0; i--) {
            heapSortFunc(arr, i, n);
        }
        for (let i = n - 1; i > 0; i--) {
            swap(arr, 0, i);
            heapSortFunc(arr, 0, i);
        }
    }
    doMaxHeapSort(arr, parent, n) {
        let left = 0;
        let right = 0;
        let bigIndex = -1;
        while (parent < n) {
            bigIndex = -1;
            left = 2 * parent + 1;
            right = left + 1;
            if (left < n && arr[left] > arr[parent]) {
                bigIndex = left;
            }
            if (right < n && arr[right] > arr[left]) {
                bigIndex = right;
            }
            if (bigIndex >= 0) {
                // 有比parent大的元素
                swap(arr, bigIndex, parent);
                parent = bigIndex;
            } else {
                break;
            }
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
}

function heapTest() {
    // const arr = [1, 2, 9, 10, 5000, 889];
    const arr = getTestData({ dataSize: 20 });
    // const heap = new Heap(arr, Heap.min);
    const heap = new Heap(arr, Heap.max);
    console.log(arr);
}

heapTest();
