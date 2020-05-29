const mongoose = require('mongoose') ;

const COMMONS = require('../commons') ; 

const PROGRAM = `PROGRAM` , SET = `SET` , EXERCISE = `EXERCISE` ; 

const Schema = new mongoose.Schema({
    aspect:{
        type:String,
        enum:[PROGRAM,EXERCISE,SET],
        required:true
    },
    setID:{
        type:mongoose.Schema.Types.ObjectId,
        required:() => this.aspect === SET, 
    }, 
    programID:{
        type:mongoose.Schema.Types.ObjectId, 
        required:() => this.aspect === PROGRAM,
    },
    exerciseID:{
        type:mongoose.Schema.Types.ObjectId,
        required:() => this.aspect === EXERCISE, 
    }, 
    routineElementID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    review:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = mongoose.model('Review',Schema);