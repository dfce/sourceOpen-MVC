'use strict';
/**
 * @desc fetchData
 * @todo 同步读取接口数据
 */

 const request = require('request');
 class FetchData {
    
    FetchData( url, params = {}, method = false, headers = false, json = true ){
        let _json   = json || false;
        let _method = method ? 'POST' : 'GET';
        let _headers = headers ? headers : {"content-type": "application/json"};

        return new Promise( ( resolve, reject ) => {
            request({
                url: url,
                method: _method,
                json: _json,
                headers: _headers,
                body: JSON.stringify( params )
            }, function( error, response, body ){
                if (!error && response.statusCode == 200) {
                    resolve( body );
                }else{
                    reject( error );
                }
            });
        })
    }
 }
 module.exports = new FetchData;