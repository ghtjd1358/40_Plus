const ConfirmWords = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
      "ConfirmWords",
      {
        number: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        word: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        meaning: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
      },
      {
        //tableName: "User", //실제 DB 테이블 이름(만들어줄 테이블 이름)
        freezeTableName: true, //첫번째 인자로 넘겨준 모델 이름을 그대로 테이블 이름으로 고정
        // 시퀄라이즈는 기본적으로 테이블 이름을 모델 + s로 설정
        // charset, collate 값이 있는데, 이미 우리는 db 정의할 때 한글 인코딩 가능하도록 해서 설정 필요 없음
        timestamps: true, //데이터가 추가되고 수정된 시간을 자동으로 칼럼으로 만들어서 기록함
      } //param3 모델 옵션 정의 완료
    );
  
    return model;
  };
  
  module.exports = ConfirmWords;
  