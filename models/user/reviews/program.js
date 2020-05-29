const mongoose = require('mongoose') ; 

const ProgramReviewSchema = new mongoose.Schema({
    skipped:{
        type:Boolean,
        default:false,
    },
    reason:{
        type:String,
        enum:['time','social','tired'],
        required:() => this.skipped,
    },
    timeTaken:{
        type:Number,
        required:true,
        default:0,
        min:[1,`Set cannot have taken less than one second`],
        required:() => {return !this.skipped}
    }
})

module.exports = {ProgramReviewSchema} ;