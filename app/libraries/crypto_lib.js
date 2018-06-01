'use strict';
/**
 * @todo Crypto
 * @desc crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。
 * Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
 * @author { ## Mofei ## }
 */
const crypto = require('crypto');

module.exports = Crypto_lib;

/**
 * @desc Crypto
 * @todo 加密类：：
 */
class Crypto_lib {

    /**
     * @desc 哈希加密
     * @param {String} EnCryptString
     * @param {String} type [md5、sha1、sha256、sha512] 
     * @return {Hash String}
     */
    static hash ( passStr, type = 'md5' ) {
        const hash = crypto.createHash(type);
        hash.update(passStr || '');
        return hash.digest('hex');
    }

    /**
     * @desc Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
     * @param {String} passStr  EnCryptString
     * @param {String} secretKey 密钥 默认 ：secretKey
     * @param {String} type [md5、sha1、sha256、sha512] 
     */
    static hmac ( passStr, secretKey = 'secretKey', type = 'sha512' ) {
        const hmac = crypto.createHmac( type, secretKey );
        hmac.update(passStr || '');
        return hmac.digest('hex');
    }


    /**
     * @todo AES加密
     * @desc AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
    *        AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等
     * @param {String} data 
     * @param {String} key
     * @param {String} type [aes192，aes-128-ecb，aes-256-cbc] 
     * @return {String} 
     */
    static aesEncrypt ( data, key, type = 'aes192' ) {
        const cipher = crypto.createCipher(type, key);
        var crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');

        return crypted;
    }
    /**
     * @todo AES解密
     * @param {String} encrypted 加密串
     * @param {String} key 加密密匙
     * @param {String} type [aes192，aes-128-ecb，aes-256-cbc] 
     * @return {String} 
     */
    static aesDecrypt (encrypted, key, type = 'aes192' ) {
        const decipher = crypto.createDecipher(type, key);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }


    /**
     * @todo DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个【共钥】密钥来。
     * @desc DH 加密
     * @return {object} {Encry_keys:Encry_keys, prime:prime, generator:generator}
     */
    static diff_hellman_encrypto () {
        // Encrypto's keys:
        var Encry_Hellman = crypto.createDiffieHellman(512);
        var Encry_keys = Encry_Hellman.generateKeys();

        var prime = Encry_Hellman.getPrime();
        var generator = Encry_Hellman.getGenerator();

        return {Encry_keys:Encry_keys, prime:prime, generator:generator};
    }

    /**
     * @desc DH解密
     * @param {String} prime 
     * @param {String} generator 
     * @return {String} Decry_keys
     */
    static diff_hellman_decrypto (prime, generator ) {
        var Decry_Hellman = crypto.createDiffieHellman(prime, generator);
        var Decry_keys = hong.generateKeys();

        return Decry_keys;
    }
}