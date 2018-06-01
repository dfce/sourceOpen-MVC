const Exception = require('../core/Exception');
class DB_Exception extends Exception {
    constructor ({msg = '', code = 505, type = 'MySql', ...args} = {}) {
        super({msg, code, type, ...args});
    }
}
DB_Exception.EXCEPTION_CODE = 505;
DB_Exception.EXCEPTION_TYPE = 'MySql';
DB_Exception.INVALID_TABLE = '未指定表名';
DB_Exception.TABLE_NAME_NULL = '未指定要操作的表';
DB_Exception.SQL_NOT_STRING = '执行Sql不是有效的字符串';

module.exports = DB_Exception;