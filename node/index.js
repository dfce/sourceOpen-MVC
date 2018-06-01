/** @desc 加载运行文件 */
const app = require('./app/app');

/** @desc 实例化应用app */
const App = new app();
//App.allowSessionRedis();
App.allowSocketMode('io');

/** @desc 监听端口、开启应用 */
App.listen(8081);