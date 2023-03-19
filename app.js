const  express = require("express");
const  path = require("path");
const  app = express();
const session = require("express-session");
const  body_parser = require('body-parser');

/* Custom routes will be define here */
const routes = require("./routes");
/* Custom middleware that will map the ControllerName/MethodName base on the url. Only triggers when url is not defined in custom routes. */
const { express_router, RoutingMiddleware } = require('./middlewares/RoutingMiddleware');
/* Custom middleware for flashdata */
const flash_data = require('./middlewares/FlashData');
const config = require("./configs/base_config");

app.set('views', path.join(__dirname, "./application/views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/assets"));
app.use(body_parser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(flash_data);
app.use(routes);
app.use(RoutingMiddleware);
app.use(express_router);

app.listen(config.server_port);




























// app.get('/testing', function(req, res){
//     if(req.session.views){
//         if(repeat == 0){
//             req.session.views++
//         }else{
//             repeat = 0;
//         }
//     }else{
//         req.session.views = 1
//     }
//     console.log(req.session.views);
//     res.render("test", {visit_count: req.session.views});
// })





















// function RoutingMiddleware(request, response, next) {
//     const segments = request.url.split('/');
//     const controllerName = segments[1];
//     const methodName = segments[2];

//     if (controllerName && methodName) {
//         const controller = require(`./app/controllers/Cars`);
//         const method = controller[methodName]();
//         Router.get(request.url, method);
//     }
//     next();
// }























// app.use(load_controllers);
// function logRequest(req, res, next) {
//     console.log(`${req.method} ${req.url}`);
//     next();
// }
// function load_controllers(){
//     const fs = require('fs');
//     const path = require('path');

//     const controllerPath = path.join(__dirname, './app/controllers');
//     const controllerFiles = fs.readdirSync(controllerPath);

//     const controllers = {};

//     for (const file of controllerFiles) {
//         console.log(file);
//         const controllerName = file.replace('.js', '');
//         const controller = require(path.join(controllerPath, file));
//         controllers[controllerName] = controller;
//     }

//     console.log(controllers);
// }