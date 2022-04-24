const express = require('express')
const router = express.Router()
const scoreDB = require('../../db/score')

//存储试卷
router.post('/', async (req, res) => {
    let {list, score, id, difficult} = req.body
    if(!list || !score || !id){
        res.send({
            code:1,
            msg:"上传数据有误"
        })
    }
    await scoreDB.create({
        list: list,
        score: score,
        user: id,
        difficult:difficult
    })
    res.send({
        code:0,
        msg:"dsaf"
    })
})
//拿取试卷
router.post('/download', async(req, res) => {
    let {id} = req.body
    console.log(id);
    let doc = await scoreDB.find({user:id},{},{sort:{date:-1}})
    .populate('user',{pass:0})
    res.send({
        code:0,
        data:doc
    })
})

//拿取历史成绩
router.get('/get', async (req, res) => {
    let doc = await scoreDB.find().populate('user', {pass:0})
    res.send({
        code:0,
        data:doc
    })
})

module.exports = router