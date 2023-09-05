// my base utility functions for use w/p5.js programs
// eventually need to move to a helpers/function_name.js style

// crayons from jennyscrayoncollection.com
// 8 : red yellow blue brown orange green violet black
// 16: red violet, red orange, yellow green, blue violet, carnation pink, yellow orange, blue green, white
// 24: violet red, apricot, cerulean, indigo, scarlet, green yellow, blutiful, gray
// 32: chesnut,peach,sky blue,cadet blue,melon, tan, wisteria, timerwolf
// 48: lavender,burn sienna, olive green,purple mountain,salmon, mac&cheese,granny smith apple, sepie
//     mauvelous,goldenrod,sea green raw sienna,mahogany, spring green,cornflower,tumbleweed

var cme = {
  crayons8: ['#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323'],
  crayons16:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed'],
  crayons24:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed',
    '#f75394','#fdd9b5','#1dacd6','#5d76cb','#fc2847','#f0e891','#2e5090','#95918c'],
  crayons32:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed',
    '#f75394','#fdd9b5','#1dacd6','#5d76cb','#fc2847','#f0e891','#2e5090','#95918c',
    '#bc6d69','#ffcfab','#90daeb','#b0b8c+','#fdbcb4','#faa76c','#cda4de','#dbd7d2' ],
  crayons48:[
    '#ee204d','#fce883','#1f75fe','#b5674d','#ff7538','#1cac78','#926eae','#232323',
    '#co448f','#ff5349','#c5e384','#7366bd','#ffaacc','#ffb653','#199ebd','#ededed',
    '#f75394','#fdd9b5','#1dacd6','#5d76cb','#fc2847','#f0e891','#2e5090','#95918c',
    '#bc6d69','#ffcfab','#90daeb','#b0b8c+','#fdbcb4','#faa76c','#cda4de','#dbd7d2',
    '#fcb4d5','#ea7e5d','#bab86c','#9d81ba','#ff9baa','#ffbd88','#a8e4a0','#a5694f',
    '#ef98aa','#fcd975','#9fe2bf','#d68a59','#cd4a4a','#eceabe','#9aceeb','#deaa88'],

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

  timestring: function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    //var millis = date.getMilliseconds();

    year = year.toString().substr(2);
    month = ("00" + month).substr(-2, 2);
    day = ("00" + day).substr(-2, 2);
    minute = ("00" + minute).substr(-2, 2);
    second = ("00" + second).substr(-2, 2);

    return [year, month, day, "_", hour, minute, second].join('');
    //return [year, month, day, "_", hour, minute, second, "_", millis].join('');
  },
  timelog: function(){
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    minute = ("00" + minute).substr(-2, 2);
    second = ("00" + second).substr(-2, 2);

    return [hour, minute, second].join(':');
  },

};

