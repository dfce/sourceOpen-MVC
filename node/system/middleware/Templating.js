/**
 * @desc 模板处理【render】
 * @author {Mofei}
 */

const nunjucks = require('nunjucks');

module.exports = templating;

/**
 * @desc view 模板处理
 * @param {path} 模板路径
 * @param {opts} 绑定参数【options】
 */
function templating ( path, opts ) {
   // 创建nunjucks 的 evn 对象：
   var env = createEnv( path, opts );

   return async ( ctx, next ) => {
       /** ## @desc 给ctx绑定render 函数 */
       ctx.render = ( view, model ) => {
           /** ## @desc 请求状态处理 */
           if ( ctx.status !== 200 ) {
               view = `common/${ctx.status}`; // 非 200 状态 直接加载公共错误页面 400.html、503.html ... 
           }
           // 绑定 session ：
           console.log('Session :: ' + (ctx.session && ctx.session.userinfo !== undefined ? 'user_name =>: ' + ctx.session.userinfo.user_name : 'Session : not set'));
           if ( ctx.session || ctx.session.userinfo !== undefined || ctx.session.userinfo == null ) {
               ctx.session.view = 0;
           } else {
               ctx.session.view += 1;
           }

           model.userinfo = ctx.session.userinfo; // 传递userinfo 数据 到view
           // 把render后的内容赋值给 response.body:
           ctx.response.body = env.render( `${view}.html`, Object.assign( {}, ctx.state || {}, model || {} ) );
           // 设置Content-type:
           ctx.response.type = 'text/html';
       };
       await next(); // 继续处理其他请求
   };
   
}

/**
 * @desc 创建nunjucks 的 evn 对象：
 * @param  {path}
 * @param  {opts}
 * @return {obj} env 默认【view】目录
 */
 function createEnv ( path, opts ) {
    var 
        autoescape        = opts.autoescape === undefined ? true : opts.autoescape,
        noCache           = opts.noCache || false,
        watch             = opts.watch,
        throwOnUndefined  = opts.throwOnUndefined || false,
        env               = new nunjucks.Environment(
            new nunjucks.FileSystemLoader ( path || 'view',{
                noCache : noCache,
                watch : watch
            } ),{
                autoescape : autoescape,
                throwOnUndefined : throwOnUndefined
            }
        );
    return env;    
 }