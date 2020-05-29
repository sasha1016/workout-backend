const express = require('express') ; 
const router = express.Router() ; 

const Routine = require('../../../models/user/routine.js') ; 
const Middleware = require('../../../components/middleware.js') ; 



//getting based on lift

router.post('/add',[Middleware.verifyUser],async (req,res) => {
   
   
   await Routine.findOneAndUpdate({
                           user:req.body.user,
                           [`${req.body.day}.toComplete.sets`]:{"$elemMatch":{_id:req.body.id}}
                        }, 
                        {$addToSet:{[`${req.body.day}.0.toComplete.0.sets.$.reviews`]:req.body.review}},
                        {new:true},
                        (error,newRoutine) => {
                           if(!error) {
                              res.status(200).send(newRoutine)
                           } else {
                              res.status(500).send({message:error.message})
                           }
                        }) ;                   

   
}) ; 


// switch a user program 

// router.post('/switch',verifyUser,async (req,res) => {
//    const id = req.body.userProgramToSwitch ; 
//    const newProgram = req.body.newProgram ; 

//    const conditional = (req.body.newProgram.liftName !== undefined ? {liftName:req.body.newProgram.liftName} : {muscleGroup:req.body.newProgram.muscleGroup})

//    console.log(id,newProgram,conditional) ; 

//    await UserProgram.findOneAndUpdate(
//                                        {_id:id,...conditional},
//                                        {...newProgram}, 
//                                        {new:true} , 
//                                        (error,updatedUserProgram) => {
//                                           if(error === null) {
//                                              console.log(updatedUserProgram,error) ; 
//                                              res.status(201).send(updatedUserProgram) ; 
//                                           } else {
//                                              res.status(500).send({message:error.message})
//                                           }
//                                        } 
//                                     ) ; 
// }) ; 




module.exports = router ; 