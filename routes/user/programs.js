const express = require('express') ; 
const router = express.Router() ; 

const UserProgram = require('../../models/user/program.js') ; 

const {verifyUser} = require('../../components/middleware.js')

const util = require('util') ; 


// Getting all programs of the user 

router.get('/get', verifyUser, async (req,res) => {

   await UserProgram.find({user:req.query.user}).populate(req.query.populate || "").exec((error,userPrograms) => {
      if(error) {
         res.status(400).send(error.message) 
      } else { 
         res.status(201).send(userPrograms)
      }
   })

})



//getting based on lift

router.post('/add',verifyUser,async (req,res) => {
   const userProgram = new UserProgram(req.body) ; 
   try {
      const addedUserProgram = await userProgram.save() ; 
      res.status(201).send(addedUserProgram) ; 
   } catch (error) {
      res.status(500).send({message:error.message})
   }
}) ; 

// updting current week 

router.post('/update/currentweek',verifyUser,async (req,res) => {
   UserProgram.findByIdAndUpdate(
      req.body.id,
      {$inc:{currentWeek:1}}, 
      {new:true} 
   )
   .then((userProgram) => {
      res.status(201).send(userProgram) ; 
   })
   .catch((error) => {
      res.status(500).send({message:error.message})
   })
}) ; 


// switch a user program 

router.post('/switch',verifyUser,async (req,res) => {
   var id = req.body.programFrom ; 
   var programTo = req.body.programTo ; 

   await UserProgram.findOneAndUpdate(
                                       {_id:id},
                                       programTo, 
                                       {new:true} , 
                                       (error,updatedUserProgram) => {
                                          if(error === null) {
                                             res.status(201).send(updatedUserProgram) ; 
                                          } else {
                                             res.status(500).send({message:error.message})
                                          }
                                       } 
                                    ) ; 
}) ; 




// deleting all posts 

router.delete('/delete', async (req,res) => {
   UserProgram.deleteMany({userId:req.body.user}, (error) => {
      if(error) {
         res.status(500).send("An error occured try again later") ; 
      } else {
         res.status(200).send("Deleted") ; 
      }
   })
})



module.exports = router ; 