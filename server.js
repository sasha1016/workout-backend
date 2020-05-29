require('dotenv').config()

const express = require('express'); 
const app = express() ; 


const mongoose = require('mongoose') ; 

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true,useUnifiedTopology:true}) ; 

const db = mongoose.connection ; 
db.on('error',(error) => console.log(error)); 
db.once('open', () => console.log('Database connected')) ; 

app.use(express.json()) ; 



const programRouter = require('./routes/programs.js') ; 
const userRouter = require('./routes/user/index.js') ; 
const userFunctionsRouter = require('./routes/user/user.js') ; 
const reviewRouter = require('./routes/reviews.js') ; 
const auth = require('./routes/auth/index.js') ; 

app.use('/programs', programRouter) ; 
app.use('/user', userRouter) ; 
app.use('/users', userFunctionsRouter) ; 
app.use('/reviews', reviewRouter) ; 
app.use('/auth', auth) ; 

//app.use('/users/*',auth)

app.listen(3000, () => console.log("Welcome")) ; 