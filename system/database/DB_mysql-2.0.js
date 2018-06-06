const DB_Conf = require('../../app/config/DataBase');
const DB_Exception = require('./DB-exception');
const mysql = require('mysql');

/**
 * @class
 * @desc MySql 操作类
 */
class DB_MySql {
    // MysqlConnect
    constructor (table = false) {
        this.table = table || false;
        if (!Object.is(typeof this.table, 'string') || Object.is(this.table, false)){
            throw new DB_Exception({msg: DB_Exception.TABLE_NAME_NULL});
        }

        this.isTransaction = false; // 是否事务模式
        this.inTransaction = false; // 是否事务中
        this.reConnectLimit = 10; // 最大重连次数
        this.TransConnect = null;

        this.Pool = new MysqlConnect().getPool();
    }


    async execute (sql, params) {
        try {

            sql = sql || this.sql;
            if (this.isTransaction) {
                return new Promise((resolve, reject) => {

                    if (Object.is(this.inTransaction, false)) {
                        this.inTransaction = true

                        this.TransConnect.beginTransaction(err => { if (err) reject(err) })
        
                        this.commit = () => {
                            this.TransConnect.commit(err => {
                                if (err) {
                                    this.TransConnect.rollback(err => { if (err) reject(err) })
                                    reject(err)
                                }
                                console.log(`COMMIT`)
                                this.TransConnect.release()
                            })
                        }
        
                        this.rollback = () => {
                            this.TransConnect.rollback(err => {
                                if (err) reject(err)
                                console.log(`ROLLBACK`)
                                var released = this.TransConnect.release();
                            })
                        }
                    }
    
                    this.TransConnect.query(sql, params, (err, result, fields) => {
                        err ? reject(err) : resolve(this.fetchRow(result))
                    })
                })

            } else { // 常规模式

                return new Promise((resolve, reject) => {
                    this.Pool.getConnection((err, connection) => {
                        if (err) reject(err);
                        connection.query(sql, params, (err, result, fields) => {    
                            err ? reject(err) : resolve(this.fetchRow(result));
                            connection.release();
                        })
                    })
                })
            }
        } catch(e){
            console.log('catch error:', e);
        }
    }

    /**
     * @function fetchRow
     * @param {*} rows 
     * @return {Array|Null}
     */
    fetchRow (rows) {
        if (!Array.isArray(rows) && rows.length > 0) return null;
        if (Array.isArray(rows) && rows.length == 1) return rows[0];
        return rows;
    }


    /**
     * @function
     * @desc 开启事务模式
     */
    async TransBegin () {
        // 实例当前 connection
        this.TransConnect = await new Promise((resolve, reject) => {
            this.Pool.getConnection((err, connection) => {
                if (err) reject(err)
                resolve(connection)
            })
        })
        
        this.isTransaction = true;
        console.log('BEGIN TRANSACTION')
    }

    allowTransaction () {this.TransBegin()}
    transEnd () {this.TransEnd()}
    /**
     * @desc 事务处理
     * @param {commit|rollback} string
     */
    async TransEnd (transAction = 'rollback') {
        switch (transAction.toLowerCase()) {
            case 'commit':
                await this.commit();
                break;
            default:    
            case 'rollback':
                await this.rollback();
                break;
        }
        this.isTransaction = false;
        this.inTransaction = false;
    }

    /* ---------------------------------------------------------------------------------------------------------------------- */
    /**
     * @function select
     * @param {String|Object|Array} fields 
     * @param {String|Object|Array} where 
     * @param {String|Object|Array} order 
     * @param {String|Object|Array} group 
     * @param {Numner} limit 
     * @param {Number} offset 
     * @return {Object}
     */
    async select ({fields, where, order, group, limit, offset} = {}) {
        this._fields(fields);
        this._anWhere(where);
        this._order(order);
        this._group(group);
        this._limit(limit);
        this._offset(offset);
        return this.execute(this.getThenSql());
    }

    /**
     * @function getList
     * @param {String|Object|Array} fields 
     * @param {String|Object|Array} where 
     * @param {String|Object|Array} order 
     * @param {String|Object|Array} group 
     * @param {Numner} limit 
     * @param {Number} offset 
     * @return {Object}
     */
    async getList ({fields, where, order, group, limit, offset} = {}) {
        return this.select({fields, where, order, group, limit, offset});
    }

    /**
     * @function count
     * @param {String|Object|Array} fields 
     * @param {String|Object|Array} where 
     * @param {String|Object|Array} group 
     * @return {Number}
     */
    async count ({fields, where, group} = {}) {
        this._fields(fields);
        this._anWhere(where);
        this._group(group);

        this.sql = 'SELECT COUNT(1) count FROM (' + this.fields + this.table + this.where + this.group + ') AS c';
        return await this.execute();
    }


     /**
     * @function insert
     * @param {Object|Array} data 
     * @return 
     */
    async insert (data) {
        this._insert_string(data);
        this.sql = `INSERT INTO ` + this.table + this.insert_string;

        return await this.execute();
    }

    /**
     * @function update
     * @param {Object|Array} data 
     * @param {Object|Array|String} where 
     */
    async update (data, where) {
        this._update_string(data);
        this._anWhere(where);
        this.sql = `UPDATE ` + this.table + ` SET ` + this.update_string +  this.where;

        return await this.execute();
    }

    /**
     * @function delete
     * @param {Object|Array|String} where 
     */
    async delete (where) {
        this._anWhere(where);
        this.sql = `DELETE FROM ` + this.table + this.where;

        return await this.execute();
    }

    /**
     * @desc 构造insert_string字符串 
     * @function _insert_string
     * @param {Array|Object} data 
     * @return {String}
     */
    _insert_string (data) {
        var fields = '(', values = '(';

        if(data) {
            for (var key in data) {
                fields += '`' + key + '`,';
                values += `"${data[key]}",`;
            } 
        }
        fields = fields.length > 1 ? fields.substring(0, fields.length-1) + `)` : fields + `)`;
        values = values.length > 1 ? values.substring(0, values.length-1) + `)` : values + `)`;

        this.insert_string = `${fields} VALUES ${values}`;
    }



    /**
     * @desc 构造update_string字符串
     * @function update_string
     * @param {Array|Object} data 
     * @return {String}
     */
    _update_string (data) {
        var update_string = "";
        if(data) {
            for (var key in data) {
                update_string += '`' + key + '`="'+data[key]+'",';              
            } 
        }
        this.update_string = update_string.length > 1 ? update_string.substring(0, update_string.length-1) : '';
    }

    /**
     * @desc  构造查询字段字符串，默认*
     * @function _fields
     * @param {String|Object|Array} fields 
     * @return {String}
     */
    _fields (fields) {
        switch (typeof fields) {
            case "string":
                this.fields = 'SELECT ' + fields + ' FROM ';
                break;
            case "object":
                if ( Array.isArray(fields) ) {
                    var f = '';
                    for ( var key in fields ) {
                        f += fields[key] + ',';
                    }
                    this.fields = f.length > 1 ? 'SELECT ' + f.substring(0, f.length-1) + ' FROM ' : 'SELECT * FROM ';
                } else {
                    this.fields = 'SELECT * FROM ';
                }                   
                break;
            default :
                this.fields = 'SELECT * FROM ';
                break;   
        }          
    }

    /**
     * @desc 构造查询条件字符串
     * @function  _anWhere
     * @param {String、Object、Array} where 
     * @return {String} this.where 
     */
    _anWhere ( where ) {
        // string ::
        if (typeof where === "string") return this.where = " WHERE 1=1 AND " + where;

        // object|Array::
        // where = [["name","mofei","<="],["password","123456"],["user_name","%m","like"],["id",1]];
        // where = [["user_name","%m","like"],["user_name","%m","like", "none"]];
        // where = {user_name:"Mofei",pawssword:"123456"};

        var where_string = "";

        if(where) {
            if( Array.isArray(where) ) {
                for ( var key of where ) {
                    var query_builder = this._where( key[0], key[1], key[2] == undefined ? '=' : key[2], key[3] == undefined ? 'none' : key[3] );          
                    where_string += `${query_builder} AND `;      
                }
            } else {
                for ( var key in where ) {    
                    var query_builder = this._where( key, where[key], '=' );            
                    where_string += `${query_builder} AND `; 
                }
            }
        }

        this.where = where_string = where_string.length > 1 ? " WHERE 1=1 AND " + where_string.substring(0, where_string.length-5) : '';
    }

    /**
     * @desc 构造查询条件字符串
     * @function  _orWhere
     * @param {String、Object、Array} where 
     * @return {String} this.orWhere 
     */
    _orWhere ( where ) {
        // string ::
        if (typeof where === "string") return this.where = " WHERE 1=1 AND " + where;

        // object Or Array::
        // where = [["name","mofei","<="],["password","123456"],["user_name","%m","like"],["id",1]];
        // where = [["user_name","%m","like"],["user_name","%m","like","after"]];
        // where = {user_name:"Mofei",pawssword:"123456"};
        var where_string = "";

        if(where) {
            if( Array.isArray(where) ) {
                for ( var key of where ) {
                    var query_builder = this._where( key[0], key[1], key[2] == undefined ? '=' : key[2], key[3] == undefined ? 'none' : key[3] );            
                    where_string += `${query_builder} OR `;      
                }
            } else {
                for ( var key in where ) {    
                    var query_builder = this._where( key, where[key], '=' );            
                    where_string += `${query_builder} OR `; 
                }
            }
        }

        this.where = where_string = where_string.length > 1 ? " WHERE 1=1 AND " + where_string.substring(0, where_string.length-5) : '';
    }

    /**
     * @desc _where
     * @function _where
     * @param  {key}    colum
     * @param  {value}  value
     * @param  {type}   type (=,%,>,<,<=,>=,<=>,...)
     * @return {String}   where string  the query_builder
     */
    _where ( key, value, type, side = 'none' ) {
        var query_builder = '';

        // type = like ::
        if (type == 'like') {
            switch ( side ) {
                case 'none':
                    value = value;
                    break;
                case 'before':
                    value = '%' + value;
                    break;
                case 'after':
                    value = value + '%';
                    break;
                default:
                    value = '%' + value + '%';
                    break;            
            }
        }

        query_builder = `${key} ${type} "${value}"`;
        return query_builder;
    }


    /**
     * @desc 构造查询排序字符串 默认DESC
     * @function _order
     * @param {String|Object|Array}  order 
     * @return {String}  this.order
     */
    _order (order) {
        switch (typeof order) {
            case "string":
                this.order = ' ORDER BY ' + order;
                break;
            case "object":
                if ( Array.isArray(order) ) {
                    var f = '';
                    for (var key in order) {
                        f += order[key] + ' DESC,';
                    }
                    this.order = ' ORDER BY ' + (f.length > 1 ? f.substring(0, f.length-1) : '');
                } else {
                    if (order) {
                        var f = '';
                        for ( var key in order ) {
                            if ( ['DESC','ASC'].indexOf( order[key].toUpperCase() ) < 0 ) order[key] = 'DESC';
                            f += key + ' ' + order[key] + ',';
                        }
                        this.order = ' ORDER BY ' + (f.length > 1 ? f.substring(0, f.length-1) : '');
                    } else {
                       this.order = ''; 
                    }
                }                   
                break;
            default :
                this.order = '';
                break;   
        }
    }

    /**
     * @desc 构造分组字符串 默认：null
     * @function _group
     * @param {String|Object|Array} group 
     * @return {String} this.group 
     */
    _group ( group ) {
        switch (typeof group) {
            case "string":
                this.group = ' GROUP BY ' + group;
                break;
            case "object":
                if ( Array.isArray( group ) ) {
                    var f = '';
                    for ( var key in group ) {
                        f += group[key] + ',';
                    }
                    this.group = ' GROUP BY ' + (f.length > 1 ? f.substring(0, f.length-1) : '');
                } else {
                    this.group = '';
                }                   
                break;
            default :
                this.group = '';
                break;   
        }
    }


    /**
     * @desc 构造limt 检测传值、强转Int
     * @function _limit
     * @param {Number} limit 
     * @return {Sting} this.limit
     */
    _limit ( limit ) {
        this.limit = '';
        if ( limit && Number( limit ) ) {
            this.limit = ' LIMIT ' + parseInt( limit );
        }
    }

    /**
     * @desc 构造offset 检测传值、强转Int
     * @function _offset
     * @param {Number} offset 
     * @return {String} this.offset
     */
    _offset ( offset ) {
        this.offset = '';
        if ( this.limit && offset && Number( offset ) ) {
            this.offset = ',' + parseInt( offset );
        }
    }

    getThenSql () {
        return this.sql = `${this.fields}${this.table}${this.where}${this.order}${this.group}${this.limit}${this.offset}`;
    }
}

module.exports = DB_MySql;

/**
* @class 
* @desc 数据库连接
*/
class MysqlConnect {
    constructor () {
        this.isProduction = global.NODE_ENV;
    }

    setCreateOpt (createType) {
    let connectOpt = this.isProduction.toLowerCase() === 'development' ? DB_Conf.development : DB_Conf.production;
        switch (createType) {
            case 'setConnec':
                var {
                    user = 'root', // 用户名
                    password = '123456', // 密码
                    port = '3306', // 端口号(默认：3306)
                    database = 'database', // 数据库名
                    charset = 'UTF8_GENERAL_CI', // 连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
                    localAddress = '', // 此IP用于TCP连接（可选）
                    socketPath = '', // 连接到unix域路径，当使用 host 和 port 时会被忽略
                    timezone = 'local', // 时区（默认：'local'）
                    connectTimeout = '', // 连接超时（默认：不限制；单位：毫秒）
                    stringifyObjects = '', // 是否序列化对象
                    typeCast = true, // 是否将列值转化为本地JavaScript类型值 （默认：true）
                    queryFormat = '', // 自定义query语句格式化方法
                    supportBigNumbers = false, // 数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
                    bigNumberStrings = false, // supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
                    dataStrings = false, // 强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
                    debug = false, // 开启调试（默认：false）
                    multipleStatements = false, // 是否许一个query中有多个MySQL语句 （默认：false）
                    flags = '', // 用于修改连接标志
                    ssl ='', // 使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件
                } = connectOpt;
                this.connectOptions = {
                    user : user,
                    password : password,
                    port : port,
                    database :database,
                    charset : charset,
                    localAddress : localAddress,
                    socketPath : socketPath,
                    timezone : timezone,
                    connectTimeout : connectTimeout,
                    stringifyObjects : stringifyObjects,
                    typeCast : typeCast,
                    queryFormat : queryFormat,
                    supportBigNumbers : supportBigNumbers,
                    bigNumberStrings : bigNumberStrings,
                    dataStrings : dataStrings,
                    debug : debug,
                    multipleStatements : multipleStatements,
                    flags : flags,
                    ssl : ssl,
                }
                break;
            case 'setPool':
            default:
                var {
                    user = 'root',
                    database = 'database',
                    password = '123456',
                    host = 'host',
                    port = 3306,
                    dialect = 'mysql',
                    connectionLimit = 10,
                    debug = false,
                    multipleStatements = false,
                    localAddress = '',
                    socketPath = '',
                } = connectOpt;
                this.poolOptions = {
                    user : user, // 连接的数据库的主机名
                    database : database,
                    password : password,
                    host : host,
                    port : port, // 要连接的端口号。（默认值：3306）
                    dialect : dialect,
                    connectionLimit : connectionLimit, // 一次创建的最大连接数。（默认值：10,
                    debug : debug, // 将协议详细信息打印到stdout 默认：{false}
                    multipleStatements : multipleStatements, // 是否支持多个sql语句连接查询 默认：{false}
                    localAddress : localAddress, // 用于TCP连接的源IP地址。（可选的）
                    socketPath : socketPath, // 连接到unix域套接字的路径。在使用时host 和port被忽略。
                }
                break;
        }
    }

    getConnection () {
        this.setCreateOpt('setConnec');
        return mysql.createConnection(this.connectOptions)
    }
    getPool () {
        this.setCreateOpt('setPool');
        return mysql.createPool(this.poolOptions);
    }

}