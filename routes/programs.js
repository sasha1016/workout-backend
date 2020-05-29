const express =require('express') ; 
const router = express.Router() ; 

const Program = require('../models/program.js') ; 

const {ACCESSORY_LIFTS,LIFTS} = require('../commons/index.js'); 

const util = require('util') ; 

// Getting all programs 

router.get('/get',async (req,res) => {

   const responseHandler = (response,error, successCode = 200, errorCode = 500) => {
      if(error === null) {
         res.status(successCode).send(response) ;
      } else {
         res.status(errorCode).send({message:error.message})
      }      
   }

   const _createExclusionConditions = () => {
      if(req.query.exclude === undefined) {
         return {} 
      } else {
         
         var condition = {$and:[]} ; 

         req.query.exclude.map((toExclude) => {
            if(LIFTS.includes(toExclude)) {
               condition.$and.push({lift:{$ne:toExclude}})
            } else {
               if(ACCESSORY_LIFTS.includes(toExclude)) {
                  condition.$and.push({muscleGroup:{$ne:toExclude}})
               } else {
                  condition.$and.push({liftName:{$ne:toExclude}})
               }
            }
         }) ;

         return condition ; 
      }
   }

   try {

      const toExclude = _createExclusionConditions() ;

      if(req.query.filterBy === undefined) {
         await Program.find(toExclude,(error,programs) => {
            responseHandler(programs,error) ; 
         }) ;
      } else {
         const value = req.query.value ; 
         const filterBy = req.query.filterBy ;  

         switch(filterBy) {
            case "_id":
               await Program.findById(value,toReturn,(error,programs) => {
                  responseHandler(programs,error) ; 
               }) ;
               break ; 
            default:
               await Program.find({[filterBy]:value,...toExclude},(error,programs) => {
                  responseHandler(programs,error) ; 
               }) ;
               break ; 
         }
      }
   } catch (error) {
      console.log(error) ; 
      res.status(500).send({message:error.message})
   }

}) ; 

// get specific lifts 

router.get('/get/:type/:lift',async (req,res) => {
   res.send("Getting Specific Lifts") ; 
})

//getting based on lift

router.get('/get/main',async (req,res) => {
   try {
      const query = await Program.find(
                              {liftName:req.query.lift},
                              req.query.keys,
                              (error,programs) => {
                                 if(!error) {
                                    res.status(201).send(programs)
                                 } else {
                                    res.status(400).send({messsage:error.message})
                                 }
                              }
                           )
   } catch (error) {
      res.status(500).send({message:error.message})
   }
}) ; 

// Uploading a program

router.post('/add',async (req,res) => {
   const program = new Program(req.body) ; 

   try {
      const addedProgram = await program.save();
      res.status(200).send(addedProgram) ; 
   } catch (error) {
      console.log(error.message) ; 
      res.status(500).send({message:error.message})
   }
})

// deleting all program 

router.delete('/delete',async (_,res) => {
   Program.deleteMany({},() => res.status(200).send())
})



module.exports = router ; 