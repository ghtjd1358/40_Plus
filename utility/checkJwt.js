const jwt = require('jsonwebtoken');

function makeAccessJwt(userid) {
    return jwt.sign({userid: userid}, 'SECRET', {expiresIn: 30 * 60});
}

function makeRefreshJwt(userid, name) {
    return jwt.sign({userid: userid, name: name}, 'SECRET', {expiresIn: '14d'} );
}

function checkJwt(idToken) {
    const result = jwt.verify(idToken, 'SECRET');
    return result;
}

module.exports = {
    makeAccessJwt : makeAccessJwt,
    checkJwt : checkJwt,
    makeRefreshJwt : makeRefreshJwt
}