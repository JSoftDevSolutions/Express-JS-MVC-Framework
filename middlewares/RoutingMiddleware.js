const express = require('express');
const express_router = express.Router();

const RoutingMiddleware = (request, response, next) => {
    /* Separates url data. Example:  localhost:1010/User/index, segments = ['localhost:1010', 'User', 'index']
    |  Second index will be tagged as Controller Name and Third index will be method name
    |  Forth index and so on will be tagged as parameters
    */
    let parameters = [];

    const segments = request.url.split('/');
    const controller_name = segments[1];
    let method_name = segments[2];

    for(let index = 3; index < segments.length; index++){
        parameters[parameters.length] = segments[index];
    }
    
    /* Check if method name is empty. Example: localhost:1010/User/ - means index method should be run. */
    if(!method_name && controller_name != ''){
        method_name = 'index';
    }
    /* Load Controller from controllers folder and maps the method name */
    try{
        const controller = require(`../application/controllers/${controller_name}`);
        const method = controller[method_name];
        if(!method){
            throw new Error(`Method ${method_name} not found in controller ${controller_name}`);
        }
        /* Execute method of the the specific controller */
        express_router[request.method.toLowerCase()](request.url, (request, response) => {
            controller[method_name](request, response, parameters);
        });
    }catch(error){
        /* This will trigger if requested controller or method does not exist. */
        response.status(404).render('page404', (error, html) => {
            if(error){
                response.status(404).send('Not Found');
            }else{
                response.send(html);
            }
        });
    }
    next();
}
module.exports = {
    express_router,
    RoutingMiddleware,
};
















// controller[methodName](request, response, ...parameters.slice(0, parameters.length));
// // express_router[request.method.toLowerCase()](request.url, method);
// module.exports = RoutingMiddleware;
// const Express = require("express");
// const Router = Express.Router();

// function logRequest(request, response, next) {
//     // console.log(`${request.method} ${request.url}`);
//     // response.send(request.url);
//     // Router.get("/", Controllers['Cars'].index());
//     // require(`../app/models/${model_name}`);

//     const segments = request.url.split('/');
//     const controllerName = segments[1];
//     const methodName = segments[2];

//     if (controllerName && methodName) {
//         console.log(`${controllerName} ${methodName}`);
//         // response.send(request.url);
//         const controller = require(`../app/controllers/${controllerName}`);
//         const method = controller[methodName];
//         // console.log(method);
//         // console.log(controller);
//         // console.log(request.url);
        
//         // response.send(request.url);
//         // if (method) {
//         //     method(req, res, next);
//         //     return;
//         // }
//         // load(controller);
//         Router.get("/test", controller.test());
//     }
//     next();
// }
// function load(controller){
//     Router.get('/cars/index', controller.test());
// }
// module.exports = logRequest;