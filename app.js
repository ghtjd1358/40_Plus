const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = 8000;

const swaggerRouter = require("./routes/swagger.router");
const signupRouter = require('./routes/signup.router');
const errorRouter = require('./routes/error.routes');
const db = require("./models/index");

const app = express();

const getSessionConfig = require('./config/session.config');
app.use(cookieParser('추후 수정 예정 암호'));

const checkIdTokenMiddleware = require('./middlewares/checkIdToken');
const notFoundMiddleWare = require('./middlewares/not-found');
const errorHanderMiddleware = require('./middlewares/error-handler');

app.set('view engine', 'ejs');
app.set("views", "./views");

app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true}));
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
