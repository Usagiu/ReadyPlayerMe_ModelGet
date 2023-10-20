const fs = require('fs');

type = [
    "beard",
    "bottom",
    "eye",
    "eyebrows",
    "eyeshape",
    "facemask",
    "faceshape",
    "facewear",
    "footwear",
    "glasses",
    "hair",
    "headwear",
    "lipshape",
    "noseshape",
    "outfit",
    "shirt",
    "top",
    "costume"
]


const list = []


const getData = (type) => {
    fetch(`https://api.readyplayer.me/v1/assets?page=1&limit=500&filter=viewable-by-user-and-app&filterUserId=652f7ecdc1569624f061f9c9&filterApplicationId=6422f7b818de6a64d634c446&filterAllowLocked=true&order=-locked&type=${type}&gender=female&gender=neutral`, {
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
            "x-tracking-id": "6422f7b818de6a64d634c446"
        },
        "referrer": "https://readyplayer.me/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    }).then(res => res.json())
        .then(res => {
            list.push({
                [type]: res.data
            })
        })
}

type.map((item) => {
    getData(item)
})

const fileName = 'rtoplayMe.json';

setTimeout(() => {
    const jsonContent = JSON.stringify(list, null, 2); 
    fs.writeFile(fileName, jsonContent, 'utf8', (err) => {
        if (err) {
          console.error('写入文件时发生错误：', err);
        } else {
          console.log(`数据已成功写入文件 ${fileName}`);
        }
      });      
}, 5000);