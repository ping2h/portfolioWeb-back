import mysql from 'mysql2/promise'

const connection = mysql.createPool({
    host: 'database-xiantraining.ct8gws84uq6b.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '123456xian',
    database: 'portfolio',
});

export default connection;