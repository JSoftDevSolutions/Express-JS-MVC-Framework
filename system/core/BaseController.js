let session = require('express-session');
let express = require("express");

class BaseController{
    constructor(){
        this.load = {
            view: (path, datas = '')=>{
                /* Check if there is any promise data pass */
                let promises = [];
                let promise_keys = [];

                for(let x in datas){
                    if(Promise.resolve(datas[x]) === datas[x]){
                        promises[promises.length] = datas[x];
                        promise_keys[promise_keys.length] = x;
                    }
                }
                return (req, res) => {
                    Promise.all(promises)
                    .then((result) => {
                        /* update the datas object with the resolved data */
                        for(let i=0; i < result.length; i++){
                            datas[promise_keys[i]] = result[i];
                        }

                        res.render(path, datas, function(err, html){
                            if(err){
                                console.log(err);
                                res.sendStatus(500);
                            }else{
                                res.send(html);
                            }
                        });
                    })
                }
            }, 
            model: (model_name) => {
                const model = require(`../app/models/${model_name}`);
                return model;
            }
        }
    }
}

module.exports = BaseController;