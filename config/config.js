require('dotenv').config();

function getDBConfig() {
    return {
        username: process.env.MYSQLUSERNAME,
        password: process.env.MYSQLUSERPASSWORD,
        database: "40",
        host: process.env.SERVERIPNO,
        dialect: "mysql"
    }
}


module.exports = getDBConfig; 
