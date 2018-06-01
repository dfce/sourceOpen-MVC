const COMMON_INTERFACES = [
    'test',
    'welcome',
    'socket.io',
    'favicon.ico'
]

const COMMON_METHODS = [
    ''
]
const isProduction = false;

const FULL_POWER = 2;

const Ctr_Exception = require('../controllers/Ctr-Exception');
const admin_role_action_mod = require('../models/admin_role_action_mod');


class My_Controller {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async checkAction () {
        let flag = true;
        let reqPath = this.ctx.path;
        let reqCtrl = reqPath.split('/')[1] || false;
        let reqAct = reqPath.split('/')[2] || false;
        
        /**
         * @desc 过滤公共接口与方法
         */
        let isCommonIntf = !Object.is(COMMON_INTERFACES.find( intf => Object.is(intf, reqCtrl)), undefined);
        let isCommonAct = !Object.is(COMMON_METHODS.find( method => Object.is(method, reqAct)), undefined);
        
        console.log('Controller:', reqCtrl, ';  Action:', reqAct);
        // this.ctx.session = {currentUserRole : {RoleId: 1}}; /** @desc 测试数据 */
        if (isCommonIntf || isCommonAct) return flag;
        
        /**
         * @desc 非公共接口、方法时：验证用户权限
         */
        if (typeof this.ctx.session !== 'object' || Object.is(Object.getOwnPropertyNames(this.ctx.session).length, 0)){
            throw new Ctr_Exception({msg: Ctr_Exception.ISNOT_LOGIN, code: 505, type: Ctr_Exception.EXCEPTION_TYPE});
        }

        /** @desc 权限查询 admin_role_action_mod */
        let currRoleID = this.ctx.session.currentUserRole && this.ctx.session.currentUserRole.RoleId || 0;
        let adminRoleActionMod = new admin_role_action_mod();
        let UserCanActions = await adminRoleActionMod.getUserCanActions({roleId: currRoleID, currClass: reqCtrl, curFunc:reqAct});

        if (Object.is(UserCanActions, null)) {
            /** @desc 超级管理员【组】自动赋予最高权限 */
            if (Object.is(currRoleID, FULL_POWER)) {
                await adminRoleActionMod.setUserAction({roleId: currRoleID, currClass: reqCtrl, curFunc:reqAct});
                return true;
            }
            throw new Ctr_Exception({msg: Ctr_Exception.NOT_HAVE_PERMISSION, code: 505, type: Ctr_Exception.EXCEPTION_TYPE});
        }
        throw new Ctr_Exception({msg: Ctr_Exception.NOT_HAVE_PERMISSION, code: 505, type: Ctr_Exception.EXCEPTION_TYPE});
    }
}
module.exports = My_Controller;