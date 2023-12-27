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

app.use(errorRouter);
app.use(signupRouter);
app.use(yongRouter);
app.use("/word", wordRouter);
app.use("/admin", adminRouter);

// API 관련
const serviceKey = process.env.CULTUREAPISERVICEKEY; // .env

const key = "cc2b7e47274edbc8c38943c9c0dd105e0a026bc5ab7de6e0cb4ec27027a241e9";

app.get("/cultureAPI", async (req, res) => {
  const { selectRegion, selectDtl } = req.query;
  console.log("region>", selectRegion);
  console.log("dtl>", selectDtl);

  const serviceUrl = "http://data4library.kr/api/extends/libSrch?";

  let URI = encodeURI("authKey") + "=" + key;
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
