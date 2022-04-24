const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const Schema = mongoose.Schema

let vedioSchema = new Schema ({
   name:{
       type:String,
       required:true
   },
    //留言时间
    date:{
        type: Number,
        default: Date.now
    },
   newPath:{
       type:String,
       required:true
   },
   arr:{
       type:Array,
       default:[]
   },
   score:{
    type:Array,
    default:[]
   }
})

module.exports = mongoose.model('vedio',vedioSchema)
