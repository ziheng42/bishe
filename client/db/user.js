const mongoose = require('mongoose')
const Schema = mongoose.Schema


let userSchema = new Schema({
    //用户名
    xingming:{
        type:String,
        required:true
    },
    //学号
    name:{
        type: String,
        required: true
    },
    //密码
    pass:{
        type: String,
        required: true
    },
    //头像   [数据库中存不了照片,存的是地址]
    /* 默认头像放在前端还是后端？？？  ---后端，最终上线后是后端的    展示文件需要静态资源库*/
    photo:{
        type: String,
        default: '/files/img/photo/default.jpg'
    },
    student:{
        type: Boolean,
        default: true
    },
    teacher:{
        type: Boolean,
        default: false
    },
    //admin
    admin:{
        type: Boolean,
        default: false
    },
    //创建时间
    date:{
        type: Number,
        default: Date.now
    },
    
})
//建立一个users得数据表，系统会默认给user后边加上一个s。
module.exports = mongoose.model('user', userSchema)