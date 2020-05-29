const admin = require('firebase-admin') ; 
const util = require('util') ; 
const serviceCert = require('../config/skrtr-2ae42-firebase-adminsdk-rdyra-2ce1e0ea61.json')

admin.initializeApp({
    credential:admin.credential.cert(serviceCert),
    databaseURL: "https://skrtr-2ae42.firebaseio.com",
}) ;

module.exports = admin