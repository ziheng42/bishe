const express = require('express')
const router = express.Router()
const xeasyDB = require('../../db/xeasy')
const xmiddleDB = require('../../db/xmiddle')
const xdiffcultDB = require('../../db/xdiffcult')
const xdiffcult = require('../../db/xdiffcult')
const beasyDB = require('../../db/beasy')
const bdifficultDB = require('../../db/bdifficult')
//文件上传题目
router.post('/upload', async (req, res) => {
    let { arr } = req.body
    let docEasy = await xeasyDB.find(),
        docMiddle = await xmiddleDB.find(),
        docDiffcult = await xdiffcultDB.find(),
        Array = [];
    Array = [...docEasy, ...docMiddle, ...docDiffcult]
    //去重
    for (let i = 0; i < Array.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            let first = Array[i].title,
                second = arr[j].title
            if (first == second) {
                arr.splice(j, 1)
            }
        }
    }
    try {
        for (let i = 0; i < arr.length; i++) {
            console.log(123);
            let item = arr[i]
            let difficult = arr[i].difficult
            console.log(item, difficult);
            if (difficult === 'easy') {
                await xeasyDB.create({
                    title: item.title,
                    A: item.A,
                    B: item.B,
                    C: item.C,
                    D: item.D,
                    answer: item.answer
                })
            } else if (difficult === 'middle') {
                await xmiddleDB.create({
                    title: item.title,
                    A: item.A,
                    B: item.B,
                    C: item.C,
                    D: item.D,
                    answer: item.answer
                })
            } else if (difficult === 'difficult') {
                await xdiffcult.create({
                    title: item.title,
                    A: item.A,
                    B: item.B,
                    C: item.C,
                    D: item.D,
                    answer: item.answer
                })
            }
        }
    } catch (error) {
        res.send({
            code: 1,
            msg: error
        })
    }

    res.send({
        code: 0,
    })
})
//单个题目上传
router.post('/uploadOne', async (req, res) => {
    let { xuanze, radio } = req.body
    let docEasy = await xeasyDB.find(),
        docMiddle = await xmiddleDB.find(),
        docDiffcult = await xdiffcultDB.find(),
        Array = [];
    Array = [...docEasy, ...docMiddle, ...docDiffcult]
    //去重
    for (let i = 0; i < Array.length; i++) {
        let first = Array[i].title,
            second = xuanze.title
        if (first == second) {
            return res.send({
                code: 1,
                msg: "题目已被上传"
            })
        }
    }
    try {
        console.log(radio);
        let difficult = radio
        let item = xuanze
        if (difficult === 'easy') {
            await xeasyDB.create({
                title: item.title,
                A: item.A,
                B: item.B,
                C: item.C,
                D: item.D,
                answer: item.answer
            })
        } else if (difficult === 'middle') {
            await xmiddleDB.create({
                title: item.title,
                A: item.A,
                B: item.B,
                C: item.C,
                D: item.D,
                answer: item.answer
            })
        } else if (difficult === 'difficult') {
            await xdiffcult.create({
                title: item.title,
                A: item.A,
                B: item.B,
                C: item.C,
                D: item.D,
                answer: item.answer
            })
        }
        res.send({
            code: 0,
            msg: '题目添加成功'
        })
    } catch (error) {
        res.send({
            code: 1,
            msg: error
        })
    }

})
//单个编程题目上传
router.post('/uploadOneBian', async (req, res) => {
    let { biancheng, radiob } = req.body
    let docEasy = await beasyDB.find(),
        docDiffcult = await bdifficultDB.find(),
        Array = [];
    Array = [...docEasy, ...docDiffcult]
    //去重
    for (let i = 0; i < Array.length; i++) {
        let first = Array[i].title,
            second = biancheng.title
        if (first == second) {
            return res.send({
                code: 1,
                msg: "题目已被上传"
            })
        }
    }
    try {
        let difficult = radiob
        let item = biancheng
        if (difficult === 'easy') {
            await beasyDB.create({
                title: item.title,
                answer: item.answer
            })
        } else if (difficult === 'difficult') {
            await bdifficultDB.create({
                title: item.title,
                answer: item.answer
            })
        }
        res.send({
            code: 0,
            msg: '题目添加成功'
        })
    } catch (error) {
        res.send({
            code: 1,
            msg: error
        })
    }

})
//请求数据展示
router.get('/get', async (req, res) => {
    try {
        let Easy = await xeasyDB.find({}, {}, { sort: { data: -1 } }),
            Middle = await xmiddleDB.find({}, {}, { sort: { data: -1 } }),
            Diffcult = await xdiffcultDB.find({}, {}, { sort: { data: -1 } })
        res.send({
            code: 0,
            data: {
                Easy,
                Middle,
                Diffcult
            }
        })
    } catch (error) {
        res.send({
            code: 1,
            msg: error
        })
    }

})
//删除数据
router.post('/delete', async (req, res) => {
    let { item } = req.body
    console.log(item);
    try {
        if (item.difficulty == 'easy') {
            await xeasyDB.deleteOne({ _id: item._id })
        } else if (item.difficulty == 'middle') {
            await xmiddleDB.deleteOne({ _id: item._id })
        } else if (item.difficulty == 'diffcult') {
            await xdiffcultDB.deleteOne({ _id: item._id })
        } else {
            res.send({
                code: 1,
                msg: '出现未知错误'
            })
        }
    } catch (error) {
        res.send({
            code: 2,
            msg: error
        })
    }
    res.send(
        {
            code: 0,
            msg: "删除成功"
        }
    )
})
//抽取选择试题考试
router.post('/download', async (req, res) => {
    let { difficult } = req.body
    if (!difficult) return res.send({
        code: 1,
        msg: '请求出现错误'
    })
    let Easy = await xeasyDB.find({}, {}, { sort: { data: -1 } }),
        Middle = await xmiddleDB.find({}, {}, { sort: { data: -1 } }),
        Diffcult = await xdiffcultDB.find({}, {}, { sort: { data: -1 } })
    if (difficult === 'easy') {
        let arr = []
        for (let i = 0; i < 20; i++) {
            let item = Math.floor(Math.random() * (Easy.length - 1))
            arr.push(Easy[item])
            Easy.splice(item, 1)
        }
        for (let i = 0; i < 10; i++) {
            let item = Math.floor(Math.random() * (Middle.length - 1))
            arr.push(Middle[item])
            Middle.splice(item, 1)
        }
        res.send({
            code: 0,
            data: arr
        })
    } else if (difficult === 'middle') {
        let arr = []
        for (let i = 0; i < 10; i++) {
            let item = Math.floor(Math.random() * (Easy.length - 1))
            arr.push(Easy[item])
            Easy.splice(item, 1)
        }
        for (let i = 0; i < 10; i++) {
            let item = Math.floor(Math.random() * (Middle.length - 1))
            arr.push(Middle[item])
            Middle.splice(item, 1)
        }
        for (let i = 0; i < 10; i++) {
            let item = Math.floor(Math.random() * (Diffcult.length - 1))
            arr.push(Diffcult[item])
            Diffcult.splice(item, 1)
        }
        res.send({
            code: 0,
            data: arr
        })
    } else if (difficult === 'difficult') {
        let arr = []
        for (let i = 0; i < 10; i++) {
            let item = Math.floor(Math.random() * (Middle.length - 1))
            arr.push(Middle[item])
            Middle.splice(item, 1)
        }
        for (let i = 0; i < 20; i++) {
            let item = Math.floor(Math.random() * (Diffcult.length - 1))
            arr.push(Diffcult[item])
            Diffcult.splice(item, 1)
        }
        res.send({
            code: 0,
            data: arr
        })
    }
})
//抽取编程题目
router.post('/downloadB', async (req, res) => {
    let Easy = await beasyDB.find({}, {}, { sort: { data: -1 } }),
        Diffcult = await bdifficultDB.find({}, {}, { sort: { data: -1 } })
    let arr = []
    let item = Math.floor(Math.random() * (Easy.length - 1))
    arr.push(Easy[item])
    let Ditem = Math.floor(Math.random() * (Diffcult.length - 1))
    console.log(item,Ditem);
    arr.push(Diffcult[Ditem])
    res.send({
        code: 0,
        data:{
            arr:arr
        }
    })
})
module.exports = router