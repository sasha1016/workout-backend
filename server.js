require('dotenv').config()

const express = require('express'); 
const app = express() ; 
const mongoose = require('mongoose') ; 
const errorHandler = require('errorhandler') ; 
const http = require('http') ;
const winston = require('winston') ; 

const { verifyAuthToken } = require('./routes/auth/middleware') ;
if(process.env.NODE_ENV === 'production') {
    app.use(errorHandler()) ; 
    app.set('port',process.env.PRODUCTION_PORT) ; 
    mongoose.connect(process.env.PRODUCTION_DB, {useNewUrlParser:true,useUnifiedTopology:true}) ; 
} else {
    app.use(errorHandler({
        dumpExceptions:true,
        showStack:true
    }))
    app.set('port',process.env.DEV_PORT) ; 
    mongoose.connect(process.env.DEV_DB, {useNewUrlParser:true,useUnifiedTopology:true}) ; 
}

const db = mongoose.connection ; 
db.on('error',(error) => console.log(error)); 
db.once('open', () => {}) ; 

app.use(express.json()) ; 

function authenticate(req,res,next) {
    if(req.path.split(`/`)[1] === 'auth'){ next(); return false }; 
    verifyAuthToken(req,res,next) ; 
}

const programRouter = require('./routes/programs.js') ; 
const userRouter = require('./routes/user/index.js') ; 
const reviewRouter = require('./routes/reviews.js') ;  
const auth = require('./routes/auth/index.js') ; 

app.all('*', authenticate) ; 

app.use('/auth', auth) ; 
app.use('/programs', programRouter) ; 
app.use('/user', userRouter) ; 
app.use('/reviews', reviewRouter) ; 

app.listen(3000) ; 

const server = http.createServer(app) ;

const boot = () => {
    server.listen(app.get('port'),() => {
        console.log(`Running on port ${app.get('port')}`)
    })
}

const shutdown = () => {
    server.close(process.exit) ; 
}

server.on('error',(error) => {
    winston.log(`error`, error)
})

process.on('uncaughtException', (error) => {
    winston.log(`uncaughtException: ${error.message} & ${error.stack}`)
})

if(require.main === module) {
    boot() ; 
} else {
    exports.boot = boot ; 
    exports.shutdown = shutdown ; 
    exports.port = app.get('port') ; 
}