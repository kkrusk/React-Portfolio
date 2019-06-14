var mysql = function localConnect(){
    return require('mysql').createConnection({
        hostname: 'localhost',
        user: 'root',
        password: 'root',
        database: 'portfolio'
    });
}
module.exports.localConnect = mysql;