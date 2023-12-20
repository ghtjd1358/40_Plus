const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 8000;

const swaggerRouter = require("./routes/swagger.router");

const signupRouter = require("./routes/signup.router");
const errorRouter = require("./routes/error.routes");

const db = require("./models/index");

const app = express();

const getSessionConfig = require("./config/session.config");
app.use(cookieParser("추후 수정 예정 암호"));

const checkIdTokenMiddleware = require("./middlewares/checkIdToken");
const notFoundMiddleWare = require("./middlewares/not-found");
const errorHanderMiddleware = require("./middlewares/error-handler");

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
app.use(errorRouter);

// API 관련
const serviceKey = "522a1115-e77c-4ab7-b97f-f2628669126c"; // .env

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const axios = require("axios");
app.get("/cultureAPI", async (req, res) => {
  const serviceUrl =
    "http://api.kcisa.kr/openapi/service/rest/convergence/conver6?";

  let URI = encodeURI("serviceKey") + "=" + serviceKey;
  URI += "&" + encodeURI("numOfRows") + "=" + encodeURI("10");
  URI += "&" + encodeURI("pageNo") + "=" + encodeURI("1");

  const url = serviceUrl + URI;

  console.log(URI);

  try {
    const result = await axios.get(url);
    const data = result.data;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

// 한국문화정보원_전국 문화 여가 활동 시설(클래스)
// const apiKey = "adaccb06-738c-4122-aad0-dcf69d09d802";

// app.get("/cultureAPI", async (req, res) => {
//   const serviceUrl = "http://api.kcisa.kr/openapi/API_CIA_081/request?";

//   let URI = encodeURI("serviceKey") + "=" + apiKey;
//   URI += "&" + encodeURI("numOfRows") + "=" + encodeURI("1");
//   URI += "&" + encodeURI("pageNo") + "=" + encodeURI("1");

//   const url = serviceUrl + URI;

//   console.log(URI);

//   try {
//     const result = await axios.get(url);
//     const data = result.data;
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

//도서관 정보
const libraryKey =
  "cc2b7e47274edbc8c38943c9c0dd105e0a026bc5ab7de6e0cb4ec27027a241e9";

app.get("/libraryAPI", async (req, res) => {
  const url = "http://data4library.kr/api/extends/libSrch?";

  let URI = encodeURI("authKey") + "=" + libraryKey;
  URI += "&" + encodeURI("pageNo") + "=" + encodeURI("1");
  URI += "&" + encodeURI("pageSize") + "=" + encodeURI("1");

  const libraryUrl = url + URI;

  console.log(libraryUrl);

  try {
    const result = await axios.get(libraryUrl);
    const data = result.data;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.use(notFoundMiddleWare);
app.use(errorHanderMiddleware);

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
