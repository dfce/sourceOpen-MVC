/**
 * @class 
 * @desc 运行日志类
 */
const fs = require('fs');
const path = require('path');
class RunLog {
    constructor({runtype = 'rundata'} = {}) {
        this.isProduction = process.env.NODE_ENV.toLowerCase() === 'production' || false;
        this.path = `${process.cwd()}/data/${runtype}`;
    }

    runLog(runlog) {
        var the_date = new Date();
        var name_fix = `${the_date.getFullYear()}${(the_date.getMonth() + 1) > 9 ? (the_date.getMonth() + 1): '0' + (the_date.getMonth() + 1)}${the_date.getDate()}`;
        runlog = `run log as ${the_date.getTime()}:\r\n ${runlog}`
        switch(process.env.NODE_ENV.toLowerCase()) {
            case 'production':
                
                this.mkdir (this.path)
                var saveName = `${this.path}/${name_fix}.log`;
                fs.appendFileSync(saveName, `${runlog}\r\n`);

                break;
            default:    
            case 'development':
                console.log('development:', runlog);
                break;
        }
    }
    mkdir (filePath, mode = '0777') {
        if (fs.existsSync(filePath)) return true;
        // if (this.fsExistsSync(filePath)) return true;
        if(!this.mkdir(path.dirname(filePath)), mode){
            fs.mkdirSync(filePath, mode);
        }
    }

    fsExistsSync ( filePath ) {
        try{
            fs.accessSync( filePath );
        } catch ( e ) {
            return false;
        }
        return true;
    }
}
module.exports = RunLog;