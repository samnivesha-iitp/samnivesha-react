function arrayFinder(name, array) {
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i][name] !== "undefined") {
      return array[i];
    }
  }
}
module.exports = arrayFinder;
