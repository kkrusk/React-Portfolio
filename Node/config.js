var mysql = function localConnect(){
    return require('mysql').createConnection({
        hostname: 'localhost',
        user: 'root',
        password: 'pw',
        database: 'portfolio'
    });
}
module.exports.localConnect = mysql;