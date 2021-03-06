const express = require('express'); 
const router = express.Router() ; 

const programRouter = require('./programs.js') ; 
const routineRouter = require('./routine/index.js') ; 
const reviewRouter = require('./review/index.js') ; 
const selfRouter = require('./self/index.js') ; 

router.use('/programs', programRouter) ; 
router.use('/routines', routineRouter) ; 
router.use('/reviews', reviewRouter) ; 
router.use('/self',selfRouter)

module.exports = router ; 



