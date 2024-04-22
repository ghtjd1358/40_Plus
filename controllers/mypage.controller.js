const bcrypt = require("bcrypt");
const models = require("../models/index");

const User = models.User;
const getCookieConfig = require("../config/cookie.config");
const clearUserInfo = require("../utility/clearUserInfo");
require("dotenv").config();

async function getMyPage(req, res, next) {
  let userInfo;
  try {
    userInfo = await User.findOne({
      where: { userid: req.session.userid },
      attributes: ["userid", "name"],
    });
  } catch (err) {
    return next(err);
  }
  res.render("user/MyPage", { userInfo: userInfo });
}

async function changeUserName(req, res, next) {
  const newUserName = req.body.name;

  try {
    await User.update(
      {
        name: newUserName,
      },
      {
        where: { userid: req.session.userid },
      }
    );
    res.json({ msg: "이름 변경이 완료되었습니다.", isError: false });
  } catch (err) {
    res.json({
      msg: "오류가 발생하였습니다. 새로고침 후 다시 시도해주세요",
      isError: true,
    });
  }
}

async function changeUserPassword(req, res, next) {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  let userPassword;
  try {
    userPassword = await User.findOne({
      where: { userid: req.session.userid },
      attributes: ["password"],
    });
  }catch(err) {
    return next(err);
  }

  const result = bcrypt.compareSync(currentPassword, userPassword.password);
  if (!result) {
    return res.json({ msg: "현재 비밀번호가 다릅니다.", isError: true });
  }

  if (newPassword.trim().length < 6 || !newPassword) {
    return res.json({
      msg: "비밀번호를 6자 이상으로 입력해주세요.",
      isError: true,
    });
  }

  if (!(newPassword === confirmPassword)) {
    return res.json({
      msg: "새 비밀번호와 확인 비밀번호가 다릅니다.",
      isError: true,
    });
  }

  let isSame;
  try {
    isSame = bcrypt.compareSync(newPassword, userPassword.password);
  }catch(err) {
    return next(err);
  }

  if (isSame) {
    return res.json({
      msg: "이전 비밀번호와 동일한 비밀번호입니다.",
      isError: true,
    });
  }
  let hashedNewPassword;
  try {
    hashedNewPassword = bcrypt.hashSync(
      newPassword,
      parseInt(process.env.HASHROUND)
    );
  }catch(err) {
    return next(err);
  }

  try {
    await User.update(
      {
        password: hashedNewPassword,
      },
      {
        where: { userid: req.session.userid },
      }
    );
    return res.json({ msg: "비밀번호 변경이 완료되었습니다.", isError: false });
  } catch (err) {
    return res.json({
      msg: "오류가 발생하였습니다. 새로고침 후 다시 시도해주세요",
      isError: true,
    });
  }
}

async function deleteUser(req, res) {
  try {
    await User.destroy({
      where: { userid: req.session.userid },
    });

    res.clearCookie(
      "refreshToken",
      req.signedCookies.refreshToken,
      getCookieConfig()
    );
    clearUserInfo(req, res);
    res.json({
      msg: "삭제완료",
      isError: false,
    });
  } catch (err) {
    res.json({
      msg: "오류가 발생하였습니다. 새로고침 후 다시 시도해주세요",
      isError: true,
    });
  }
}

module.exports = {
  getMyPage: getMyPage,
  changeUserName: changeUserName,
  changeUserPassword: changeUserPassword,
  deleteUser: deleteUser,
};
