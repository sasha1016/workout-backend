const mongoose = require('mongoose') ; 

const SetReviewSchema = new mongoose.Schema({
    skipped:{
        type:Boolean,
        default:false,
    },
    reason:{
        type:String,
        enum:['time','social','tired'],
        required:() => this.skipped,
    },
    date:{
        type:String,
        requred:true
    },
    timeTaken:{
        type:Number,
        default:0,
        min:[1,`Set cannot have taken less than one second`],
        required:() => {return !this.skipped}
    },
    technique:{
        type:Number,
        required:true,
        min:[0,`Technique cannot be less than 0`], 
        max:[10,`Technique is based on a scale from 0-10. It cannot be greater than 10`],
        required:() => {return !this.skipped}
    },
    rating:{
        type:Number,
        required:true,
        min:[0,`Technique cannot be less than 0`], 
        max:[10,`Technique is based on a scale from 0-10. It cannot be greater than 10`],
        required:() => {return !this.skipped}
    },
    completedAsPlanned:{
        type:Boolean,
        required:true,
        default:true,
        required:() => {return !this.skipped}
    },
    setBreakdown:[{
        type:Number,
        required: () => {
            return !(this.completedAsPlanned === true && !this.skipped)
        }
    }]
})

module.exports = {SetReviewSchema} ; 
