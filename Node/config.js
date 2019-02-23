var mysql = function localConnect(){
    //Node Mysql dependency npm install mysql@2.0.0-alpha7
    return require('mysql').createConnection({
        hostname: 'localhost',
        user: 'root',
        password: 'pw',
        database: 'portfolio'
    });
}
module.exports.localConnect = mysql;