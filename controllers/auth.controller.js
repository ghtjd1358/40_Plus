const bcrypt = require('bcrypt');
const models = require('../models/index');

const checkJwt = require('../utility/checkJwt');
const User = models.User;

function getIndex (req, res) {
    res.render('index');
}

function getSignup (req, res) {
    res.render('signup');
}

async function existsAlready (req, res) {
    const existingUser = await User.findOne({ where: { userid: req.body.userid }})

    if (existingUser) {
       res.json({ msg : '이미 존재하는 아이디입니다.', isUnique : false});
    } else {
     res.json ({ msg : '아이디 생성 가능합니다.', isUnique : true});
    }

}

async function signup (req, res) {
    const {userid, password, confirmPassword, name, isUnique} = req.body;

    const existingUser = await User.findOne({ where: { userid: req.body.userid }})
    if (!isUnique || isUnique === false || existingUser ) {
      return res.json({msg : '중복검사를 실시하지 않았거나 이미 존재하는 아이디입니다.', isError: true});

    }

    if (!userid || userid.trim().length <= 3) {
        return res.json({msg : '아이디를 4자 이상으로 입력해주세요.', isError: true});
    }

    if (!password || password.trim().length <= 5) {
        return res.json({msg : '비밀번호를 6자 이상으로 입력해주세요.', isError: true});
    }

    if ( !(password === confirmPassword) ) {
        return res.json({msg : '비밀번호와 비밀번호 확인이 다릅니다.', isError: true});
    }

    if(!name || name.trim().length < 2) {
        return res.json({msg : '두 글자 이상의 이름을 입력해주세요.', isError: true});
    }

    const hashPW = bcrypt.hashSync(password, 12);

    const refreshToken = checkJwt.makeSignupJwt(userid);

    const result = await User.create({
            userid: userid,
            name: name,
            password: hashPW,
            RefreshToken: refreshToken
        })

        return res.json({msg : '완료.', isError: false});
    // 프론트에서 res.data.isError가 true면 => redirect('/');
}

function getLogin(req, res) {
    res.render('login');
}

async function login(req, res) {
    const {userid, password} = req.body;
    let checkRefreshToken;
    
    if (!userid || userid.trim().length === 0) {
        return res.json({msg : '아이디를 입력해주세요.', isError: true});
    }

    if (!password || password.trim().length === 0) {
        return res.json({msg : '비밀번호를 입력해주세요.', isError: true});
    }

    const existingUser = await User.findOne({ where: { userid: userid }})
    if (!existingUser) {
     return res.json({ msg : '아이디 혹은 비밀번호가 다릅니다.', isError : true});
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
        return res.json({ msg : '아이디 혹은 비밀번호가 다릅니다.', isError : true});
    }

    try {
        checkRefreshToken  = checkJwt.checkJwt(existingUser.RefreshToken);
    } catch(err) {
        res.json({ msg: '휴면 로그인 되었습니다.', isError : true, tokenExpire : true});
    }

    if (!checkRefreshToken) {
        return;
    }

    req.session.idToken = checkJwt.makeJwt(userid);
    // 데이터베이스의 토큰 업데이트
    const newRefreshToken = checkJwt.makeSignupJwt(userid);
    await User.update({
        RefreshToken: newRefreshToken
    }, {
        where: {userid: userid}
    })

    res.json({ msg : '성공', isError : false});

    // to do. refresh 토큰 발급해야하는데 어떻게 할지 생각하기.
    
}

function logout(req, res) {
    req.session.idToken = null;

    res.send('완료');
}


module.exports = {
    getSignup : getSignup,
    signup : signup,
    existsAlready : existsAlready,
    getLogin : getLogin,
    login : login,
    getIndex : getIndex,
    logout : logout
}