const Exception = require('../../system/core/Exception');
class Ctr_Exception extends Exception {
    constructor({msg, code, type, ...args} = {}) {
        super({msg, code, type, args});
    }
}
Ctr_Exception.ISNOT_LOGIN = '您还未登陆！请登录后重试。';
Ctr_Exception.ERROR_TYPE_IN_MODAL = 'modal';
Ctr_Exception.ERROR_TYPE_TARGET = 'codeTarget';
Ctr_Exception.NOT_HAVE_PERMISSION = '您未被赋予相应的权限';
Ctr_Exception.EXCEPTION_TYPE = 'Controller';

module.exports = Ctr_Exception;