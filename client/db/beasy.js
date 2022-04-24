const mongoose = require('mongoose')
const Schema = mongoose.Schema

let beasy = new Schema({
    //难度
    difficulty:{
        type:String,
        default:'easy'
    },
    //题干
    title:{
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

module.exports = mongoose.model('beasy', beasy)