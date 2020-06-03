const admin = require('../../config/firebaseAdmin.js'); 
const express = require('express');
const router = express.Router() ;

const User = require('../../models/user/user.js')

router.post('/signup',async (req,res) => {
    const {email,password,fname,lname} = req.body ; 

    var user = new User({email,firstName:fname,lastName:lname}) ; 
    user.save()
    .then((doc) => {
        return admin.auth().createUser({
            uid:doc._id.toString(),
            email,
            password,
            displayName:`${fname} ${lname}`,
            disabled:false,
            emailVerified:false,
        })
    })
    .then((user) => {
        res.status(200).send(user); 
    })
    .catch((error) => {
        res.status(501).send(error) ; 
    })
}) ;



router.post('/getToken', async (req,res) => {
    admin.auth().createCustomToken(req.body.uid)
    .then((token) => {
        res.status(200).send({token})
    })
    .catch((error) => {
        res.send(500).send({message:error.message})  
    })
})


module.exports = router ; 