function checkAuthStatus(req, res, next) {

    res.locals.idToken = req.session.idToken;
    next();
}

module.exports = checkAuthStatus;