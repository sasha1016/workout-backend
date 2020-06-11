const mongoose = require('mongoose') ; 

const Program = require('../../models/program.js') ;

const oneRepMaxSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    oneRM:{
        type:Number,
        required:true
    }
}) ; 

const daySelectedSchema= new mongoose.Schema({
    programDaySelected:{
        type:String,
        required:true
    }, 
    userDaySelected:{
        type:String,
        required:true
    }
})


const Schema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    program:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Program',
    },
    workoutsCompleted:{
        type:Number,
        required:false,
        default:0,
    },
    commenced:{
        type:String,
        required:true
    },
    currentWeek:{
        type:Number,
        required:false,
        default:0,
    },
    oneRepMaxes:[{
        type:oneRepMaxSchema,
        required:true
    }],
    daysSelectedOfTheProgram:[{
        type:daySelectedSchema,
        default:[]
    }],
    ended:{
        type:Boolean,
        default:false,
        required:false
    }


})

Schema.pre('save',(next) => {
    Program.exists({_id:this.program} , (error) => {
        if(error) { 
            next(new Error("Program doesn't exist")) ; 
        } else {
            next(); 
        }
    }) 
})



module.exports = mongoose.model('UserProgram',Schema);