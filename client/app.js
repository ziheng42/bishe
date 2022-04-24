const express = require('express')
const cors = require("cors")
const app = express()
const path = require('path')

//连接数据库
require('./middleware/mongoose')

app.use(cors())
//处理数据中间件
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//加载静态资源库
app.use(express.static(path.join(__dirname, './public')))

//监听端口
app.listen(4633, ()=>{
    console.log("服务器已经开启请访问：localhost:4633")
})
//监听路由
app.use("/",require('./router/index'))