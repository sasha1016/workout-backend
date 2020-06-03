const admin = require('../../config/firebaseAdmin.js'); 
const util = require('util'); 

function verifyAuthToken(req,res,next) {
    if(req.headers.authorization === undefined) res.status(500).send({message:`Not authorized sad`}) ;  

    admin.auth().verifyIdToken(req.headers.authorization)
    .then((decodedToken) => {
        req.body.uid = decodedToken.uid ; 
        next() ; 
    })
    .catch((error) => { 
        res.status(500).send({message:error})
    })
}
module.exports = {verifyAuthToken}; 