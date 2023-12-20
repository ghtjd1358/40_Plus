const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")();
//사용할 db 연동 -> config.json의 키 값

console.log(config);

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require("./User")(sequelize, Sequelize);
const Community = require("./Community")(sequelize, Sequelize);
const Comment = require("./Comment")(sequelize, Sequelize);
const Words = require("./Words")(sequelize, Sequelize);
const ConfirmWords = require("./ConfirmWords")(sequelize, Sequelize);

// FK 설정 1:n
User.hasMany(Community, {
  foreignKey: "userid",
  sourceKey: "userid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Community.belongsTo(User, {
  foreignKey: "userid",
  targetKey: "userid",
});

Community.hasMany(Comment, {
  foreignKey: "foreign_number",
  sourceKey: "number",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(Community, {
  foreignKey: "foreign_number",
  targetKey: "number",
});

User.hasMany(Words, {
  foreignKey: "userid",
  sourceKey: "userid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Words.belongsTo(User, {
  foreignKey: "userid",
  targetKey: "userid"
})
User.hasMany(ConfirmWords, {
  foreignKey: "userid",
  sourceKey: "userid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

ConfirmWords.belongsTo(User, {
  foreignKey: "userid",
  targetKey: "userid"
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Community = Community;
db.Comment = Comment;
db.Words = Words;
db.ConfirmWords = ConfirmWords;

module.exports = db;
