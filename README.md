#   MVC 模式后端框架

## 框架应用：cookie、session、email、fs、socketIo、mysql等插件 ;
## 封装有内置：mssql数据库操作，事务模式、session,cookie读写、多文件上传，上传进度同步、邮件发送、即时通讯、controller权限操作控制等功能；可扩展

##  项目结构
### ┏ ┳ ┓┣ ╋ ┫┗ ┻ ┛┃━
```javascript
┃━backapi                       项目根目录
┃   ┣━app                           项目主目录
┃   ┃   ┣━config                        配置文件
┃   ┃   ┃   ┣━Database                      数据库配置文件
┃   ┃   ┃   ┣━ThenGlobal                    运行环境变量
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━controllers                   控制器 C
┃   ┃   ┃   ┣━Ctr-Exception                 控制器Exception文件
┃   ┃   ┃   ┣━Test                          C Example
┃   ┃   ┃   ┣━Welcome                       C Welcome
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━helpers                       【自定义】扩展functions
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━libraries                     【自定义】扩展插件
┃   ┃   ┃   ┣━crypto_lib                    加密类
┃   ┃   ┃   ┣━fetchData                     fetchData 同步封装
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━middlewares                   【自定义】扩展中间件
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━models                        模型层 M
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━public                        资源
┃   ┃   ┃   ┣━static                     静态 可访问资源目录
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━views                         视图层 V
┃   ┃   ┃   ┗━...                           
┃   ┃   ┗━app.js                        app主文件
┃   ┣━node_modules              Node 依赖包
┃   ┣━system                    框架系统目录
┃   ┃   ┣━core                      核心文件
┃   ┃   ┃   ┣━Cookie                    Ctx.cookie插件
┃   ┃   ┃   ┣━Email                     邮件处理类
┃   ┃   ┃   ┣━Exception                 错误处理基类
┃   ┃   ┃   ┣━Runlog                    运行日志处理类
┃   ┃   ┃   ┣━Upload                    文件处理类
┃   ┃   ┃   ┣━WS-socket.io              socket.io处理类
┃   ┃   ┃   ┗━...                           
┃   ┃   ┣━database                  数据库
┃   ┃   ┃   ┣━DB-exception              数据库错误处理类
┃   ┃   ┃   ┣━DB-mysql                  数据库操作基类
┃   ┃   ┃   ┗━...                           
┃   ┃   ┗━middleware                系统中间件
┃   ┃   ┃   ┣━Controller                控制器加载器
┃   ┃   ┃   ┣━Session-store             SessionStore
┃   ┃   ┃   ┣━Static-file               静态文件处理器
┃   ┃   ┃   ┣━Templating                视图层处理器
┃   ┃   ┃   ┗━...                           
┃   ┣━index.js                  项目运行文件
┃   ┣━mf_localhost.sql          test sql
┃   ┣━package.json              依赖包配置文件
┃   ┣━README.md                 项目说明（自述）文件
┃   ┗━...                           

```

#   SO-1.0

### install
```
// 三张表分别应用：权限控制、事务 的测试
execute mf_localhost.sql

npm i -D
npm run start
```

### index
```
/** @desc 加载运行文件 */
const app = require('./app/app');

/** @desc 实例化应用app */
const App = new app();
// 开启RedisSession 默认本地储存session
App.allowSessionRedis();
// 开启socket.io 默认开启
App.allowSocketMode('io');

/** @desc 监听端口、开启应用 */
App.listen(8081);
```
