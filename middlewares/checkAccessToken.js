function protectRoutes(req, res, next) {
    // 유효한 자격증명 없음
    if (!res.locals.accessToken) {
        return res.redirect('/401');
    }

    next();
}

module.exports = protectRoutes;