// const DBModel = require('../../system/database/DB-table');
const DBMySql = require('../../system/database/DB-mysql');

// class admin_role_action extends DBModel {
class admin_role_action extends DBMySql {
    constructor () {
        super('verne_admin_role_action');
    }
    
    async getUserCanActions( {roleId = 0, currClass = '', curFunc = ''} = {} ) {
        let sql = `SELECT
                    *
                FROM
                    verne_admin_role_action ARA
                LEFT JOIN 
                    verne_admin_actions AC 
                ON 
                    ARA.action_id = AC.id
                WHERE
                    role_id = ${roleId}
                AND controller = '${currClass}'
                AND action = '${curFunc}'`;
        return await this. execute( sql ); 
    }

    async setUserAction( {roleId = 0, currClass = '', curFunc = ''} = {} ) {
        let actDetail = await this.getActionDetail( currClass, curFunc );
        if (!actDetail) return false;
        await this.insert({role_id: roleId, action_id: actDetail.id})
    }

    async getActionDetail( actClass, actFunc ) {
        let sql = `SELECT 
                    * 
                FROM 
                    verne_admin_actions 
                WHERE 
                    controller = '${actClass}' 
                AND action = '${actFunc}'`;
        return await this. execute(sql);
    }
}
module.exports = admin_role_action;