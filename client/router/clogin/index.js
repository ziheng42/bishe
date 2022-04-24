const express = require('express')
const router = express.Router()
const userDB = require('../../db/user')

router.post('/',async (req,res) => {
    let {name, pass} = req.body
    console.log(name, pass);
    //验证数据格式
    let nameR = /^[\d]{12,12}$/
    let passR = /^[\w,.?;<>/|\\:'"!@#$%^&*()+-]{6,18}$/
    if(!nameR.test(name) || !passR.test(pass)){
        //说明数据格式不合适，使用者跳过了前端验证
        return res.send({
            code: 1,
            msg:"数据格式错误"
        })
    }
    //检查用户是否存在
    let doc = await userDB.findOne({name})
    if(!doc){
        return res.send({
            code:3,
            msg:"用户不存在"
        })
    }
    if(doc.pass !== pass){
        return res.send({
            code:5,
            msg:"密码错误"
        })
    }
    //处理返回前端数据
    res.send({
        data:doc
    })
    /* user.create({
        user:"201805204118",
        pass:"123456"
    }) */
})

module.exports = router