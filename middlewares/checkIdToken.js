const checkJwt = require('../utility/checkJwt');

function checkAuthStatus(req, res, next) {
    res.locals.idToken = req.session.idToken;
    
    if (req.session.idToken) {
        const result = checkJwt.checkJwt(req.session.idToken);
        if (result.userid) {
            res.locals.userid = result.userid;
        }
    }

    next();
}

module.exports = checkAuthStatus;