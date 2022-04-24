const express = require('express')
const router = express.Router()
const vedioDB = require('../../db/vedio')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

//上传的准备
const upload = multer({
  //在磁盘中存储 而不是 内存
  storage: multer.diskStorage({
    //存储地址
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "../../public/files/vedio"))
    },
    //存储时的文件名
    filename(req, file, cb) {
      let ext = '.mp4'
      let fileName = Date.now().toString(36) + ext
      req.fileName = fileName
      cb(null, fileName)
    }
  })
}).single("file")

//上传视频
router.post('/vedioUpload', async (req, res) => {
  let newPath = ''
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
    newPath = req.fileName;
    //没有错误
    res.send({
      code: 0,
      msg: '视频上传完成',
      data: newPath
    })
  })
})

//储存文件路径和小组成员至数据库
router.post('/vedioCreate', async (req, res) => {
  let { name, url } = req.body
  if (!name || !url) {
    return res.send({
      msg: '数据出错误',
      code: 1
    })
  }
  let cunzai = await vedioDB.findOne({ name })
  if (cunzai) {
    return res.send({
      code: 2,
      msg: '请勿重复上传'
    })
  }
  await vedioDB.create({
    name,
    newPath: '/files/vedio/' + url
  })
  res.send({
    code: 0,
    msg: '信息上传成功'
  })
})

//获取数据
router.get('/getVedio', async (req, res) => {
  let data = await vedioDB.find({}, {}, { sort: { date: -1 } })
  res.send({
    code: 0,
    msg: '查询成功',
    data: data
  })
})

//对视频进行打分
router.post('/score', async (req, res) => {
  let { item, username } = req.body
  console.log(item, username);
  let message = await vedioDB.findById(item._id)
  console.log(message);
  let arrname = message.name.split(',')
  if (arrname.indexOf(username) + 1) {
    return res.send({
      code: 2,
      msg: '本组成员不可以评分'
    })
  }
  if (message.arr.indexOf(username) + 1) {
    return res.send({
      code: 1,
      msg: '请勿重复打分'
    })
  }
  //添加评分成员信息
  message.arr.push(username)
  message.score.push(item.score)
  try {
    await vedioDB.updateOne({ _id: item._id }, { arr: message.arr, score:message.score })
  } catch (error) {
    res.send({
      code:4,
      msg:error
    })
  }
  res.send({
    code:0,
  })
})

module.exports = router