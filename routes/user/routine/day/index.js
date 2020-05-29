import {verifyUser} from '../../../../components/middleware'

const express = require('express') ; 
const router = express.Router() ; 

const UserRoutine = require('../../models/user/routine.js') ; 


// Getting all programs of the user 

router.get('/get', verifyUser, async (req,res) => {

    await UserRoutine.find({userId:(req.query.userId || req.body.userId)}, (error,userRoutines) => {
        if(error) {
            res.status(500).send({message:error.message}) 
        } else { 
            res.status(201).send(userRoutines)
        }
    })

}) ; 


module.exports = router ; 