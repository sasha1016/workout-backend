const admin = require('admin') ; 

function _getAuthToken(req,_,next) {
    if(
        req.headers.authorization && 
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1] ; 
    } else {
        req.authToken = null ;
    }
    next() ; 
}

function verifyToken(req,res,next) {
    _getAuthToken(req,res,() => {
        const {authToken} = req ; 
        admin.auth().verifyToken(authToken)
        .then((authId) => {
            req.authId = authId ;
            return next() ; 
        })
        .catch(() => {
            res.send(500).send({message:'You are not authorized to make this request.'}) ; 
        })
    })
} 

module.exports = {
    verifyToken
}