/**
 * @desc 
 * app.js 项目运行住文件， 可以添加自定义中间件程序
 */
/** @todo 加载依赖包 */
const Koa = require('koa');
const Session = require('koa-session2');
const KoaBody = require('koa-body');
const KoaCors = require('koa2-cors');// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
/** @todo 系统中间件 */
const Cookie = require('../system/core/Cookie');
const Controller = require('../system/middleware/Controller');
const SessionStore = require('../system/middleware/Session-store');
const StaticFile = require('../system/middleware/Static-file');
const Templateing = require('../system/middleware/Templating');

/** @todo 扩展中间件 */
const My_Controller = require('../app/middlewares/My_Controller');
/** @todo 加载配置 */
const ThenGlobalConf = require('./config/ThenGlobal');

const app = new Koa();
/** @desc  app.callback() 返回一个可被 http.createServer() 接受的程序实例，也可以将这个返回函数挂载在一个 Connect/Express 应用中。*/
const server = require('http').Server(app.callback());



class App {
    constructor () {
        this.isProduction = global.NODE_ENV === 'production' || false;
        // this.isProduction = process.env.NODE_ENV.toLowerCase() === 'production' || false;
        // 运行环境【development or production】default false (development 开发模式，显示调试错误详细信息)

        this.cookiesKey = ['mofei-mvc:12345'];
        this.store = false;
        this.sessionRedis = false;
        this.isAllowCors = false;
        this.origin = '*';
        this.socketMode = 'ws'; // socket [ws: WebSocket, io: socket.io]
        this.socketPort = 3001

        ThenGlobalConf();
        this.setCorsOrgin();
        this.setStore();
        this.setSessionOpt();
    }
    
    /**
     * @desc 设置socket启用方式
     */
    allowSocketMode (socketMode = 'ws', socketPort = 3001) {
        this.socketMode = (socketMode == this.socketMode) ? this.socketMode : 'io';
        this.socketPort = socketPort;
    }
    /** @desc 开启Redis Session */
    allowSessionRedis () {
        this.sessionRedis = true;
        this.setSessionOpt();
    }
    /** @desc 开启跨域 */
    allowCors () {
        this.isAllowCors = true;
    }
    /** @desc 设置Redis参数实例 */
    setStore (storeOpt = {}) {
        if (!this.sessionRedis) return false;
        let {port = 6379, host = '127.0.0.1', family = 4, password = '', db = 0} = storeOpt
        this.store = new SessionStore({
            port: port,       
            host: host, 
            family: family,          
            password: password,
            db: db
        })
    }

    /** @desc 设置Session 选项参数 */
    setSessionOpt (sessionOpt = {}) {
        let {key = 'SessionID', maxAge = 2*60*1000, overwrite = true, signed = true, httpOnly = true, rolling = false} = sessionOpt
        this.sessionOpt = {
            key: key,
            maxAge: maxAge,
            expires: '',
            path: '/',
            domain: '',
            secure: '',
            httpOnly: httpOnly,
            signed: signed,
            overwrite: overwrite,
            rolling: rolling
        };
        /** @desc Redis or 本地 */
        if (this.sessionRedis && this.store !== false) this.sessionOpt.store = this.store;
    }
    

    /**
     * @desc 设置跨域来源
     * @param {String|function} origin 
     */
    setCorsOrgin (origin) {
        this.allowCors();
        this.origin = (typeof origin === 'function') ? origin : '*';
        // origin func 示例
        // function (ctx) {
        //     if (ctx.url === '/test') {
        //         return "*"; // 允许来自所有域名请求
        //     }
        //     // return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
        // }

        return this.origin;
    }



    
    /**
     * @desc app listen
     * @param {number} port 3001
     */
    listen (port = 3001) {
        /** @desc cookie keys */
        app.keys = this.cookiesKey;
        /** @desc session */
        app.use(Session(this.sessionOpt));
        /** @desc log request URL:: */
        app.use(async (ctx, next) => {

            let start = new Date().getTime();
            let execTime;
            await next();
            execTime = new Date().getTime() - start;
            // console.log(`app Response time : => {${execTime}ms}`);
            // ctx.response.set('X-Response-Time', `${execTime}ms`);
        });

        /** @desc cors:: */
        if (this.isAllowCors) {
            app.use(KoaCors({
                origin: this.origin, // or origin: this.setCorsOrgin('*、function(ctx){...}'),
                exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
                maxAge: 5,
                credentials: true,
                allowMethods: ['GET', 'POST', 'DELETE'],
                allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
            }));
        }

        /** @desc static file support:: */
        app.use(StaticFile('/public/static', `${global.APP_PATH}/public/static`));
        /** @desc request body:: */
        app.use(KoaBody({multipart: true}));
        /** @desc add nunjucks as view:: */
        app.use(Templateing(`${global.APP_PATH}/views`, {
            noCatch: !this.isProduction,
            watch: !this.isProduction
        }));

        /** @desc My_Controller 【用于逻辑程勋运行前 处理权限控制、公共数据、报错信息】*/
        app.use(async (ctx, next) => {
            let ctx_method = ctx.request.method, ctx_url = ctx.request.url;
            // console.log(`method: ==> ${ctx_method} ;   url: ==> ${ctx_url}`);
            
            ctx.cookie = new Cookie(ctx.cookies);
            //关闭 nodejs 默认访问 favicon.ico
            if (!ctx_url.indexOf('favicon.ico')) {
                console.log('关闭nodejs 默认访问 favicon.ico... ...');
                return;
            }
            try {
                let MyController = new My_Controller(ctx);
                if (await MyController.checkAction()) await next();
            } catch (error) {
                console.log('error:', error);
                ctx.body = global.NODE_ENV === 'production' ? {code: error.code, message: `${error.message}`} : {code: error.code, message: `${error.stack}`};
            }
        });
        /** @desc controller:: */
        app.use(Controller());

        /**
         * @desc socket */
        if (this.socketMode === 'ws'){
            const SocketServer = require('../system/core/WS-socket.ws');
            const WebsocketServer = require('ws').Server;
            const ws = new WebsocketServer({server});
            new SocketServer(ws);
        } else {
            const SocketServer = require('../system/core/WS-socket.io');
            const io = require('socket.io')(server);
            new SocketServer(io);
        }

        /** @desc listen App port:: */
        console.log('listening');
        app.listen(process.env.PORT || port, () => { console.log(`run app at : http://127.0.0.1:${port}`); });
        /** @desc listen WebSocket port:: */
        server.listen(process.env.SOCKET_PORT || this.socketPort, () => { console.log(`run socket at : http://127.0.0.1:${this.socketPort}`); });
        console.log(`in file: ${__filename}`);

        server.on('error', err => {
            console.log('error --> ', err.message);
            process.exit(1);
        });
        
    }
}
module.exports = App;