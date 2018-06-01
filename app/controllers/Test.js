/**
 * @class TestController
 * @desc response :: 
 * ctx.status = 200;
 * ctx.body = 'body'、ctx.response.body = 'body'; or ctx.render('viewPath', viewModel = {});
 */

class TestController {
    constructor () {
    }

    /**
     * 
     * @param {*} ctx 
     * @param {*} next 
     */
    index (ctx) {
        console.log('test index : not Login');
        // ctx.body = 'test index : not Login';
        ctx.status = 200;
        ctx.render('common/showmessage', {title: 'test index : not Login', msg: 'test index'});
    }

    /**
     * 
     * @param {*} ctx 
     * @param {*} next 
     */
    login (ctx) {
        ctx.session = {userName: 'mofei', isLogin: true, sessionID: 'saADw21sAD2ssd3sdd'}
        console.log('doLogin setSession : ', ctx.session)
        // ctx.status = 200
        // ctx.render('common/403', {userName: 'mofei', isLogin: true, sessionID: 'saADw21sAD2ssd3sdd'})
        ctx.body = {userName: 'mofei', isLogin: true, sessionID: 'saADw21sAD2ssd3sdd'};
    }

    /**
     * 
     * @param {*} ctx 
     */
    logout (ctx) {
        // ctx.session = null;
        delete ctx.session;
        console.log('getSession', ctx.session)
    }

    /**
     * @desc 事务模式测试
     */
    async transactionTest () {
        const testeMod = require('../models/test_mod');
        await testeMod.transTest();
    }

    async uploadTest (ctx) {
        const Upload = require('../../system/core/Upload');
        console.log('uploadTest : ', ctx.request.body);
        let upInfo = await Upload.save(ctx);
        console.log('upInfo:', upInfo);
        // ctx.status = 200;
        ctx.response.body = upInfo;
    }

    socketTest (ctx) {
        let userinfo = {};
        var viewModel = {title : 'socketTest', UserInfo : {}};
        ctx.status = 200;
        // ctx.render('test/ws', viewModel);
        ctx.render('test/io', viewModel);
    }

    emailTest (ctx) {
        const email = require('../../system/core/Email');
        let Email = new email();
        Email.setTo('2116887500@qq.com');
        Email.setFrom('mofei<dunfee@aliyun.com>');
        Email.setText('this email is test ...');
        Email.send();
        ctx.status = 200;
        // ctx.status = 200;
    }
}

const Test = new TestController(2);
module.exports = {
    'GET /test/login': Test.login,
    'GET /test/index': Test.index,
    'GET /test/logout': Test.logout,
    'GET /test/transtest': Test.transactionTest,
    'GET /test/uploadtest': Test.uploadTest,
    'POST /test/uploadtest': Test.uploadTest,
    'GET /test/wstest': Test.socketTest,
    'GET /test/emailtest': Test.emailTest,
}