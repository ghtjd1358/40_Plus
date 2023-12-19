const db = require("../model/index");
const UserTable = db.User;
const CommunityTable = db.Community;
const CommentTable = db.Comment;

exports.board = (req, res) => {
  res.render("board");
};

// 게시물 등록
exports.postDB = (req, res) => {
  const { userid, content } = req.body;
  console.log("axios get data > ", req.body);

  // 가입된 유져인지 검증 후 게시물 create -> db로 content 전송
  UserTable.findOne({ where: { userid: userid } }).then((result) => {
    if (result) {
      console.log("find result > ", result);
      CommunityTable.create({
        number: UserTable.number,
        userid: result.userid,
        title: "A", //임의 설정 -> 프론트에서 들어온 값으로 처리
        content: content,
      });
    } else {
      console.log("id를 찾지 못함");
    }
  });
};

// 게시물 전체 출력
exports.boardList = (req, res) => {
  CommunityTable.findAll({ raw: true })
    .then((result) => {
      if (result) {
        console.log("find all > ", result); // 결과 출력
        res.render("boardList", { success: true, data: result });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.render("boardList", { success: false, error: error.message });
    });
};

//댓글 추가
exports.writeComment = (req, res) => {
  const { number, writeUserid, writeContent } = req.body;

  console.log("writeComment 값 받기 > ", req.body);
  console.log(number, writeUserid, writeContent);
  CommentTable.create({
    foreign_number: number,
    userid: writeUserid,
    content: writeContent,
  }).then((result) => {
    // console.log("댓글 추가 > ", result);
  });
};

// 댓글 읽어오기
exports.readComment = (req, res) => {
  const number = req.body.number;

  console.log("readComment number > ", number);
  CommentTable.findAll({
    where: { foreign_number: number },
  }).then((result) => {
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
  });
};
