// const DBMySql = require('../../system/database/DB-mysql');
const DBMySql = require('../../system/database/DB_mysql-2.0');

class test_role extends DBMySql {
    constructor () {
        super('verne_admin_role');
    }

    async transTest () {
        await this.TransBegin();
        
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
            this.TransEnd('commit');
        } catch (e) {
            this.TransEnd('rollback');
        }
    }
}
module.exports = new test_role();