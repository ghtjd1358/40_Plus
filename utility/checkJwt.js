const jwt = require('jsonwebtoken');

function makeJwt(userid) {
    return jwt.sign({userid: userid}, 'SECRET');
}

function makeSignupJwt(userid) {
    return jwt.sign({userid: userid}, 'SECRET', {expiresIn: '1d'} );
    // expiresIn 추후 기간 수정
}

function checkJwt(idToken) {
    const result = jwt.verify(idToken, 'SECRET');
    return result;
}

module.exports = {
    makeJwt : makeJwt,
    checkJwt : checkJwt,
    makeSignupJwt : makeSignupJwt
}