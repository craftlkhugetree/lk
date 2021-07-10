var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = "jk.json"   /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
var request = new XMLHttpRequest();
request.open("get", url);/*设置请求方法与路径*/
request.send(null);/*不发送数据到服务器*/
request.onload = function () {/*XHR对象获取到返回信息后执行*/
    if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
        var json = JSON.parse(request.responseText);
           j(json)
     
    }
}

const fs = require("fs");
let rawdata = fs.readFileSync("jk.json");
let person = JSON.parse(rawdata);
// console.log(person);

function j(json) {
    for(const i in json) {
        t = json[i][2]
        for(const j in t) {
            let url = t[j]                
            window.open(url)
        }
    }
}
// j(person)