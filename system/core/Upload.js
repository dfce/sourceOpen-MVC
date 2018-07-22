/**
 * @class Upload
 * @desc 文件上传类
 *       支持单文件、批量上传、与删除；【后续： 单文件、批量下载】
 * @author {M0fei}
 */
const fs = require('fs');
const path = require('path');
const io = require('socket.io-client')('http://localhost:3001');

class Upload {
    constructor() {
        // 所有上传文件只会在此目录下
        this.UPLOAD_PATH = `${global.APP_PATH}/public/static/uploads`;
        this.UpTypes = ['zip', 'gzip', 'rar', 'application/octet-stream', 'application/x-zip-compressed', 'jpg' , 'bmp' , 'gif', 'png',
                        'txt', 'doc', 'xls', 'docx', 'xlsx', 'pdf', 'mp3', 'mp4', 'ppt', 'pptx'];
        this.RtnInfo = {
            RtnSuc : false,
            RtnMsg : '上传失败',
            Result : ''
        }
    }

    async save (ctx) {
        if (ctx.request.method !== 'POST') {
            this.RtnInfo.RtnMsg = '非法请求';
            return this.RtnInfo;
        }
        if (!(ctx.request.body.fields || false)) {
            this.RtnInfo.RtnMsg = '没有上传文件';
            return this.RtnInfo;
        }

        let files = ctx.request.body.files;
        let socketID = ctx.request.body.fields ? ctx.request.body.fields.socketID || false : false;


        /** @desc 处理原文件 */
        let isOldFiles = ctx.request.body.fields.remOld || false;
        if (isOldFiles) {
            this.rmdir(isOldFiles);
        }

        /** @desc 保存文件 */
        await this.fsReadStream(files, socketID);
        return this.RtnInfo;
    }
    
    /**
     * @function fsReadStream
     * @desc 批量处理文件上传、流写入
     * @param {Object} files 
     * @return {Object} {success: Boolean, file_name: String}
     */
    async fsReadStream (files, socketID) {
        let fileNames = [];
        let i = 0;

        for (let f in files) {
            
            let _fsCheckIng = this.fsCheck(files[f]);
            // ** 文件检测完成 ； 写入成功【返回成功写入返回文件名组】、失败【返回失败删除已写入文件】
            if ( _fsCheckIng ) {

                var fParam = 'binary';
                var fWritePath = _fsCheckIng.wPath + _fsCheckIng.fName;

                let wsType = await this.fsRWrite( files[f].path, fWritePath, fParam, socketID);
                if ( wsType.writeType ) {
                    this.RtnInfo.RtnSuc = true;
                    this.RtnInfo.RtnMsg = '上传成功';
                    fileNames[i] = _fsCheckIng.fName;
                    this.RtnInfo.Result = fileNames;
                } else {
                    this.rmdir(fWritePath);
                    this.RtnInfo.RtnSuc = this.RtnInfo.RtnSuc || false;
                    this.RtnInfo.RtnMsg += `、${wsType.writeError}`;
                    // this.RtnInfo.RtnMsg += `，${files[f].path}.上传失败、${wsType.writeError}`;
                    return this.RtnInfo;
                }
                i++;
            }
        }
        return this.RtnInfo; 
    }

    /**
     * @function fsCheck
     * @desc 文件数据检测
     * @param {file} f 
     * @return {Object|false}
     */
    fsCheck (f) {
        let stat = fs.statSync(f.path);
        /** @desc 检测文件类型  */
        let pattern  =  /\w+\/(\w+)/gi;
        let pregArr  = pattern.exec( f.type );
        let fType    = pregArr[1];
        let fSize    = f.size;
        let fName = '';

        if ( !stat.isFile() ) {
            this.RtnInfo.RtnMsg = `上传的不是文件`;
            return false; 
        }

        if (Object.is(this.UpTypes.indexOf(fType), undefined)) {
            this.RtnInfo.RtnMsg = `不支持上传${fType}类型的文件`;
            return false;
        }

        /** @desc 检测文件大小 */
        let UpSize = this.UpSize(fType);
        let UpMaxSize = UpSize.Size;
        if ( fSize > UpMaxSize || stat.size > UpMaxSize) {
            var maxSize = UpMaxSize / (1024*1024);
            this.RtnInfo.RtnMsg = `上传文件超过允许最大${maxSize}M范围`;
            return false;
        }

        /** @desc 检测上传目录是否存在 */
        let wpath = UpSize.wpath;
        let the_date = new Date();
        let name_fix = the_date.getFullYear() + '' + (the_date.getMonth() + 1) + '' + the_date.getDate() + '' + the_date.getTime();
        if (!this.fsExistsSync(wpath)) {
            this.mkdir(wpath);// OR fs.mkdirSync(wpath, 0777);
        }
        // return {wPath : wpath, fName : name_fix  + (f.path.split('_')[1] || '') +  '.' + UpSize.fSuffix};
        return {wPath : wpath, fName : `${name_fix}${(f.path.split('_')[1] || '')}.${UpSize.fSuffix}`};
    }

    UpSize ( mimietype ) {   
        let unit = 1024 * 1024;
        let basePath = this.UPLOAD_PATH;
        let res = {Size : 0, wpath : '', fSuffix: mimietype};

        switch (mimietype) {
            case 'gzip':
                res.Size = 5 * 1024 * unit;
                res.wpath = basePath + '/rar/';
                res.fSuffix = 'tar.gz';
                break;
            case 'zip':
            case 'rar':
                res.Size = 5 * 1024 * unit;
                res.wpath = basePath + '/rar/';
                break;
            
            case 'mp3':
            case 'mp4':
                res.Size = 5 * 1024 * unit;
                res.wpath = basePath + '/video/';
            break;
            
            case 'jpg':
            case 'png':
            case 'jpeg':
            case 'bmp':
            case 'gif':
                res.Size = 2 * unit;
                res.wpath = basePath + '/image/';
                break;
            case 'txt':
            case 'doc':
            case 'xls':
            case 'docx':
            case 'docx':
            case 'pdf':
                res.Size = 50 * unit;
                res.wpath = basePath + '/file/';
                break;    
            default :
                res.Size = 2 * unit;
                res.wpath = basePath + '/other/';
                break;
        }
        return res;
    }

    /**
     * @function mkdir
     * @desc 递归创建目录
     * @param {String} filePath 
     * @param {String} mode 
     */
    mkdir (filePath, mode = '0777') {
        if (fs.existsSync(filePath)) return true;
        // if (this.fsExistsSync(filePath)) return true;
        if(!this.mkdir(path.dirname(filePath)), mode){
            fs.mkdirSync(filePath, mode);
        }
    }

    /**
     * @function rmdir
     * @desc 递归删除文件直至目录
     * @param {String} rmTarget 
     */
    rmdir (rmTarget) {
        let targetPath = rmTarget.startsWith(this.UPLOAD_PATH) ? rmTarget : `${this.UPLOAD_PATH}/${rmTarget}`;
        let stat = fs.statSync(targetPath);

        /** @desc 如果指定目录 递归删除直至目录 */
        if (stat.isDirectory()) {   
            let files = fs.readdirSync(targetPath);
            for (let f of files) {
                this.rmdir(`${targetPath}/${f}`);
            }
            fs.rmdirSync(targetPath);
        } else if (stat.isFile()) {
           fs.unlinkSync(targetPath); 
        }
    }

    /**
     * @function fsExistsSync
     * @desc 检测是否目录 {fs.exists 废弃了，推荐用fs.stat 和fs.access来实现}
     * @param {wpath} path 
     */
    fsExistsSync (wpath) {
        try{
            fs.accessSync( wpath );
        } catch ( e ) {
            return false;
        }
        return true;
    }

    /**
     * @function fsRWrite
     * @desc {文件流读取写入}
     * @param {f_Rpath} f_Rpath 
     * @param {f_Wpath} f_Wpath
     * @param {f_param} f_param
     */
    async fsRWrite (f_Rpath, f_Wpath, f_param, socketID) {
        return await new Promise((resolve, reject) => {
            let rs = fs.createReadStream( f_Rpath, f_param);
            let ws = fs.createWriteStream( f_Wpath, f_param);
            let fsRWriteInfo = {
                writeType: false,
                writeError: '',
            };

            /** @desc 上传进度 */
            let stat = fs.statSync(f_Rpath);  
  
            let totalSize = stat.size;  
            let passedLength = 0;  
            let lastSize = 0;  
            let startTime = Date.now();
            let chunkOut = false;

            // rs.pipe(ws); /** @desc 整个写入 ： 如果写入的速度跟不上读取的速度，有可能导致数据丢失。正常的情况应该是，写完一段，再读取下一段，如果没有写完的话，就让读取流先暂停，等写完再继续 */
            /** @desc 分段读取、写入 */
            rs.on('data', chunk => {
                if ( ws.write(new Buffer(chunk, f_param)) === false  ) { //  如果没有写完，暂停读取流
                    passedLength += chunk.length;
                    rs.pause();
                } else {
                    chunkOut = true;
                }
            });
            
            ws.on('drain', () => rs.resume());// 写完后，继续读取
            // rs.on('end', () => ws.end()) // 读完 or close // rs.on('end、close', function () {})
            
            ws.on('finish', () => { // ws end()
                fsRWriteInfo.writeType = true;
                resolve(fsRWriteInfo);
            })
            
            /**
             * @desc ws、rs onError 文件读写错误监控：方式二
             * rs.on('error', function (err) {  // ws.on('error', function (err) {});
             *      fsRWriteInfo.writeType = false;
             *      fsRWriteInfo.writeError = `rsEror: ${err}`;
             *      reject(fsRWriteInfo)
             * });
             */
            rs.on('error', err => onError(err, 'rs'));
            ws.on('error', err => onError(err, 'ws'));

            function onError (err = '出错了', type = 'rs') {
                fsRWriteInfo.writeType = false;
                fsRWriteInfo.writeError = err;
                resolve(fsRWriteInfo); // reject(fsRWriteInfo);
            }

            
            /**
             * @desc 因后一个间歇调用可能会在前一个间歇调用结束之前启动； JavaScript高级程序设计(第三版)建议，使用超时调用（setTimeout）来模拟间歇调用（setInterval）的是一种最佳模式
             */
            // let progressSet = setInterval(function progress() {
            //     if (chunkOut) passedLength = totalSize;
            //     let percent = Math.ceil((passedLength / totalSize) * 100);  
            //     let size = Math.ceil(passedLength / 1000000);  
            //     let diff = size - lastSize;  
            //     lastSize = size; 
    
            //     // console.log(totalSize, `已完成${size}MB, ${percent}%, 速度：${diff * 2}MB/s`);
            //     io.emit("progress", {socketID: socketID, progress: {size: size, percent: percent, diff: diff}, notes: `已完成${size}MB, ${percent}%, 速度：${diff * 2}MB/s`});
            //     if (chunkOut || passedLength >= totalSize || percent >= 100) { // passedLength 读取差异可能导致 passedLength <=> totalSize
            //         let endTime = Date.now();  
            //         console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');  
            //         clearInterval(progressSet);
            //         setTimeout(() => {ws.end()}, 110)
            //     }
            // }, 100)

            setTimeout(function progressSet () {
                if (chunkOut) passedLength = totalSize;
                let percent = Math.ceil((passedLength / totalSize) * 100);
                let size = Math.ceil(passedLength / 1000000);
                let diff = size - lastSize;
                lastSize = size;
                
                io.emit("progress", {socketID: socketID, progress: {size: size, percent: percent, diff: diff}, notes: `已完成${size}MB, ${percent}%, 速度：${diff * 2}MB/s`});
                if (chunkOut || passedLength >= totalSize || percent >= 100) { // passedLength 读取差异可能导致 passedLength <=> totalSize
                    let endTime = Date.now();
                    console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
                    setTimeout(() => {ws.end()}, 110)
                } else {
                    setTimeout(progressSet, 100)
                }
            }, 100)
                    
        })
    }
}
module.exports = new Upload;