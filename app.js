require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const PORT = process.env.SERVERPORT;

const swaggerRouter = require("./routes/swagger.router");

const signupRouter = require("./routes/signup.router");
const errorRouter = require("./routes/error.routes");
const mypageRouter = require("./routes/mypage.routes");
const yongRouter = require("./routes/index");
const wordRouter = require("./routes/words.routes");
const adminRouter = require("./routes/admin.routes");

const db = require("./models/index");
const app = express();

const getSessionConfig = require("./config/session.config");
app.use(cookieParser(process.env.SECRETKEY));

const checkIdTokenMiddleware = require("./middlewares/checkIdToken");
const checkAccessTokenMiddleware = require("./middlewares/checkAccessToken");
const notFoundMiddleWare = require("./middlewares/not-found");
const errorHanderMiddleware = require("./middlewares/error-handler");
const checkAdminMiddleware = require("./middlewares/checkAdmin");
const blockAdminMiddleware = require("./middlewares/blockNotAdmin");

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
app.use(checkAdminMiddleware);

app.use(errorRouter);
app.use(signupRouter);
app.use(yongRouter);
app.use("/word", wordRouter);
app.use("/admin", blockAdminMiddleware, adminRouter);

// API 관련
const libraryKey = process.env.lIBRARYAPISERVICEKEY; // .env

app.get("/libraryAPI", async (req, res) => {
  const { selectRegion, selectDtl } = req.query;
  console.log("region>", selectRegion);
  console.log("dtl>", selectDtl);

  const serviceUrl = "http://data4library.kr/api/extends/libSrch?";

  let URI = encodeURI("authKey") + "=" + libraryKey;
  URI += "&" + encodeURI("pageNo") + "=" + encodeURI("1");
  URI += "&" + encodeURI("pageSize") + "=" + encodeURI("10");
  URI += "&" + encodeURI("region") + "=" + encodeURI(selectRegion);
  URI += "&" + encodeURI("dtl_region") + "=" + encodeURI(selectDtl);

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

const classKey = process.env.CULTUREAPISERVICEKEY; // .env

app.get("/classAPI", async (req, res) => {
  // const { selectRegion, selectDtl } = req.query;
  // console.log("region>", selectRegion);
  // console.log("dtl>", selectDtl);

  const serviceUrl = "http://api.kcisa.kr/openapi/API_CIA_081/request?";

  let URI = encodeURI("serviceKey") + "=" + classKey;
  URI += "&" + encodeURI("numOfRows") + "=" + encodeURI("10");
  URI += "&" + encodeURI("pageNo") + "=" + encodeURI("1");
  URI += "&" + encodeURI("returnType") + "=" + encodeURI("XML");
  // URI += "&" + encodeURI("region") + "=" + encodeURI(selectRegion);
  // URI += "&" + encodeURI("dtl_region") + "=" + encodeURI(selectDtl);

  const url = serviceUrl + URI;

  console.log(url);

  try {
    const result = await axios.get(url);
    const data = result.data;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

var request = require("request");

var url = "http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll";
var queryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=" +
  "3My5wxErgvzcHFEYeskyVvjOncM6Io53p7VZhbzmShc0p92hypEUqjxBlIr5pWtHVdRcCKv7mkFT2B3OrE3EeA=="; /* Service Key*/
queryParams +=
  "&" +
  encodeURIComponent("busRouteId") +
  "=" +
  encodeURIComponent("100100118"); /* */

request(
  {
    url: url + queryParams,
    method: "GET",
  },
  function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Reponse received", body);
  }
);

app.use("/mypage", checkAccessTokenMiddleware, mypageRouter);

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
