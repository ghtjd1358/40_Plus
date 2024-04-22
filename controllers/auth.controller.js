const bcrypt = require("bcrypt");
const models = require("../models/index");

const checkJwt = require("../utility/checkJwt");
const User = models.User;
const getCookieConfig = require("../config/cookie.config");
const clearUserInfo = require("../utility/clearUserInfo");
require("dotenv").config();

function getIndex(req, res) {
  res.render("index");
}

const kiosk = (req, res) => {
  res.render("kiosk");
};

const kiosk_word = (req, res) => {
  res.render("kiosk_word");
};

const sub_kiosk = (req, res) => {
  res.render("sub_kiosk");
};

const culture = (req, res) => {
  res.render("culture");
};

const library = (req, res) => {
  res.render("culture_library");
};

const dayClass = (req, res) => {
  res.render("culture_class");
};

const festival = (req, res) => {
  res.render("culture_festival");
};

const community = (req, res) => {
  res.render("community");
};

const computer = (req, res) => {
  res.render("computer");
};

function getSignup(req, res) {
  res.render("user/signup");
}

async function existsAlready(req, res, next) {
  if (req.body.userid.trim().length <= 3) {
    return res.json({
      msg: "아이디를 4자 이상으로 입력해주세요.",
      isUnique: false,
    });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({
      where: { userid: req.body.userid },
    });
  } catch (err) {
    return next(err);
  }

  if (existingUser) {
    res.json({ msg: "이미 존재하는 아이디입니다.", isUnique: false });
  } else {
    res.json({ msg: "아이디 생성 가능합니다.", isUnique: true });
  }
}

async function signup(req, res) {
  const { userid, password, confirmPassword, name, isUnique } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({
      where: { userid: req.body.userid },
    });
  } catch (err) {
    return next(err);
  }

  if (!isUnique || isUnique === false || existingUser) {
    return res.json({
      msg: "중복검사를 실시하지 않았거나 이미 존재하는 아이디입니다.",
      isError: true,
    });
  }

  if (!userid || userid.trim().length <= 3) {
    return res.json({
      msg: "아이디를 4자 이상으로 입력해주세요.",
      isError: true,
    });
  }

  if (!password || password.trim().length <= 5) {
    return res.json({
      msg: "비밀번호를 6자 이상으로 입력해주세요.",
      isError: true,
    });
  }

  if (!(password === confirmPassword)) {
    return res.json({
      msg: "비밀번호와 비밀번호 확인이 다릅니다.",
      isError: true,
    });
  }

  if (!name || name.trim().length < 2) {
    return res.json({
      msg: "두 글자 이상의 이름을 입력해주세요.",
      isError: true,
    });
  }

  const hashPW = bcrypt.hashSync(password, parseInt(process.env.HASHROUND));
  try {
    const result = await User.create({
      userid: userid,
      name: name,
      password: hashPW,
    });
  } catch (err) {
    return next(err);
  }

  return res.json({ msg: "완료.", isError: false });
  // 프론트에서 res.data.isError가 true면 => redirect('/');
}

function getLogin(req, res) {
  if (!req.session.accessToken && req.session.url) {
    return res.render("user/login", { url: req.session.url });
  }

  if (!req.session.accessToken && !req.session.url) {

    return res.render("user/login", { url: '/' });
  }
  res.redirect("/401");
}

async function login(req, res, next) {
  clearUserInfo(req, res);
  const { userid, password } = req.body;

  if (!userid || userid.trim().length === 0) {
    return res.json({ msg: "아이디를 입력해주세요.", isError: true });
  }

  if (!password || password.trim().length === 0) {
    return res.json({ msg: "비밀번호를 입력해주세요.", isError: true });
  }

  const existingUser = await User.findOne({ where: { userid: userid } });
  if (!existingUser) {
    return res.json({ msg: "아이디 혹은 비밀번호가 다릅니다.", isError: true });
  }

  if (!bcrypt.compareSync(password, existingUser.password)) {
    return res.json({ msg: "아이디 혹은 비밀번호가 다릅니다.", isError: true });
  }

  // 데이터베이스의 토큰 업데이트
  newRefreshToken = checkJwt.makeRefreshJwt(userid, existingUser.name);
  res.cookie("refreshToken", newRefreshToken, getCookieConfig());
  try {
    await User.update(
      {
        RefreshToken: newRefreshToken,
      },
      {
        where: { userid: userid },
      }
    );
  } catch (err) {
    return next(err);
  }

  res.json({ msg: "성공", isError: false });
}

function logout(req, res) {
  res.clearCookie(
    "refreshToken",
    req.signedCookies.refreshToken,
    getCookieConfig()
  );
  clearUserInfo(req, res);
  res.send("완료");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  existsAlready: existsAlready,
  getLogin: getLogin,
  login: login,
  getIndex: getIndex,
  logout: logout,
  culture: culture,
  library: library,
  dayClass: dayClass,
  festival: festival,
  community: community,
  kiosk: kiosk,

  computer: computer,
  
  kiosk_word: kiosk_word,
  sub_kiosk: sub_kiosk,

};
