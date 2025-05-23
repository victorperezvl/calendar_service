const db = require ('mysql2');
const dotenv = require ('dotenv');
dotenv.config();

//Connecion to the database
const pool = db.createPool({

    host:process.env.DB_HOST,
    database:process.env.DB,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,

}).promise();


module.exports = pool;
