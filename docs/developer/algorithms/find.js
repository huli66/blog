const array = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

function find(target, array) {
  let i = array.length - 1;
  let j = 0;
  return compare(target, array, i, j);
}

function compare(target, array, i, j) {
  if (array[i] === undefined || array[i][j] === undefined) {
    return false;
  }
  const temp = array[i][j];
  if (target < temp) {
    return compare(target, array, i - 1, j);
  } else if (target > temp) {
    return compare(target, array, i, j + 1);
  } else {
    return true;
  }
}

// console.log(find(3, array));

/** 二分查找 */
function binaryFind(array, target) {
  let start = 0;
  let end = array.length - 1;

  return binaryCompare(array, target, start, end);
}

function binaryCompare(array, target, start, end) {
    if (start > end) {
      return -1;
    }
    let mid = Math.floor((end + start) / 2);
    let temp = array[mid];
    if (temp > target) {
      return binaryCompare(array, target, start, mid - 1);
    } else if (temp < target) {
      return binaryCompare(array, target, mid + 1, end);
    } else {
      return mid;
    }
}

const arr2 = [1, 3, 4, 5, 6, 7, 9];
console.log(binaryFind(arr2, 1));
console.log(binaryFind(arr2, 9));
console.log(binaryFind(arr2, 8));
console.log(binaryFind(arr2, -1));