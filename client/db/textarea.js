const mongoose = require('mongoose')
const Schema = mongoose.Schema
 let textareaSchema = new Schema({
     //留言标题
     title:{
        type:String,
        required:true
     },
     //留言内容
     textarea:{
         type:String,
         required: true
     },
     //时间
     date:{
         type: Number,
         default: Date.now
     },
     //用户
     user:{
         type:Schema.Types.ObjectId,
         ref:"user",
         required:true,
     },
     //点赞
     likes:[Schema.Types.ObjectId],
     //子留言
     children:[{
        //内容
         textarea:{
             type:String,
             required:true
         },
        //留言时间
         date:{
            type: Number,
            default: Date.now
        },
        //留言用户
        user:{
            type:Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        //点赞数
        likes:[Schema.Types.ObjectId],
        //回复的用户
        replyUser: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
     }]
 })


module.exports = mongoose.model('textarea', textareaSchema)