const models = require("../models/index");
const Words = models.Words;
const User = models.User;
const ConfirmWords = models.ConfirmWords;

async function getConfirmWord(req, res, next) {
  let words;
  try {
    words = await Words.findAll();
  } catch (err) {
    return next(err);
  }
  res.render("admin/confirmword", { words: words });
}

async function deleteWord(req, res, next) {
  try {
    await Words.destroy({
      where: { number: req.body.number },
    });
    res.send("완료");
  } catch (err) {
    next(err);
  }
}

async function approveWord(req, res, next) {
  let user;
  try {
    user = await User.findOne({
      where: { userid: req.body.userid },
      attributes: ["name"],
    });
    
    const username = user.name;
    
    await ConfirmWords.create({
      userid: req.body.userid,
      word: req.body.word,
      meaning: req.body.meaning,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      name: username,
    });
    await Words.destroy({
      where: { number: req.body.number },
    });
    res.redirect("/admin/confirmword");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getConfirmWord: getConfirmWord,
  deleteWord: deleteWord,
  approveWord: approveWord,
};
