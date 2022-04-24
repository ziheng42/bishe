const express = require('express')
const router = express.Router()

//登录接口
router.use('/login',require('./clogin/index'))

//注册接口
router.use('/reg' ,require('./creg/index'))

//修改用户信息接口
router.use('/user', require('./user/index'))

//留言接口
router.use('/textarea',require('./ctextarea/index'))

//视频接口
router.use('/vedio', require('./cVedio/index'))

//题库接口
router.use('/tiku', require('./tiku/index'))

//存储试卷接口
router.use('/score', require('./score/index'))

//编程题目判断的入口
router.use('/biancheng', require('./biancheng/index'))

module.exports = router