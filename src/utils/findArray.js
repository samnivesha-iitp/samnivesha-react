function arrayFinder(name, array) {
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i][name] !== "undefined") {
      return array[i];
    }
  }
}

function formatArrayIntoGroups(arr, options) {
  let count;
  if ("count" in options) {
    count = options.count;
  } else {
    count = 3;
  }
  return arr
    .map((v, i) => {
      if (i % count === 0) {
        let newArr = [],
          lastIndex = i + count;
        for (let index = i; index < lastIndex; index++) {
          newArr.push(arr[index]);
        }
        return newArr.filter((v) => v);
      }
    })
    .filter((v) => v);
}
module.exports = { formatArrayIntoGroups, arrayFinder };
