const mongoose = require('mongoose') ; 

const UserRoutine = require('./routine.js')

const Schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        required:false,
        default:false
    }

})

Schema.post('save',async (doc,next) => {
    const userRoutine = new UserRoutine({user:doc._id}) ; 
    try {
       await userRoutine.save() ; 
       next() ; 
    } catch (error) {
       next(new Error(error.message))
    }
})



module.exports = mongoose.model('User',Schema);