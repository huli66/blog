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

console.log(find(3, array));