const db = require("../models/index");
const UserTable = db.User;
const CommunityTable = db.Community;
const CommentTable = db.Comment;
const { Op } = require("sequelize");

// ///////////////// 페이지 렌더 부분

exports.community = (req, res) => {
  CommunityTable.findAll({ raw: true }).then((result) => {
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

// 게시물 누를 시 자세히 보기
exports.detailCommunityPage = (req, res) => {
  const number = req.body.number;

  CommunityTable.findOne({ where: { number: number } }).then((result) => {
    result.view += 1;

    // db에 수정된 값을 저장.
    result.save().then((updateRes) => {
      res.send(updateRes);
    });
  });
};

// 글 생성
exports.communityPost = (req, res) => {
  const { title, content, date, view } = req.body;

  if (req.session.userid != "") {
    CommunityTable.create({
      userid: req.session.userid,
      title: title,
      content: content,
      date: date,
      view: view,
    }).then((result) => {
      res.send({ createSuccess: true });
    });
  }
};

// 글 삭제
// 컨트롤러에서는 req.params.number로 해당 값을 읽어옴
exports.deleteCommunity = (req, res) => {
  const number = req.params.number;

  CommunityTable.destroy({
    where: {
      number: parseInt(number),
    },
  }).then((result) => {
    res.send({ success: true });
  });
};

// 글 수정
// 수정할 글을 전달
exports.sendModifyCommunity = (req, res) => {
  const { title, content, number } = req.body;
  req.session.data = { title, content, number };

  res.send("session store");
};
// 수정할 글을 세팅
exports.reciveModifyCommunity = (req, res) => {
  const data = req.session.data;

  req.session.data = null;

  res.render("community/modify", { data: data });
};
// 수정할 글 db에 전달
exports.submitModifyCommunity = (req, res) => {
  const { title, content, number } = req.body;

  // 데이터 수정
  CommunityTable.update(
    { title: title, content: content },
    { where: { userid: req.session.userid, number: number } } // userid, 글 번호 number로 확인 후 수정
  ).then((result) => {
    res.send({ ddd: "ddd" });
  });
};

// ///////////////// 댓글 부분

// 댓글 좋아요 버튼 누를 시 카운트
exports.likeComment = (req, res) => {
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

//댓글 추가
exports.writeComment = (req, res, next) => {
  const { number, content, date, like } = req.body;

  if (content != "") {
    //무플 방지..
    CommentTable.create({
      userid: req.session.userid,
      content: content,
      foreign_number: parseInt(number),
      date: date,
      like: like,
    }).then((result) => {
      res.send("fg");
    });
  }
};

// ////////////////// 검색기능
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
      res.send({ data: result });
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
      res.send({ data: result });
    });
  }
};
