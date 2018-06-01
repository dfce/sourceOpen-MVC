/**
 * @class Exception
 * @desc 错误处理类
 * @author Mofei 
 */
class Exception extends Error {
    /**
     * @param {String} message 【异常信息】
     * @param {Number} code    【异常代码】    
     * @param {String} type    【展示类型】
     * @param {*}   args       【额外数据】
     */
    constructor( {msg = 'Not Found', code = 404, type = 'body', ...args} = {} ) {
        let _ERROR = {msg, code, type, args}
        super(_ERROR.msg);
        this.code = _ERROR.code;
        this.type = _ERROR.type;
        this.args = _ERROR.args;
        // this.message = _ERROR.msg;
    }
}
module.exports = Exception;