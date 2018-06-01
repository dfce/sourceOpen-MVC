module.exports = {
    development : {
        connectionLimit      : 10,
        multipleStatements   : false,
        debug                : false,
        dialect              : 'mysql',
        database             : 'mf_localhost',
        user                 : 'root',
        password             : '123456',
        host                 : 'localhost',
        port                 : 3306 
    },
    production : {
        connectionLimit      : 10,
        multipleStatements   : false,
        debug                : false,
        dialect              : 'mysql',
        database             : 'mf_localhost',
        user                 : 'root',
        password             : '123456',
        host                 : 'localhost',
        port                 : 3306
    },
}