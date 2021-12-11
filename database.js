const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "apelsinid",
    database: "Posts",
    host: "localhost",
    port: "5432"
});
module.exports = pool;