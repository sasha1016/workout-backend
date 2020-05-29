const express = require('express'); 
const router = express.Router() ; 



const setRouter = require('./set.js') ; 

router.use('/set', setRouter) ; 

module.exports = router ; 
