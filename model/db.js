import mysql2 from 'mysql2'

const connection = mysql2.createPool({
    host:'localhost',
    user:'root',
    database:'expSample',
    password:'tiger',
    port:'3307',
    waitForConnections:true, 
    connectionLimit: 10

});

export default connection;