const db_config = require('../../configs/database');
const db = db_config.mysql();
class BaseModel{
    constructor(){
        this.load = {
            helper: (helper_name) => {
                const helper = require(`../helpers/${helper_name}`);
                return helper;
            }
        };
    }
    async insert(query, values = []){
        const result = await this.#execute_query(query, values);
        return result.insertId;
    }
    async delete(){
        return await this.#execute_query(query);
    }
    async row_array(query, values = []){
        let result =  await this.#execute_query(query, values);
        return result[0];
    }
    async result_array(query, values = []){
            return  await this.#execute_query(query, values);
    }
    #execute_query(query, values){
        return new Promise(resolve => {
            db.query(query, values, function (err, result) {
                resolve(result);
            });	
        });
    }
}

module.exports = BaseModel;