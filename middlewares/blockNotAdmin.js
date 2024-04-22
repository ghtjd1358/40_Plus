function blockNotAdmin(req, res, next) {
    if (!(req.session.userid === 'admin')) {
        res.redirect('/403');
    }
    next();
}

module.exports = blockNotAdmin;