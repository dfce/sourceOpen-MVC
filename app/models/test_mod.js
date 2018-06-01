const DBMySql = require('../../system/database/DB-mysql');

class test_role extends DBMySql {
    constructor () {
        super('verne_admin_role');
    }

    async transTest () {
        let Transaction = await this.allowTransaction();
        
        try {

            let idi = 1;
            var res = await this.insert({
                id: idi,
                role_name: `roleName${idi}`,
            });
            console.log(`res : ${idi} ==> `, res);
            idi++;
            res = await this.insert({
                id: idi,
                role_name: `roleName${idi}`,
            });
            console.log(`res : ${idi} ==> `, res);
            
            
            idi++;
            res = await this.insert({
                id: 10,
                role_name: `roleName${idi}`,
            });
            console.log(`res : ${idi} ==> `, res);
            if (idi >= 13) throw new Error('idi >= 3 rollback');
            idi++;
            res = await this.insert({
                id: 11,
                role_name: `roleName${idi}`,
            });
            console.log(`res : ${idi} ==> `, res);

            this.transEnd('commit');
        } catch (e) {
            console.log('rollback error:', e)
            this.transEnd('rollback');
        }
    }
}
module.exports = new test_role();