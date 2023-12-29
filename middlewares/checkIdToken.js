const checkJwt = require('../utility/checkJwt');
const clearUserInfo = require('../utility/clearUserInfo');
const getCookieConfig = require('../config/cookie.config');

const models = require('../models/index');
const User = models.User;


async function checkAuthStatus(req, res, next) {
    let checkRefreshToken;
    let checkAccessToken;

    // 세션에 있는 access토큰 locals로 불러오기
    res.locals.accessToken = req.session.accessToken;
    res.locals.userid = req.session.userid;
    try {
        // access token이 유효한지 검사
        checkAccessToken = checkJwt.checkJwt(req.session.accessToken);
        
        // access token이 유효하면 다른 미들웨어로 넘어감 (정상 상태)
        return next();

        // access token이 서버에서 발행한 것이 아니거나 유효기간이 만료된 경우
    } catch(err) {
        req.session.userid = '';
        res.locals.userid = req.session.userid;
        req.session.accessToken = '';
        res.locals.userid = req.session.accessToken;
        try {
            // 처음 로그인 해서 session에 access token이 없거나 (로그인하면 refresh token만 줌.) access token이 expire 된 경우
            if (err.message === 'jwt must be provided' || err.message === 'jwt expired') {
                // refresh token 유효성 검사
                checkRefreshToken = checkJwt.checkJwt(req.signedCookies.refreshToken);

                // 쿠키에 refresh 토큰이 있을 경우 그 값을 기반으로 DB에서 유저정보 가져와 일치하는 유저가 있는지 확인 (탈퇴 유저의 토큰일수도 있음)
                const {userid, name} = checkRefreshToken;
                let existingUser;
                try{
                    existingUser = await User.findOne({ where: {userid: userid, name: name}});
                } catch(err) {
                    return next(err);
                }
                
                // 유저가 db에 있다면 access token 발급하고 프론트에서 쓸 userid 정의
                if (existingUser) {
                    const newAccessToken = checkJwt.makeAccessJwt(existingUser.userid);
                    req.session.accessToken = newAccessToken;
                    res.locals.accessToken = newAccessToken;
                    req.session.userid = existingUser.userid;
                    res.locals.userid = req.session.userid;
                }
                return next();
            } 
            // access token이 조작된 토큰이거나 해서 오류가 뜰 경우 
                return next(err);
            // refresh token 오류
            } catch(err) {
            // refresh token이 만료되었거나 없을 경우
            if (err.message === 'jwt must be provided' || err.message === 'jwt expired') {
                    res.clearCookie('refreshToken', req.signedCookies.refreshToken, getCookieConfig());
                    clearUserInfo(req, res);
                    return next();
            }
            // 그밖의 경우 (refresh 토큰이 조작된 토큰이거나 해서 오류가 뜰 경우)
            next(err);
        }
    }
    }



module.exports = checkAuthStatus;