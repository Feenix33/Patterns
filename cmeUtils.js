// my base utility functions for use w/p5.js programs
// eventually need to move to a helpers/function_name.js style

var cmeUtils = {
  isNull: function (value) { return value === null; },
  minmax: function (value, min=0, max=100) {
    return Math.min(max, Math.max(min, value));
  },
  rangeToPercent: function (value, min, max) {
    return ((value - min) / (max - min)); },
  percentToRange: function (percent, min, max) {
    return ((max - min)*percent + min); },
  randomString: function (len = 8) {
    return Array.apply (0, Array(len))
      .map(function () {
        return (function (charset) {
          return charset.charAt(
            Math.floor(Math.random() * charset.length)
          );
        }) ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        );
      })
      .join(''); },
  getRandomColor: function () {
    return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
  },
  /***
  ***/
};

