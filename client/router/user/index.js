const express = require('express')
const router = express.Router()
const userDB = require('../../db/user')
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//上传的准备
const upload = multer({
    //在磁盘中存储 而不是 内存
    storage: multer.diskStorage({
        //存储地址
        destination(req, file, cb) {
            cb(null, path.join(__dirname, "../../public/files/img/photo"))
        },
        //存储时的文件名
        filename(req, file, cb) {
            let ext = /png/.test(file.mimetype) ? ".png" : ".jpg"
            let fileName = Date.now().toString(36) + ext
            req.fileName = fileName
            cb(null, fileName)
        }
    })
}).single("file")
//修改名称
router.post('/name', async (req, res) => {
    let { user, id } = req.body
    console.log(user, id);
    if (!user || !id) {
        return res.send({
            code: 1,
            msg: '数据格式错误'
        })
    }
    //查找
    await userDB.findOneAndUpdate({_id:id}, { xingming: user })
    res.send({
        code: 0,
        msg: '修改成功'
    })
})
//修改密码
router.post('/pass', async (req, res) => {
    let { oldPass, pass, id } = req.body
    let doc = await userDB.findOne({ id })
    //原密码输入错误
    if (oldPass !== doc.pass) {
        return res.send({
            code: 2,
            msg: "原密码错误"
        })
    }
    await userDB.updateOne({ id }, { pass })
    //返回前端
    res.send({
        code: 0,
        msg: "密码修改成功"
    })
})
//头像上传
router.post("/avatar", async (req, res) => {
    let { id } = req.body
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.send({
                code: 1,
                msg: "A Multer error occurred when uploading."
            })
        } else if (err) {
            return res.send({
                code: 2,
                msg: "An unknown error occurred when uploading."
            })
        }

        //没有错误
        let doc = await userDB.findOne({ id })

        //删除原来的photo文件
        let oldPhoto = doc.photo
        if (!/default\.jpg/.test(oldPhoto)) {
            fs.unlink(path.join(__dirname, "../../public" + oldPhoto), () => { })
        }

        //更新数据库头像字段
        let newPath = "/files/img/photo/" + req.fileName
        await userDB.updateOne({ id }, { photo: newPath })
        let docn = await userDB.findOne({id})
        //返回前端
        res.send({
            code: 0,
            msg: "头像上传完成",
            data:docn
        })

    })
})
module.exports = router