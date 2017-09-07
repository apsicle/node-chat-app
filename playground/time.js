// relative to Jan 1st 1970 00:00:00 am

var moment = require('moment');

var date = new moment();
console.log(date.format('Do MMM, YYYY'))

console.log(date.format('h:mm a'))

var someTimestamp = moment().valueOf();
console.log(someTimestamp);