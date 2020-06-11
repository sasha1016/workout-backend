const express = require('express') ; 
const router = express.Router() ; 

const UserProgram = require('../../models/user/program.js') ; 

const {verifyUser} = require('../../components/middleware.js')

const util = require('util') ; 


// Getting all programs of the user 

router.get('/get', async (req,res) => {

   await UserProgram.find({user:req.query.uid}).populate(req.query.populate || "").exec((error,userPrograms) => {
      if(error) {
         res.status(400).send(error.message) 
      } else { 
         res.status(201).send(userPrograms)
      }
   })

})



//getting based on lift

router.post('/add',async (req,res) => {
   var program = req.body ; 
   program.user = req.body.uid ; 
   delete program.uid ; 
   const userProgram = new UserProgram(program) ; 
   try {
      const addedUserProgram = await userProgram.save() ; 
      res.status(201).send(addedUserProgram) ; 
   } catch (error) {
      res.status(500).send({message:error.message})
   }
}) ; 

// updting current week 

router.post('/update/currentweek',async (req,res) => {
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

router.post('/switch',async (req,res) => {
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


router.post('/end', (req,res) => {
   console.log(req.body) ; 
   UserProgram.findByIdAndDelete(req.body.id)
   .then(() => {
      res.status(201).send(true)
   })
   .catch((error) => {
      res.status(501).send({message:error.message})
   })
})



module.exports = router ; 