const axios = require('axios');
const fs = require('fs');
const path = require('path');
const md5 = require('blueimp-md5');
const qs = require('qs');
const womandata  = require("./woman.json");
const mandata = require("./man.json");

//性别改变
const gender = "man"  // or man
const allData = gender === "woman" ? womandata : mandata
const id = gender === "woman" ?  "652f9cfe2838e3d5f8a9d6dd" : "653227527c7ea066869a0457"

const hairlenth = allData.hair.length
const glasseslenth = allData.glasses.length
const eyeshapelenth = allData.eyeshape.length
const facemasklenth = allData.facemask.length
const faceshapelenth = allData.faceshape.length

//提交第一次改变
const changeFirst = (data) => {
    fetch(`https://api.readyplayer.me/v2/avatars/${id}?morphTargets[]=eyesClosed&morphTargets[]=eyeSquintLeft&morphTargets[]=eyeSquintRight&textureAtlas=none&textureSizeLimit=768&textureFormat=webp&lod=0&responseType=glb`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0Fub255bW91cyI6dHJ1ZSwidXNlcklkIjoiNjUyZjdlY2RjMTU2OTYyNGYwNjFmOWM5IiwiYWJpbGl0eSI6W1sibWFuYWdlIiwiQXZhdGFyIix7InVzZXJJZCI6IjY1MmY3ZWNkYzE1Njk2MjRmMDYxZjljOSJ9XSxbIm1hbmFnZSIsIlVzZXIiLHsiX2lkIjoiNjUyZjdlY2RjMTU2OTYyNGYwNjFmOWM5In1dLFsicmVhZCIsIlBhcnRuZXIiXSxbInJlYWQsY3JlYXRlIiwiT3JnYW5pemF0aW9uIl0sWyJ1c2UiLCJUcmFja2luZyIseyJfaWQiOnsiJGluIjpbIjY0MjJmN2I4MThkZTZhNjRkNjM0YzQ0NiJdfX1dLFsicmVhZCIsIkFwcGxpY2F0aW9uIl0sWyJyZWFkIiwiQXNzZXQiXSxbInVzZSIsIkFzc2V0Iix7ImxvY2tlZCI6eyIkbmUiOnRydWV9fV0sWyJ1c2UiLCJBc3NldCIseyJpZCI6eyIkaW4iOltdfX1dLFsidXNlIiwiQXNzZXRMaXN0RmlsdGVyIix7InF1ZXJ5LmZpbHRlclVzZXJJZCI6IjY1MmY3ZWNkYzE1Njk2MjRmMDYxZjljOSJ9XSxbInVzZSIsIkFzc2V0Iix7Imdyb3Vwcy5pZCI6eyIkaW4iOltdfX1dLFsicG9zdCIsIldlYmhvb2tFdmVudCIseyJyb3V0aW5nS2V5Ijoic3R1ZGlvLXVpLnYxLmdldHRpbmctc3RhcnRlZC5jb21wbGV0ZWQifV0sWyJwb3N0IiwiV2ViaG9va0V2ZW50Iix7InJvdXRpbmdLZXkiOiJzdHVkaW8tdWkudjEuYWRkLWFwcGxpY2F0aW9uLmNvbXBsZXRlZCJ9XSxbInJlYWQiLCJDYW1wYWlnbiIsMCwwLCJpZCxuYW1lLGNyZWF0ZWRBdCx1cGRhdGVkQXQiXSxbInJlYWQiLCJBc3NldCIsMCwxLCJtb2RlbFVybCxuZnRJZCJdXSwiaWF0IjoxNjk3NjExNDcwfQ.--WgTrf9qxuuf21GzJHRskQuvkQB-KHYcv9Do-SjB3Q",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://readyplayer.me/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify(data),
        "mode": "cors",
        "method": "PATCH"
    }).then((res) => res)
        .then(response => {
            console.log("change", response, JSON.stringify(data));
            applyChange()
        })
        .catch((e) => {
            downloadData();
        })
}

//确认改变
const applyChange = () => {
    fetch(`https://api.readyplayer.me/v2/avatars/${id}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0Fub255bW91cyI6dHJ1ZSwidXNlcklkIjoiNjUyZjdlY2RjMTU2OTYyNGYwNjFmOWM5IiwiYWJpbGl0eSI6W1sibWFuYWdlIiwiQXZhdGFyIix7InVzZXJJZCI6IjY1MmY3ZWNkYzE1Njk2MjRmMDYxZjljOSJ9XSxbIm1hbmFnZSIsIlVzZXIiLHsiX2lkIjoiNjUyZjdlY2RjMTU2OTYyNGYwNjFmOWM5In1dLFsicmVhZCIsIlBhcnRuZXIiXSxbInJlYWQsY3JlYXRlIiwiT3JnYW5pemF0aW9uIl0sWyJ1c2UiLCJUcmFja2luZyIseyJfaWQiOnsiJGluIjpbIjY0MjJmN2I4MThkZTZhNjRkNjM0YzQ0NiJdfX1dLFsicmVhZCIsIkFwcGxpY2F0aW9uIl0sWyJyZWFkIiwiQXNzZXQiXSxbInVzZSIsIkFzc2V0Iix7ImxvY2tlZCI6eyIkbmUiOnRydWV9fV0sWyJ1c2UiLCJBc3NldCIseyJpZCI6eyIkaW4iOltdfX1dLFsidXNlIiwiQXNzZXRMaXN0RmlsdGVyIix7InF1ZXJ5LmZpbHRlclVzZXJJZCI6IjY1MmY3ZWNkYzE1Njk2MjRmMDYxZjljOSJ9XSxbInVzZSIsIkFzc2V0Iix7Imdyb3Vwcy5pZCI6eyIkaW4iOltdfX1dLFsicG9zdCIsIldlYmhvb2tFdmVudCIseyJyb3V0aW5nS2V5Ijoic3R1ZGlvLXVpLnYxLmdldHRpbmctc3RhcnRlZC5jb21wbGV0ZWQifV0sWyJwb3N0IiwiV2ViaG9va0V2ZW50Iix7InJvdXRpbmdLZXkiOiJzdHVkaW8tdWkudjEuYWRkLWFwcGxpY2F0aW9uLmNvbXBsZXRlZCJ9XSxbInJlYWQiLCJDYW1wYWlnbiIsMCwwLCJpZCxuYW1lLGNyZWF0ZWRBdCx1cGRhdGVkQXQiXSxbInJlYWQiLCJBc3NldCIsMCwxLCJtb2RlbFVybCxuZnRJZCJdXSwiaWF0IjoxNjk3NjExNDcwfQ.--WgTrf9qxuuf21GzJHRskQuvkQB-KHYcv9Do-SjB3Q",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://readyplayer.me/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "PUT"
    }).then(res => res.json())
        .then(res => {
            console.log("apple", res);
            download();
        }).catch((e) => {
            downloadData();
        })
}

let index = 0
let mcount = 0
//下载数据
const download = () => {
    let localFilePath = path.join(__dirname, 'mandata', `${gender}-${index}_${mcount}.glb`);
    const fileUrl = `https://models.readyplayer.me/${id}.glb`;
    axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'arraybuffer', // 指定响应类型为二进制数据
    })
        .then((response) => {
            fs.writeFileSync(localFilePath, Buffer.from(response.data));
            console.log('文件下载完成');
            mcount++;
            downloadData();
        })
        .catch((error) => {
            console.error('下载失败', error);
            downloadData();
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

const downloadData = () => {
    if (index <= 99) {
        let outfitId = allData.outfit[index].id;
        if(mcount < 5) {
            let hairId = allData.hair[getRandomInt(hairlenth)]?.id || "";
            let eyeShapeId = allData.eyeshape[getRandomInt(eyeshapelenth)]?.id || "";
            let glassesId = allData.glasses[getRandomInt(glasseslenth)]?.id || "";
    
            let data = {
                "data": {
                    "assets": {
                        "outfit":outfitId,
                        "eyeShape": eyeShapeId,
                        "hairStyle": hairId,
                        "glasses":glassesId
                    }
                }
            }
            changeFirst(data);
        }
        else {
            mcount = 0;
            index ++;
            downloadData();
        }
    }
}

downloadData();

//逆向了一个拉取Blob的请求 （应该是
const client = "8bc7facfa30dd0a22b920280334c927a"
const apiVersion = 2
const apiKey = "8bc7facfa30dd0a22b920280334c927a"
const uploadTime = new Date().getTime();
var uuid = function uuid(a) {
    return a // if the placeholder was passed, return
        ? // a random number from 0 to 15
        (a ^ // unless b is 8,
            Math.random() * // in which case
            16 >> // a random number from
            a / 4). // 8 to 11
            toString(16) // in hexadecimal
        : // or otherwise a concatenated string:
        ([1e7] + // 10000000 +
            -1e3 + // -1000 +
            -4e3 + // -4000 +
            -8e3 + // -80000000 +
            -1e11). // -100000000000,
            replace( // replacing
                /[018]/g, // zeroes, ones, and eights with
                uuid // random hex digits
            );
};
const event_id = 346;           //每次提交都会+1这个值 具体值请查看对应请求的body
const sequenceNumber = 577;     //每次提交都会+1这个值 具体值请查看对应请求的body
const events = `[{"device_id":"652f7ecdc1569624f061f9c9","user_id":null,"timestamp":${uploadTime},"event_id":${event_id},"session_id":1697679160454,"event_type":"avatar loaded","version_name":null,"platform":"Web","os_name":"Chrome","os_version":"117","device_model":"Mac OS","device_manufacturer":null,"language":"zh-CN","api_properties":{},"event_properties":{"partner name":"default","editor-version":"2.0"},"user_properties":{},"uuid":${uuid()},"library":{"name":"amplitude-js","version":"8.16.0"},"sequence_number":${sequenceNumber},"groups":{},"group_properties":{},"user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"}]`

const subtimeMD5 = {
    "checksum": md5(apiVersion + apiKey + events + uploadTime),
    client,
    "e": encodeURI(events),
    "upload_time": uploadTime + 1,
    "v": 2,
}

const checkChange = () => {
    fetch("https://readyplayer.me/api/analytics", {
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cross-origin-resource-policy": "cross-origin",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": `https://readyplayer.me/avatar?id=${id}`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": qs.stringify(subtimeMD5),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(res => res).then((res) => {
        console.log("change2")
        if (res) {
            console.log(res)
        }
        // setTimeout(() => {
        //     applyChange();
        // }, 2000);
    }).catch(error => {
        console.error('Request failed:', error);
    });
}
