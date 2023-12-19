//express 모듈 불러오기
const express = require("express");
const api = require("./routes");
const db = require("./model/index");
const PORT = 8000;

//express 사용
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

const { swaggerUi, specs } = require("./swagger/swagger");

// http://localhost:8000/api-docs 로 접근 가능
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const router = require("./routes");
app.use("/", router);

db.sequelize
  .sync({ force: false })
  .then(() => {
    // force: false => 테이블이 없으면 생성
    // force: true => 테이블 무조건 생성 (만약 DB가 있다면 다 삭제하고 다시 생성 -> prod에서 사용 X)
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
