const admin = require('../../config/firebaseAdmin.js'); 
const util = require('util'); 

function verifyAuthToken(req,res,next) { 
    if(req.headers.authorization === undefined) res.status(500).send({message:`You are not authorized to view this route`}) ;  

    admin.auth().verifyIdToken(req.headers.authorization)
    .then((decodedToken) => {
        req.body.uid = decodedToken.uid ; 
        req.query.uid = decodedToken.uid ; 
        next() ; 
    })
    .catch((error) => { 
        res.status(500).send({message:error})
    })
}
module.exports = {verifyAuthToken}; 