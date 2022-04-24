const express = require('express')
const router = express.Router()
const userDB = require('../../db/user')
//注册用户
router.post('/', async (req, res) => {
    let { name, pass } = req.body
    //验证数据格式
    let nameR = /^[\d]{12,12}$/
    let passR = /^[\w,.?;<>/|\\:'"!@#$%^&*()+-]{6,18}$/
    if (!nameR.test(name) || !passR.test(pass)) {
        //说明数据格式不合适，使用者跳过了前端验证
        return res.send({
            code: 1,
            msg: "数据格式错误"
        })
    }
    //检查用户是否存在
    let doc = await userDB.findOne({ name })
    if (doc) {
        return res.send({
            code: 2,
            msg: "用户已存在"
        })
    }
    //创建文档
    await userDB.create({ xingming: name, name, pass })
    res.send({
        code: 0,
        msg: "用户注册成功"
    })

})
//添加教师用户
router.post('/teacher', async (req, res) => {
    let { data } = req.body
    console.log(data);
    //检查用户是否存在
    let doc = await userDB.findOne({ name: data.name })
    console.log(doc);
    if (doc) {
        return res.send({
            code: 2,
            msg: "用户已存在"
        })
    }

    //创建文档
    await userDB.create({ xingming: data.name, name: data.name, pass: data.pass, teacher:true, student:false })
    res.send({
        code: 0,
        msg: "用户注册成功"
    })
})
//查找用户信息
router.get('/getusers', async (req, res) => {
    try {
        let doc = await userDB.find({}, {}, { sort: { date: -1 } })
        res.send({
            code: 0,
            data: doc
        })
    } catch (error) {
        res.send({
            code:1,
            msg:error
        })
    }
})
//删除用户信息
router.post('/delete', async(req, res)=>{
    let {item} = req.body
    console.log(item); 
    try {
        await userDB.deleteOne({_id:item._id})
        res.send({
            code:0,
            msg:'删除成功'
        }) 
    } catch (error) {
        res.send({
            code:1,
            msg:error
        }) 
    }  
   
})
module.exports = router