const mongoose = require('mongoose') ;

const COMMONS = require('../commons') ; 


const SetSchema = new mongoose.Schema({
    reps:{
        type:Number,
        required:true, 
    },
    percentage:{
        type:Number,
        required:false,
    },
    weightIncrement:{
        type:Number,
        required:false
    }
})

const ExerciseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }, 
    sets: [{
        type:SetSchema,
    }]

})

const DaySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        enum:COMMONS.DAYS
    },
    week:{
        type:Number,
        required:false,
    },
    toComplete:[
        {
            type:ExerciseSchema,
            required:true
        }
    ], 
    lastDayOfWeek:{
        type:Boolean,
        required:true
    }
}) ; 

const Schema = new mongoose.Schema({
    name: String,
    weightFactor: {
        type:String,
        enum:COMMONS.WEIGHT_FACTORS,
        required:true
    },
    lift:{
        type:String,
        enum:COMMONS.LIFTS,
        required:true
    },
    muscleGroup:{
        type:String,
        enum:COMMONS.ACCESSORY_LIFTS,
        required:() => {
            return this.lift === COMMONS.ACCESSORY
        }
    },
    liftName:{
        type:String,
        enum:COMMONS.MAIN_LIFTS,
        required: () => {
            return this.lift === COMMONS.MAIN
        }
    },
    type:{
        type:String,
        enum:COMMONS.LIFT_TYPES,
        required:true,
    },
    frequency: {
        type:Number,
        min:[1,'Frequency has to be at least once a week.'],
        max:[7,'Frequency cannot be more than 7 times a week.'],
    },
    rating:{
        type:Number,
        min:[0,`Rating can't be less than 0`],
        max:[5,`Rating can't be more than 5`]
    },
    duration:{
        type:Number,
        required:true,
        min:[1,`Duration has to be greater than 1 week`]
    },
    days:[{type:DaySchema}],
    preferredDays:[{
        type:String,
        enum:COMMONS.DAYS
    }],
    uniqueLifts:[{
        type:String,
        required:true,
    }]

})

module.exports = mongoose.model('Program',Schema);