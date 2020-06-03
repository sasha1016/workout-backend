const express = require('express') ; 
const router = express.Router() ; 
const admin = require('../../../config/firebaseAdmin.js'); 


router.get('/get/details',async (req,res) => {
   admin.auth().getUser(req.query.uid)
   .then((record) => {
       res.status(200).send(record) 
   })
   .catch(error => {
       res.status(500).send({message:error.message})
   })
})



module.exports = router ; 