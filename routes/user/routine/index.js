const express = require('express') ; 
const router = express.Router() ; 

const UserRoutine = require('../../../models/user/routine.js') ;
const UserProgram = require('../../../models/user/program.js') ;
const Middleware = require('../../../components/middleware.js') ; 

// Getting all programs of the user 

const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 

const createPopulateString = (params,day = false) => {
    var populate = ''; 
    if(day === false) {
        params = params.split(",") ; 
        if(params.length === 1) {
            days.map((day) => populate += `${day}.${params[0]} `)
        } else {
            days.map((day) => {
                params.map((param) => populate += `${day}.${param} `) 
            }) 
        }
    } 
    else {
        params.split(",").map(param => populate += `${day}.${param} `) ;  
    }
    return populate ; 

}

router.get('/get', Middleware.verifyUser, async (req,res) => {

    if(req.query.day !== undefined) {
        const path = createPopulateString(req.query.populate,req.query.day) ; 

        await 
        UserRoutine
        .findOne({user:req.query.user}, req.query.day)
        .populate({path:path})
        .exec((error,dayRoutine) => {
            if(error) {
                res.status(500).send({message:error.message}) 
            } else { 
                res.status(201).send(dayRoutine) ; 
            } 
        })  

    } else {
        await 
        UserRoutine
        .findOne({user:(req.query.user)})
        .populate({
            path: req.query.populate ? createPopulateString(req.query.populate) : ""
        })
        .exec((error,userRoutine) => {
            if(error) {
                res.status(500).send({message:error.message}) 
            } else { 
                res.status(201).send(userRoutine)
            }
        })
    }

}) ; 


router.get('/getAll', Middleware.verifyUser, async (req,res) => {

    await UserRoutine.find({}).exec((error,routines) => {
        if(error) {
            res.status(500).send({message:error.message}) 
        } else { 
            res.status(201).send(routines) ; 
        } 
    })  

}) ; 




//Deleting a program in a routine 

router.post('/delete', Middleware.verifyUser, async (req,res) => {
    const toPull = {[req.body.day]:{_id:req.body.routineID}} ; 

    UserProgram
    .findByIdAndUpdate(
        req.body.userProgramID,
        {$pull:{daysSelectedOfTheProgram:{userDaySelected:req.body.day}}},
        {new:true}
    )
    .then(() => {    
        return (
        UserRoutine
        .findOneAndUpdate(
            {user:req.body.user},
            {$pull:toPull},
            {new:true}
        )); 
    })
    .then((updatedUserRoutine) => {
        res.status(201).send(updatedUserRoutine) ; 
    })
    .catch((error) => {
        res.status(500).send({message:error.message}) 
    })

 
}); 


//Deleting a program in a routine 

router.post('/deleteRoutine', Middleware.verifyUser, async (req,res) => {

    try {
        await 
        UserRoutine
        .findOneAndDelete(
            {user:req.body.user},
            (error,updatedUserRoutine) => {
                if(error === null) {
                    res.status(200).send(updatedUserRoutine) ; 
                } else {
                    res.status(500).send({message:error.message})
                }
            }
        )
    } catch (error) {
        res.status(500).send({message:error.message})
    }

 
}); 

router.post('/testDaysSelected',async (req,res) => {
    await UserProgram.findByIdAndUpdate(req.body.userProgramId,
        {$addToSet:{daysSelectedOfTheProgram:req.body.daySelectedOfTheProgram}},
        {new:true},
        (error,updated) => {
            if(!error) {res.status(200).send(updated)} 
            else {res.status(500).send({message:error.message})} ; 
        })
})


// Adding a program to a routine 

router.post('/add', Middleware.verifyUser, async (req,res) => {


    var toAdd = {} ; 
    toAdd[req.body.day] = req.body.toAdd ; 

    var toUpdateUserProgram = {programDaySelected:req.body.daySelectedOfTheProgram,userDaySelected:req.body.day} ; 
    
    UserProgram
    .findByIdAndUpdate(
        req.body.toAdd.userProgram,
        {$addToSet:{daysSelectedOfTheProgram:toUpdateUserProgram}},
        {new:true}
    )
    .then(() => {
        return (UserRoutine
                .findOneAndUpdate({user:req.body.user},{$addToSet:toAdd},{new:true})
                .populate({
                    path: req.body.populate ? createPopulateString(req.body.populate) : ""
                })
        )      
    })
    .then((updatedUserRoutine) => {
        res.status(200).send(updatedUserRoutine)
    })
    .catch((error) => {
        res.status(500).send({message:error.message})
    })
 
}); 


module.exports = router ; 