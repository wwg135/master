/**
自动定位脚本
@author: wwg135
更新地址：https://raw.githubusercontent.com/wwg135/Quantumult-X/Quantumult-X/locate.js
Quantumult X
[MITM]
hostname=weather-data.apple.com, api.weather.com
[rewrite_local]
https:\/\/((weather-data\.apple)|(api.weather))\.com url script-request-header https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/caiyun.js
即可定时获取当前位置，注意需要安装自带的天气应用。此重写不要禁用。
在脚本中即可通过 "latitude" 和 ”longitude" 这两个字段引用当前的经纬度。
*/

const url = $request.url;
const res =
    url.match(/weather\/.*?\/(.*)\/(.*)\?/) ||
    url.match(/geocode\/([0-9.]*)\/([0-9.]*)\//) ||
    url.match(/geocode=([0-9.]*),([0-9.]*)/);
const latitude = res[1];
const longitude = res[2];
console.log(`当前位置：纬度${latitude}，经度${longitude}`);

// write data
if (typeof $prefs !== 'undefined'){
    // QX
    $prefs.setValueForKey(latitude, "latitude");
    $prefs.setValueForKey(longitude, "longitude");
}else{
    // Loon & Surge
    $persistentStore.write(latitude, "latitude");
    $persistentStore.write(longitude, "longitude");
}

$done();
