const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 8000;

const swaggerRouter = require("./routes/swagger.router");
const signupRouter = require("./routes/signup.router");
const db = require("./models/index");

const app = express();

const getSessionConfig = require("./config/session.config");
app.use(cookieParser("추후 수정 예정 암호"));

const checkIdTokenMiddleware = require("./middlewares/checkIdToken");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// swagger
// http://localhost:8000/api-docs 로 접근 가능
app.use("/api", swaggerRouter);
const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const sessionConfig = getSessionConfig();
app.use(expressSession(sessionConfig));

app.use(checkIdTokenMiddleware);

app.use(signupRouter);

// API 관련
const serviceKey = "522a1115-e77c-4ab7-b97f-f2628669126c"; // .env

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const axios = require("axios");
app.get("/cultureAPI", async (req, res) => {
  const serviceUrl =
    "http://api.kcisa.kr/openapi/service/rest/convergence/conver6?";

  let URI = encodeURI("serviceKey") + "=" + serviceKey;
  URI += "&" + encodeURI("numOfRows") + "=" + encodeURI("2");
  URI += "&" + encodeURI("pageNo") + "=" + encodeURI("1");
  // URI += "&" + encodeURI("charge") + "=" + encodeURI("무료");

  const charge = req.query.cost;
  if (charge && charge === "무료") {
    URI += "&" + encodeURI("charge") + "=" + encodeURI("무료");
  }

  const url = serviceUrl + URI;

  console.log(URI);

  try {
    const result = await axios.get(url);
    const data = result.data;

    // 사용자가 "무료"를 선택한 경우에만 데이터 필터링 적용
    if (charge && charge === "무료") {
      const filteredData = data.items.item.filter((item) => {
        return item.charge && item.charge.includes("무료");
      });

      // 클라이언트에 필터링된 데이터 전송
      res.json(filteredData);
    } else {
      // 클라이언트에 전체 데이터 전송
      res.json(data);
    }
  } catch (err) {
    console.log(err);
  }
});

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
