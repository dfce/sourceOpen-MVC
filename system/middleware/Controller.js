/**
 * @desc 自动加载控制器文件中间件
 * @author {Mofei}
 */
 /** @desc 自动扫描、读取指定目录【默认/app/controllers】下的 .js文件 */
 const fs = require('fs');
 const path = require('path');
 const router = require('koa-router')();

 module.exports = (dir = `${global.APP_PATH}/controllers`) => {
    addController(router, dir);
    return router.routes();
 }

 /**
  * @desc 扫描控制器
  * @param {router}     路由
  * @param {router_dir} ctr目录
  */
 function addController (router, router_dir) {
    // 同步遍历 router_dir 目录
    var files = fs.readdirSync(`${router_dir}`);

    // 过滤.js文件
    var js_fiels = files.filter( (f) => {
        return f.endsWith('.js');
    });

    // 处理每个.js文件：
    for ( var f of js_fiels ) {
        // 导入js文件
        let mapping = require(`${router_dir}/${f}`);
        addMapping( router, mapping );
    }
 }

 /**
  * @desc 注册路由中间件
  * @todo 扫描路劲下所有方法、以加载顺序优先执行
  * @param {router}  路由
  * @param {mapping} 控制器文件
  */
 function addMapping (router, mapping) {
    for (let url in mapping) {
        if ( url.startsWith('POST') ) {
            var path = url.substring(5);
            router.post( path, mapping[url] );
        } else if ( url.startsWith('GET') ) {
            var path = url.substring(4);
            router.get( path, mapping[url] );
        } else {
            // console.log(`ERROR : Invalid UL: ${url}; MSG : 控制器内部方法`);
        }
    }
 }