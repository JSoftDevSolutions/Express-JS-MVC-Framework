const db_config = require('../../configs/database');
const db = db_config.mysql();
let last_query = '';
class BaseModel{
    constructor(){
        this.load = {
            helper: (helper_name) => {
                const helper = require(`../../helpers/${helper_name}`);
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
    static latest_query(){
        let temp = last_query;
        last_query = '';
        return temp;
    }
    #execute_query(query, values){
        last_query = db.format(query, values || []);
        return new Promise(resolve => {
            db.query(query, values, function (err, result) {
                resolve(result);
            });	
        });
    }
}

module.exports = BaseModel;























// let cars = new BaseModel();
// let insert = cars.result_array('Select * from cars where id = ?', [1]);
// console.log(insert);
// setTimeout(()=> { console.log(insert) }, 2000);





























// async try_array(query, values =''){
    //     let result =  await this.#execute_query(query, values)
    //     .then((data) => {
    //         console.log(data);
    //         return data;
    //     })
    //     // return new Promise((resolve, reject)=> {
    //     //     db.query(query, values,
    //     //     function(err, data) {
    //     //         if(err) {
    //     //             return reject(err);
    //     //         }
    //     //         resolve(data);
    //     //     });
    //     // })
    // }
    // try_na(){
    //     db.query('SELECT * FROM cars where id = 1',function(err,rows)     {
    //         if(err) {
    //             // req.flash('error', err);
    //             // render to views/users/index.ejs
    //             // res.render('users',{data:''});   
    //             console.log(err);
    //         } else {
    //             // render to views/users/index.ejs
    //             // res.render('users',{data:rows});
    //             for(var i = 0; i< rows.length; i++) {
    //                 console.log(rows[i].name);
    //             }
    //         }
    //     });
    // }
    // test(query, callback){
    //     db.query(query, (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             callback((null, err));
    //             return;
    //         }
    //         callback(null, res);
    //     });
    //     db.end();
    // }
    // #execute_(query){
    //     db.query(query, (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             return;
    //         }
    //         return res;
    //     });
    //     db.end();
    // }
// let cars = new BaseModel();
// cars.try_na();

// let result = cars.try_array('select * from cars')
// // .then((data) => {
// //     console.log(data);
// // })
// // console.log(result);
// setTimeout(()=> { console.log(result) }, 2000);
// // cars.row_array('select * from cars where id = 1');
// // let result = cars.try_array("SELECT * FROM products");
// // setTimeout(()=> { console.log(result) }, 2000);






















// let result =  this.#execute_query(query);
        // return result[0]
// class Cars extends Model{
//     async show(){
//         let result = await this.row_array('SELECT * FROM cars');
//         console.log(result[0])
//     }
// }
// let model = new Model();
// let cars = new Cars();
// cars.show();




















// let model = new Model();
// let cars = new Cars();
// cars.show();
// model.query('INSERT INTO cars (name, year) VALUES ("Sample Name", "1998")');
// model.query('SELECT * FROM cars').result_array();
// model.query('SELECT * FROM cars');
// model.test();
// model.result_array();
// model.test().test2();
// let result = model.fetch_all('SELECT * FROM cars');
// console.log(result);

// setTimeout(function(){
//     console.log(result);
// }, 2000)
// let get = async () => {
//     try {
//         const caseInstance = await model.fetch_all('SELECT * FROM cars');
//         console.log(caseInstance);
//     } catch (error) {
//         console.error(error);
//     }
// }
// get();