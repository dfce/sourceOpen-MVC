/**
 * ## @desc :: 目前用得最多的 Node.js Redis 库是 node redis，不过这个库基本已经不再维护了，存在很多 bug（在生产环境中碰到过），
 * 也缺失了很多功能（如 pipeling 和脚本优化）。而 ioredis 不仅支持了 Cluster 和 Sentinel，还在 API 层面和 node redis 保持了兼容。
 * 在 50 并发测试时性能达到了 node redis 的 2-3 倍。
 * 
 * @desc :: 注意Redis 版本
 * @author {Mofei}
 */
const Redis = require("ioredis");
const { Store } = require("koa-session2");

 
class RedisStore extends Store {
    constructor({port = 6379, host = '127.0.0.1', family = 1, password = '', db = 0} = {}) {
        super();
        this.redis = new Redis({
            port: port,       
            host: host, 
            family: family,          
            password: password,
            db: db
        });
    }
 
    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return data ? JSON.parse(data) : null;
    }
 
    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}) {
        try {
            // Use redis set EX to automatically drop expired sessions 
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {}
        return sid;
    }
 
    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}
module.exports = RedisStore;