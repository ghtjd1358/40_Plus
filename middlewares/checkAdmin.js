function checkAdmin(req, res, next) {
    if (req.session.userid === 'admin') {
        req.session.isAdmin = true;
        res.locals.isAdmin = true;
        return next();
    }
    req.session.isAdmin = null;
    res.locals.isAdmin = null;
    next();
}

module.exports = checkAdmin;