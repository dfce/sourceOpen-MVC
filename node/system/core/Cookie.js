class Cookie {
    /**
     * @param {*} cookie 
     * @default expires
     * @desc 指定过期期时间【默认；1 day】， 以GMT格式表示的时间字符串，如方法一个的“timeObj”。
     * @default maxAge
     * @desc 指定过期时间【默认；2 hours 】，同expires（expires和maxAge选两者其一设值即可）。和expires不同之处在于，maxAge值的单位为毫秒（maxAge:10*1000，即为10秒）。
     *       maxAge值可以是正数和负数。正数表示当前COOKIE存活的时间。负数表示当前COOKIE只是随着浏览器存储在客户端的内存里，只要关闭浏览器，此COOKIE就马上消失。默认值为-1。
     * @default httpOnly
     * @desc 是微软对COOKIE做的扩展。如果在COOKIE中设置了“httpOnly”属性，则通过程序（JS脚本、applet等）将无法读取到COOKIE信息，防止XSS攻击产生。
     * @default overwrite
     * @desc 是否重写
     * @default signed
     * @desc 是否验证签名
     * @default path
     * @desc 指定可访问此COOKIE的目录。如：path=/default 表示当前COOKIE仅能在 default 目录下使用。默认值为“/”，即根目录下的所有目录皆可以访问
     * @default domian
     * @desc 指定可访问COOKIE的主机名。主机名是指同一个域名下的不同主机。如：www.hovertree.com和tool.hovertree.com是在两个不同的主机上，即两个不同的主机名。默认情况下，
     *       一个主机中创建的COOKIE在另一个主机下是不能被访问，但可以通过domain参数来实现对其的控制，即所谓的跨子域。以hovertree为例，要实现跨主机（跨子域）访问，写法如下：
     *       domain=.hovertree.com，这样就实现了所有hovertree.com下的主机都可以访问此COOKIE。（本机环境上设置此值时，COOKIE无法查看。）
     * @default rolling
     * @desc 
     * @default secure
     * @desc 当设为true时，表示创建的COOKIE会以安全的形式向服务器传输，即只能在HTTPS连接中被浏览器传递到服务器端进行会话验证；若是HTTP连接则不会传递该信息，所以不会被窃取到
     *       COOKIE里的具体内容。同理，在客户端，我们也无法使用document.cookie找到被设置了secure=true的cookie健值对。secure属性是防止信息在传递的过程中被监听捕获后信息泄漏，
     *       httpOnly属性的目的是防止程序获取COOKIE后进行攻击（XSS）。我们可以把secure=true看成比httpOnly=true是更严格的访问控制。
     */
    constructor (cookie) {
        this.cookie = cookie;

        this.maxAge = 2 * 60 * 1000;
        this.expires = new Date(2 * 60 * 1000 + Date.now() * 1000);
        this.domian = '';
        this.path = '/';
        this.secure = false;
        this.overwrite = true;
        this.httpOnly = true;
        this.signed = true;
        this.rolling = false;
    }

    /**
     * @function setCookie
     * @desc 设置cookie
     * @param {*} key 
     * @param {*} value 
     * @param {Object} opts 
     */
    setCookie ({key = 'setCookie', value = 'hello Web page', opts = {}} = {}) {
        return this.cookie.set(key, value, Object.assign({maxAge: this.maxAge, overwrite: this.overwrite, httpOnly: this.httpOnly, signed: this.signed}), opts);
    }

    /**
     * @function getCookie
     * @desc 获取cookie
     * @param {*} key 
     */
    getCookie (key) {
        return this.cookie.get(key, {signed: true})
    }
}
module.exports = Cookie;