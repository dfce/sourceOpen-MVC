const Ctr_Exception = require('../controllers/Ctr-Exception');

const admin_helper = {
    is_login: (ctx = {}, isExc = true) => {
        let isLogin = true;
        if (!admin_helper.is_emptyObj(ctx.session)) {
            if (!isExc)  return isExc;
            throw new Ctr_Exception({msg: Ctr_Exception.ISNOT_LOGIN, code: 505, type: Ctr_Exception.EXCEPTION_TYPE});
        }
        return isLogin;
    },

    is_emptyObj: (obj) => {
        if (typeof obj !== 'object') return false;
        if (!Object.keys(obj).length) return false;
        return true;
    }
}

module.exports = admin_helper;