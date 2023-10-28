/* 
Given an integer array nums, find the 
subarray
 with the largest sum, and return its sum.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 
Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 
Follow up: If you have figured out the O(n) solution, try coding another solution 
using the divide and conquer approach, which is more subtle.
*/

// SOLUTION 1 (using Kadane's algorithm, which has a time complexity of O(n) and a space complexity of O(1)) :
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};

// /-------------------------------------------
// SOLUTION 2 (divide and conquer approach with time complexity of O(n log n) and a space complexity of O(log n)):

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  function maxCrossingSum(nums, left, mid, right) {
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      leftSum = Math.max(leftSum, sum);
    }

    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
      sum += nums[i];
      rightSum = Math.max(rightSum, sum);
    }

    return leftSum + rightSum;
  }

  function maxSubArrayHelper(nums, left, right) {
    if (left === right) {
      return nums[left];
    }

    const mid = Math.floor((left + right) / 2);

    const leftMax = maxSubArrayHelper(nums, left, mid);
    const rightMax = maxSubArrayHelper(nums, mid + 1, right);
    const crossMax = maxCrossingSum(nums, left, mid, right);

    return Math.max(leftMax, rightMax, crossMax);
  }

  if (nums.length === 0) {
    return 0;
  }

  return maxSubArrayHelper(nums, 0, nums.length - 1);
};
/*
 We can solve the maximum subarray sum problem using a divide and conquer approach. 
 This method has a time complexity of O(n log n) and a space complexity of O(log n).

 In this divide and conquer approach, the maxSubArrayHelper function recursively 
 divides the array into two halves and finds the maximum 
 subarray sum in the left, right, and across the middle (crossing) of the array.
  The maximum of these three values is returned as the result.
*/
