const db = require("../models/index");
const UserTable = db.User;
const CommunityTable = db.Community;
const CommentTable = db.Comment;

exports.board = (req, res) => {
  res.render("./board/board");
};

// 게시물 등록 -> title, content 값 등록
exports.postDB = (req, res, next) => {
  const { title, content } = req.body;
  console.log("axios get data > ", req.body);

  CommunityTable.create({
    userid: req.session.userid,
    title: title,
    content: content,
  })
    .then((result) => {
      console.log("postDB 완료 > ", result);
    })
    .catch((error) => {
      return next(error);
    });
};

// 게시물 전체 출력
exports.boardList = (req, res, next) => {
  CommunityTable.findAll({ raw: true })
    .then((result) => {
      if (result) {
        console.log("find all > ", result);
        res.render("./board/boardList", { success: true, data: result });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.render("./board/boardList", { success: false, error: error.message });
      return next(error);
    });
};

//댓글 추가
exports.writeComment = (req, res, next) => {
  const { foreign_number, content } = req.body;

  console.log("writeComment 값 받기 > ", req.body);
  console.log(foreign_number, content);
  CommentTable.create({
    userid: req.session.userid,
    content: content,
    foreign_number: foreign_number,
  })
    .then((result) => {
      console.log("댓글 추가 > ", result);
    })
    .catch((error) => {
      return next(error);
    });
};

// 댓글 읽어오기 -> foreign number(게시물 번호) 이용
exports.readComment = (req, res, next) => {
  console.log("req.body > ", req.body);
  const number = req.body.number;

  console.log("readComment number > ", number);
  CommentTable.findAll({
    where: { foreign_number: number },
  })
    .then((result) => {
      const commentArray = [];
      result.forEach((comment) => {
        // commentArray = [userid, content] 배열
        commentArray.push([
          comment.dataValues.userid,
          comment.dataValues.content,
        ]);
      });

      console.log("Comment Array >  ", commentArray);
      res.send({ commentArray: commentArray });
    })
    .catch((error) => {
      return next(error);
    });
};

// 임시 댓글 출력용
exports.readAllComment = (req, res, next) => {
  CommentTable.findAll({
    raw: true,
  })
    .then((result) => {
      console.log("All comment > ", result);
    })
    .catch((error) => {
      return next(error);
    });
};
