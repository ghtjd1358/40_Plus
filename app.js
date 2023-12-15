const express = require('express');
const expressSession = require('express-session');

const checkIdTokenMiddleware = require('./middlewares/checkIdToken');
const createSessionConfig = require('./config/session.config');
const router = require('./router/signup.router');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(checkIdTokenMiddleware);
app.use(router);

app.listen(3000);