function protectRoutes(req, res, next) {
    // 유효한 자격증명 없음
    if (!res.locals.accessToken) {
        return res.redirect('/401');
    }

    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
        // 권한 없음 에러
        return res.redirect('/403');
    }

    next();
}

module.exports = protectRoutes;