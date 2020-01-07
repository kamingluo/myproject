var app = getApp();
const baseConfig = require('./config.js')




//随机打乱数组
function randomdata(arr) {
    var array = arr;
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
}

//获得到n的随机数
// var rand = Math.floor(Math.random() * (n)) + 1;


//从数组随机取一个值
function haveone(arr) {
    var arr = arr;
    var item = arr[Math.floor(Math.random() * arr.length)];
    console.log(item)
}


//从数组随机取多个值(count表示取几个值）
function havefeedsome() {
    var arr = baseConfig.feed;
    var num = arr.length;
    if (num < 3) {
        var count = num;
    }
    else if (num >= 3 && num < 7) {
        var count = num - 1;
    }
    else if (num >= 7 && num < 10) {
        var count = num - 2;
    }
    else {
        var count = 8;
    }
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    //console.log(shuffled.slice(min)) 
    return shuffled.slice(min)
}

//从数组随机取多个值(count表示取几个值）
function havebannersome() {
    var arr = baseConfig.banner;
    var num = arr.length;
    if (num < 3) {
        var count = num;
    }
    else if (num >= 3 && num < 7) {
        var count = num - 1;
    }
    else if (num >= 7 && num < 10) {
        var count = num - 2;
    }
    else {
        var count = 8;
    }
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    //console.log(shuffled.slice(min)) 
    return shuffled.slice(min)
}

//修改数组里面某个key值
function updated() {
     var arr = baseConfig.adlist;
     var banner = baseConfig.banner;
     var feed = baseConfig.feed;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type == 2) {
            var feedone = feed[Math.floor(Math.random() * feed.length)];
            arr[i].apid=feedone;
        }
        if (arr[i].type == 3) {
              var bannerone = banner[Math.floor(Math.random() * banner.length)];
             arr[i].apid=bannerone;
        }
    }
    return arr
}




module.exports = {
    randomdata: randomdata,
    haveone: haveone,
    havefeedsome: havefeedsome,
    havebannersome: havebannersome,
    updated: updated,
}