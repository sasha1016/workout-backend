const express = require('express') ; 
const router = express.Router() ; 

const User = require('../../models/user/user.js') ; 

//getting based on lift

router.post('/add',async (req,res) => {

   const user = new User(req.body) ; 
   user.save().then((newUser) => {
      res.status(200).send(newUser) ; 
   }).catch((error) => {
      res.status(500).send({message:error.message})
   }) ; 

}) ; 

router.delete('/delete',async (req,res) => {
   User.findByIdAndDelete(req.body.id,(error) => {
      if(error) {
         res.status(500).send({message:error.message})
      } else {
         res.status(200).send(true) ; 
      }
   })
})

router.delete('/deleteAll',async (req,res) => {

   await User.deleteMany({},(error) => {
      if (error) {res.status(500).send({message:error.message})}
      res.status(200).send("deleted") ; 
   })


}) ; 

router.get('/get',async (_,res) => {
   try {
      await User.find((error,programs) => {
         if(error === null) {
            res.status(201).send(programs) ;
         } else {
            res.status(500).send({message:error.message})
         }      
      }) ;
   } catch (error) {
      res.status(500).send({message:error.message})
   }

}) ; 



module.exports = router ; 