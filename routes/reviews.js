const express =require('express') ; 
const router = express.Router() ; 

const {verifyUser} = require('../components/middleware') ; 

const Review = require('../models/reviews.js') ; 

router.post('/add', verifyUser , async (req,res) => {
    let reviewsToAdd = req.body.reviews.map((review) => {return {...review,user:req.body.user}}) ; 

    await Review.insertMany(reviewsToAdd,(error) =>{
        if(!error) {
            res.status(200).send("Added") ; 
        } else {
            res.status(500).send({message:error.message}) ; 
        }
    })
})

router.post('/add/exercises', async (req,res) => {
    
})

router.post('/add/programs', async (req,res) => {
    
})

module.exports = router ; 