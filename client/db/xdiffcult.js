const mongoose = require('mongoose')
const Schema = mongoose.Schema

let xuanzeDiff = new Schema({
    //难度
    difficulty:{
        type:String,
        default:'diffcult'
    },
    //题干
    title:{
        type:String,
        required:true
    },
    A:{
        type:String,
        required:true 
    },
    B:{
        type:String,
        required:true 
    },
    C:{
        type:String,
        required:true 
    },
    D:{
        type:String,
        required:true 
    },
    answer:{
        type:String,
        required:true 
    },
    data:{
        type:Number,
        default:Date.now
    }
})

module.exports = mongoose.model('xuanzeDiff', xuanzeDiff)