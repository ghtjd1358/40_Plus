const jwt = require('jsonwebtoken');
require('dotenv').config()
function makeAccessJwt(userid) {
    return jwt.sign({userid: userid}, process.env.SECRETKEY, {expiresIn: 30 * 60});
}

function makeRefreshJwt(userid, name) {
    return jwt.sign({userid: userid, name: name}, process.env.SECRETKEY, {expiresIn: '14d'} );
}

function checkJwt(idToken) {
    const result = jwt.verify(idToken, process.env.SECRETKEY);
    return result;
}

module.exports = {
    makeAccessJwt : makeAccessJwt,
    checkJwt : checkJwt,
    makeRefreshJwt : makeRefreshJwt
}