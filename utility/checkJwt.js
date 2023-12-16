const jwt = require('jsonwebtoken');

function makeJwt(userid) {
    return jwt.sign({userid: userid}, 'SECRET');
}

function checkJwt(idToken) {
    const result = jwt.verify(idToken, 'SECRET');
    return result;
}

module.exports = {
    makeJwt : makeJwt,
    checkJwt : checkJwt
}