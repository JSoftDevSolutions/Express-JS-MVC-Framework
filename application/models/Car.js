/* All Controllers must extend to the parent controller class */
const BaseModel = require(`../../system/core/BaseModel`);

class Car extends BaseModel{
    get_cars_list(){
        return this.result_array('Select * from cars');
    }
}

module.exports = new Car();