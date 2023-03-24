let profiler = false;
class BaseController{
    constructor(){
        this.load = {
            model: (model_name) => {
                const model = require(`../app/models/${model_name}`);
                return model;
            }
        }
    }
    enable_profiler(value = false){
        profiler = value;
    }
    profiler_status(){
        return profiler;
    }
}

module.exports = BaseController;
























// view: (path, datas = '')=>{
//     /* Check if there is any promise data pass */
//     let promises = [];
//     let promise_keys = [];

//     for(let x in datas){
//         if(Promise.resolve(datas[x]) === datas[x]){
//             promises[promises.length] = datas[x];
//             promise_keys[promise_keys.length] = x;
//         }
//     }
//     return (req, res) => {
//         Promise.all(promises)
//         .then((result) => {
//             /* update the datas object with the resolved data */
//             for(let i=0; i < result.length; i++){
//                 datas[promise_keys[i]] = result[i];
//             }

//             res.render(path, datas, function(err, html){
//                 if(err){
//                     console.log(err);
//                     res.sendStatus(500);
//                 }else{
//                     res.send(html);
//                 }
//             });
//         })
//     }
// }, 
// for(let i=0; i<result.length; i++){
//     for(let x in datas){
//         if(datas[x] === promises[i]){
//             datas[x] = result[i];
//         }
//     }
// }

                        // for(let x in datas){
                        //     if(Promise.resolve(datas[x]) === datas[x]){
                        //         promises[promises.length] = datas[x];
                        //     }
                        // }
                        // console.log(JSON.parse(JSON.stringify(result[1])));
                        // datas.cars = JSON.parse(JSON.stringify(result[0]));
                        // console.log(JSON.parse(JSON.stringify(result)));
                        // datas.cars = JSON.parse(JSON.stringify(result[1]));


/**
 * Base Class Controller
 * 
 * 
* */
// class BaseController{
//     constructor(){
//         this.load = {
//             view: (path, datas = '')=>{
//                 return (req, res) => {
//                     datas.then((result)=> {
//                         res.render(path, {cars: result}, function(err, html){
//                             if(err){
//                                 console.log(err);
//                                 res.sendStatus(500);
//                             }else{
//                                 res.send(html);
//                             }
//                         });
//                     })
//                 }
//             }, 
//             model: (model_name) => {
//                 const model = require(`../app/models/${model_name}`);
//                 return model;
//             }
//         }
//     }
// }

// module.exports = BaseController;