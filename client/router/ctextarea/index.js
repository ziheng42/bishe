const express = require('express')
const router = express.Router()
const textareaDB = require('../../db/textarea')

//留言
router.post('/report',async (req,res)=>{
    let {message} = req.body
    //验证信息是否为空
    if((!message.title) || (!message.textarea)){
        return res.send({
            code:1,
            msg:'请输入信息后提交'
        })
    }
    //创建数据库
    await textareaDB.create({
        title: message.title,
        textarea:message.textarea,
        user:message.id
    })
    //返回前端
    res.send({
        code: 0,
        msg: "留言成功"
    })
    
})
//获取留言数据
router.get('/get', async(req, res) => {
    let data = await textareaDB
    .find({},{},{sort:{date:-1}})
    .populate('user',{pass:0})
    .populate('children.user',{pass:0})
    .populate('children.replyUser',{pass:0})

    res.send({
        code:0,
        mag:"查询成功",
        data
    })
})
//子留言回复
router.post('/reply', async (req, res) => {
    //验证数据是否为空
    let {textarea, _id, replayUserId, userId} = req.body
    console.log(textarea, _id, replayUserId, userId);
    if(!textarea || !_id || !replayUserId || !userId){
        return res.send({
            code:1,
            msg:'数据格式不正确'
        })
    }
    //储存
    try {
        await textareaDB.findByIdAndUpdate(_id,{
            $push:{
                children:{
                    textarea,
                    user:userId,
                    replyUser:replayUserId
                }
            }
        })
        res.send({
            code:0,
            msg:"回复成功"
        })
    } catch (error) {
        res.send({
            code:4,
            msg:error
        })
    }
})

module.exports = router