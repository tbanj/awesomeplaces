/* eslint-disable prettier/prettier */
const crypto = require('crypto');
function verifyKey() {
    crypto.randomBytes(4);
    return crypto.randomBytes(4).toString('hex');
}

function verifyMini() {
    return Math.floor(Math.random() * 899999 + 100000)
}

function minDifference(reformatDate, update) {
    // let today = new Date("Thu, 26 Mar 2020 00:00:42 GMT");
    let day = new Date(update);
    let day2 = new Date(reformatDate);
    let diff = Math.abs(day - day2) / 1000;
    const minutes = Math.floor(diff / 60) % 60;
    return minutes
}

/* for standardize unique to 10 digits  standardize length= 0000,  currentId= 0009 */
function standardizeId(standardizeLen, currentId) {
    const newL = parseInt(currentId) + 1;
    const newLen = standardizeLen.length - (newL).toString().length
    return "0".repeat(newLen) + newL
}


// to add days to current date
function addDays(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

module.exports = {
    verifyKey, verifyMini, minDifference, standardizeId, addDays,
}