class WelcomeController {
    
    /**
     * @desc 首页
     */
    async index (ctx) {
        ctx.body = 'Welcome index';
    }

    /**
     * @desc 登录
     */
    logIn (ctx) {
        let code = ctx.request.body.code || 0;
        let res = {code: 200, isLogin: true, userInfo: {name: 'admin'}};//await Admin._CodeManager(code)
        ctx.status = 200;

        ctx.session = {is: 1}
        ctx.cookie.setCookie();
        ctx.body = res;
    }

    /**
     * @desc 退出
     */
    logOut (ctx) {
        delete ctx.session; // or ctx.session = null 、{};
        ctx.body = {isLogin: false};
    }

    /**
     * @desc 刷新权限
     */
    refreshPurview () {

    }
}

const Welcome = new WelcomeController;
module.exports = {
    'GET /': Welcome.index,
    'GET /index': Welcome.index,
    'GET /welcome/index': Welcome.index,
    'GET /welcome/dologin' : Welcome.logIn,
    'GET /welcome/logout' : Welcome.logOut,
    'POST /welcome/dologin' : Welcome.logIn,
    'POST /welcome/logout' : Welcome.logOut
}