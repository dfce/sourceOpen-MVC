/**
 * @desc 静态资源文件加载处理
 * @desc  mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调，而mz封装了fs对应的函数，
 * @desc  并改为Promise。这样，我们就可以非常简单的用await调用mz的函数，而不需要任何回调。
 * @author { ## Mofei ## }
 */

const path = require('path');
const mime = require('mime');
const fs   = require('mz/fs');

module.exports = staticFiles;

/**
 * @desc 处理静态资源文件加载
 * @param  {url} * 加载文件前缀
 * @param  {dir} * 加载文件目录
 * @return {fiels} file 文件
 */
function staticFiles ( url, dir ) {
   return async ( ctx, next ) => {
       let fpath = ctx.request.path;
       // 判断访问文件【fpath】是否指定前缀
       if ( fpath.startsWith(url) ) {
           // 获取文件完整路径
           let fp = path.join( dir, fpath.substring(url.length) );
           // 文件是否存在
           if ( await fs.exists( fp ) ) {
               ctx.response.type = mime.getType( fpath );   // 查找文件mime 2.0 以上版本 lookup 函数名修改为 getType ; //ctx.response.type = mime.lookup( fpath );
               ctx.response.body = await fs.readFile( fp ); // 读取文件内容
           } else {
               ctx.response.status = 404;
           }
       } else {
           await next(); // 非指定前缀文件不做处理，继续下一个middleware
       }
   }
}