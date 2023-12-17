function getCookieConfig() {
    return {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
        signed: true, // 암호화 쿠키
    };
  }
  
  module.exports = getCookieConfig;
  