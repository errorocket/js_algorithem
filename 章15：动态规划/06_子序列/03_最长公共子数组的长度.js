/**
 * 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
 */
function findLength(nums1, nums2) {
    /**
     * 1.dp[i][j]含义
     * 以i-1结尾的nums1和以j-1结尾的nums2数组的公共子数组的最大长度
     * 2.
     * if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
     *
     */
    const dp = new Array(nums1 + 1);
    for(let i = 0; i < nums1.length + 1; i++) {
        const a = new Array(nums2.length + 1).fill(0);
        dp[i] = a;
    }
    for(let i = 1; i <= nums1.length; i++) {
        for(let j = 1; j <= nums2.length; j++) {
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // 累计之前的结果
            }
        }
    }
    let max = -Infinity;
    dp.forEach(arr => {
        const rst = Math.max(...arr);
        if (rst > max) max = rst;
    });
    return max;
}

function run() {
    console.log(findLength([1,2,3,2,1], [3,2,1,4,7]));
    console.log(findLength([0,0,0,0,0], [0,0,0,0,0]));
}
run();