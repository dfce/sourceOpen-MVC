const nodemailer = require('nodemailer');
const Exception = require('./Exception');
/**
 * @class Email_Exception
 * @desc 邮件错误定义类
 */
class Email_Exception extends Exception {
    constructor ({msg = '', code = 505, type = 'EMail', ...args} = {}) {
        super({msg, code, type, ...args});
    }
}
Email_Exception.EXCEPTION_CODE = 505;
Email_Exception.EXCEPTION_TYPE = 'EMail';
Email_Exception.MAIL_TO_NOTNULL = '没有指定邮件接收者';
Email_Exception.MAIL_SUBJECT_NOTNULL = '没有指定邮件标题';
Email_Exception.MAIL_BODY_NOTNULL = '没有指定邮件内容';
Email_Exception.MAIL_ATTACHMENT_NOTNULL = '附件内容不能为空';

/**
 * @class Email
 * @desc 邮件处理类
 */
class Email {
    constructor (account) {
        this.transporter = nodemailer.createTransport({
            // service: 'qq',
            host: 'smtp.aliyun.com', //account.smtp.host,
            port: 25, //account.smtp.port,
            secure: false, //account.smtp.secure,
            auth: {
                // user: '253978241@qq.com',//account.user,
                // pass: 'atxwxjlocmcgbiie',//account.pass
                user: 'dunfee@aliyun.com',//account.user,
                pass: '!@QW2539dfce241',//account.pass
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields
            // sender info
            from: 'dunfee@aliyun.com',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        });

        this.emailOpts = {};
    }

    /**
     * @desc Comma separated list of recipients
     * @param {String} users 
     *  2116887500@qq.com, 2116887501@qq.com
     */
    setTo (users) {this.emailOpts.to = users}
    /**
     * @desc from
     * @param {String} user
     *  mofei<2116887500@qq.com>
     */
    setFrom (user) {this.emailOpts.from = user}
    /**
     * @desc Subject of the message
     * @param {String} subject
     */
    setSubject (subject) {this.emailOpts.subject = subject}
    /**
     * @desc plaintext body
     * @param {String} text
     */
    setText (text) {this.emailOpts.text = text}
    /**
     * @desc  html body
     * @param {String} html
     */
    setHtml (html) {this.emailOpts.html = html}
    /**
     * @desc An array of attachments
     * @param {Array} attachments
     * [
     *       // String attachment
     *       {
     *           filename: 'notes.txt',
     *           content: 'Some notes about this e-mail',
     *           contentType: 'text/plain' // optional, would be detected from the filename
     *       },
     *       // Binary Buffer attachment
     *       {
     *           filename: 'image.png',
     *           content: Buffer.from(
     *               'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
     *                   '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
     *                   'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
     *               'base64'
     *           ),
     *           cid: 'note@example.com' // should be as unique as possible
     *       },
     *       // File Stream attachment
     *       {
     *           filename: 'nyan cat ✔.gif',
     *           path: ${global.APP_PATH/publlic/static/imgs/***.gif},
     *           cid: 'nyan@example.com' // should be as unique as possible
     *       }
     *   ]
     */
    setAttachments (attachments) {this.emailOpts.attachments = attachments}

    async send () {
        try {
            this.collect();
            // Message object
            let message = this.emailOpts;
            let info = await this.transporter.sendMail(message);
            // console.log(info);
            // console.log(nodemailer.getTestMessageUrl(info));
            // console.log(info.envelope);
            // console.log(info.messageId);
            // console.log(info.message.toString());
            // only needed when using pooled connections
            this.transporter.close();
            return info;
        } catch (error) {
            // console.error(error);
            return error
        }
    }

    collect () {
        if (typeof this.emailOpts.to !== 'string' || Object.is(this.emailOpts.to, undefined) || Object.is(this.emailOpts.to, null)) {
            throw new Email_Exception({msg: Email_Exception.MAIL_TO_NOTNULL});
        }    
        if (typeof this.emailOpts.subject !== 'string' || Object.is(this.emailOpts.subject, undefined) || Object.is(this.emailOpts.subject, null)) new Email_Exception({msg: Email_Exception.MAIL_SUBJECT_NOTNULL});
        
        if ((typeof this.emailOpts.text !== 'string' || Object.is(this.emailOpts.text, undefined) || Object.is(this.emailOpts.text, null)) &&
            (typeof this.emailOpts.html !== 'string' || Object.is(this.emailOpts.html, undefined) || Object.is(this.emailOpts.html, null))){
                new Email_Exception({msg: Email_Exception.MAIL_BODY_NOTNULL});
        }
        
        if (typeof this.emailOpts.attachments === 'Array' && this.emailOpts.attachments.length <= 0 ){
            new Email_Exception({msg: Email_Exception.MAIL_ATTACHMENT_NOTNULL});
        }
    }

}


module.exports = Email;