const User = require('../models/user/user.js') ; 

function verifyUser(req,res,next) {
   try {
      User.exists({_id:req.query.user || req.body.user},(error) => {
         if(error) { 
            res.status(400).send({message:'User does not exist.'})
         } else {
            next(); 
         }
     })
   } catch (error) {
      res.status(500).send({message:'Something went wrong. Please try again.'})
   }
} ; 

module.exports = {
    verifyUser
}