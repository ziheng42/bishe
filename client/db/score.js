const mongoose = require('mongoose')
const user = require('./user')
const Schema = mongoose.Schema
let scoreSchema = new Schema({
    list:{
        type:Array,
        required:true
    },
    score:{
        type:Number,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    date:{
        type: Number,
        default: Date.now
    },
    difficult:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('score',scoreSchema)