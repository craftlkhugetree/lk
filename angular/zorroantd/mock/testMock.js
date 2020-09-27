// 使用 Mock
var Mock = require('mockjs')
var Random = Mock.Random
// var dateR = Random.date()
// var guidR = Random.guid()
// var areaR = Random.county( true)

// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 5 到 10 个元素
//     'list|5-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,
//         'name': '@cname',
//         'date': Random.date(),
//         'GUID': Random.guid(),
//         'Area': Random.county(),
//         }]
// })
// 输出结果
// console.log(JSON.stringify(data, null, 4))
// module.exports = ()=>{
//     return data
// }

// const domain = 'http://localhost:3000' // 定义默认域名，随便写
// const code = 200 // 返回的状态码

// const postData = ()=>{
//     let posts = [] // 用于存放文章数据的数组
  
//     for (let i = 0; i < 10; i++) {
//       let post = {
//         title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
//         icon: Random.dataImage('250x250', '文章icon'), // 随机生成大小为250x250的图片链接
//         author: Random.cname(), // 随机生成名字
//         date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
//       }
   
//       posts.push(post)
//     }
    
//     // 返回状态码和文章数据posts
//     return {
//       code,
//       posts
//     }
// }
// // 定义请求链接，类型，还有返回数据
// // var data = Mock.mock(`${domain}/posts`, 'post', postData)
// var data = Mock.mock(postData)



module.exports=()=>{
    let data={
        list:[]
    };

    let images=[1,2,3].map(x=>Random.image('120x60',Random.color(),Random.word(2,6)));

    for(let i=0;i<100;i++){
        let content=Random.cparagraph(0,10);

        data.list.push({
            id:i,
            title:Random.cword(8,20),
            desc:content.substr(0,40),
            tag:Random.cword(2,6),
            views: Random.integer(100, 5000),
            images: images.slice(0, Random.integer(1, 3)),
            title2: Random.csentence(10, 25), // 随机生成长度为10-25的标题
            // icon: Random.dataImage('250x250', '文章icon'), // 随机生成大小为250x250的图片链接
            author: Random.cname(), // 随机生成名字
            date: Random.date() + ' ' + Random.time(), // 随机生成年月日 + 时间
            // name: '@cname',
            // date: Random.date(),
            GUID: Random.guid(),
            Area: Random.county(),
        })
    }
    return data
}