const db = require("../models/index");
const UserTable = db.User;
const CommunityTable = db.Community;
const CommentTable = db.Comment;
const { Op } = require("sequelize");

// 게시물 등록 -> title, content 값 등록
// exports.createCommunity = (req, res, next) => {
//   const { title, content } = req.body;
//   console.log("axios get data > ", req.body);

//   CommunityTable.create({
//     userid: req.session.userid,
//     title: title,
//     content: content,
//   })
//     .then((result) => {
//       console.log("postDB 완료 > ", result);
//     })
//     .catch((error) => {
//       return next(error);
//     });
// };

// 게시물 전체 출력
// exports.readCommunity = (req, res, next) => {
//   CommunityTable.findAll({ raw: true })
//     .then((result) => {
//       if (result) {
//         console.log("find all > ", result);
//         //res.render("./board/boardList", { success: true, data: result });
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       //res.render("./board/boardList", { success: false, error: error.message });
//       return next(error);
//     });
// };

//댓글 추가
exports.writeComment = (req, res, next) => {
  const { number, content, date, like } = req.body;

  console.log("writeComment 값 받기 > ", req.body);
  console.log(number, content);
  console.log("number type > ", typeof number);
  console.log("session > ", req.session.userid);

  if (content != "") {
    //무플 방지..
    CommentTable.create({
      userid: req.session.userid,
      content: content,
      foreign_number: parseInt(number),
      date: date,
      like: like,
    }).then((result) => {
      console.log("댓글 추가 > ", result);
      res.send("fg");
    });
  }
};

// 댓글 읽어오기 -> foreign number(게시물 번호) 이용
// exports.readComment = (req, res, next) => {
//   console.log("req.body > ", req.body);
//   const number = req.body.number;

//   console.log("readComment number > ", number);
//   CommentTable.findAll({
//     where: { foreign_number: number },
//   })
//     .then((result) => {
//       const commentArray = [];
//       result.forEach((comment) => {
//         // commentArray = [userid, content] 배열
//         commentArray.push([
//           comment.dataValues.userid,
//           comment.dataValues.content,
//         ]);
//       });

//       console.log("Comment Array >  ", commentArray);
//       res.send({ commentArray: commentArray });
//     })
//     .catch((error) => {
//       return next(error);
//     });
// };

// 임시 댓글 출력용
// exports.readAllComment = (req, res, next) => {
//   CommentTable.findAll({
//     raw: true,
//   })
//     .then((result) => {
//       console.log("All comment > ", result);
//     })
//     .catch((error) => {
//       return next(error);
//     });
// };

//
// 아래는 게시판 기능
//

exports.community = (req, res) => {
  // 렌더될 때 커뮤니티 테이블에서 가져와서 출력해야함

  CommunityTable.findAll({ raw: true }).then((result) => {
    console.log("community load > ", result);
    res.render("community/community", { communityData: result });
  });
};

exports.writeCommunity = (req, res) => {
  res.render("community/write");
};

exports.readCommunity = async (req, res) => {
  const number = req.query.number;
  let data;

  // 글 하나 가져오기
  await CommunityTable.findOne({ where: { number: number } }).then(
    (resultCommunity) => {
      console.log("read comm > ", resultCommunity.dataValues);
      data = resultCommunity.dataValues;
    }
  );

  // data2는 list로 들어옴 -> 해당 글에 대한 모든 댓글
  let data2 = await CommentTable.findAll({ where: { foreign_number: number } });

  res.render("community/read", {
    data: data,
    data2: data2,
  });
};

exports.detailCommunityPage = (req, res) => {
  const number = req.body.number;

  CommunityTable.findOne({ where: { number: number } }).then((result) => {
    //console.log("detail res", result.dataValues.view);
    // view의 값이 db에서 반영되지 않음.
    result.view += 1;
    console.log("result > ", result.view);

    result.save().then((updateRes) => {
      console.log("save and update view", updateRes);
      res.send(updateRes);
    });
  });
};

// community Search 부분 (제목, 내용, 글쓴이, 제목+내용)
exports.searchCommunity = (req, res) => {
  let { selectValue, str } = req.body;

  if (selectValue == "writer") selectValue = "userid"; //작성자는 userid로 대응되어야함

  if (
    selectValue == "userid" ||
    selectValue == "title" ||
    selectValue == "content"
  ) {
    //제목 + 내용을 제외한 type 서치
    const whereCondition = {};
    whereCondition[selectValue] = {
      [Op.like]: `%${str}%`,
    };

    CommunityTable.findAll({
      where: whereCondition,
    }).then((result) => {
      console.log("search Community > ", result);
    });
  } else {
    // title과 content에서 str을 찾아서 합치기
    CommunityTable.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${str}%` } },
          { content: { [Op.like]: `%${str}%` } },
        ],
      },
    }).then((result) => {
      console.log("-------------------------------");
      console.log("Search result:", result);
    });
  }
};

exports.communityPost = (req, res) => {
  const { title, content, date, view } = req.body;
  console.log("community post > ", title, content, date, view);
  console.log("req userid > ", req.session.userid);

  if (req.session.userid != "") {
    CommunityTable.create({
      userid: req.session.userid,
      title: title,
      content: content,
      date: date,
      view: view,
    }).then((result) => {
      console.log("post create");
      res.send({ createSuccess: true });
    });
  }
};

// 글 삭제
// 컨트롤러에서는 req.params.number로 해당 값을 읽어옴
exports.deleteCommunity = (req, res) => {
  const number = req.params.number;
  console.log("controller delete num >", number);

  CommunityTable.destroy({
    where: {
      number: parseInt(number),
    },
  }).then((result) => {
    console.log("delete DB 성공");
    res.send({ success: true });
  });
};

// 댓글 좋아요 버튼 누를 시 카운트
exports.likeComment = (req, res) => {
  console.log("like comment > ", req.body);
  const { userid, content } = req.body;

  CommentTable.findOne({
    where: { userid: userid, content: content },
  }).then((result) => {
    result.like += 1;

    result.save().then((updateRes) => {
      res.send(updateRes);
    });
  });
};
