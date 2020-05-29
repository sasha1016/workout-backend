const mongoose = require('mongoose') ; 


const DaySchema = new mongoose.Schema({
    program:{
        ref:'Program',
        type:mongoose.Schema.Types.ObjectId
    },
    userProgram:{
        ref:'UserProgram',
        type:mongoose.Schema.Types.ObjectId
    }
})

const Schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    sunday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
    monday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
    tuesday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
    wednesday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
    thursday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
    friday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
    saturday:[{
        type:DaySchema,
        default:[],
        required:false
    }], 
})



module.exports = mongoose.model('Routine',Schema);