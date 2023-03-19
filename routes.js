const Express = require("express");
const Router = Express.Router();
const Controllers = require(`./system/core/AutoloadControllers`);

/*
| -------------------------------------------------------------------
| Custom Routing Urls will be declared below
| -------------------------------------------------------------------
| Custom Route Naming Convention : Controllers['ControllerName'].methodName;
| Example: Controllers['Users'].index();
| 
|
| Note: Controller Class Name must be the same with Controller filename (without file extension)
| 
*/

/* Default Route */
Router.get("/", (request, response) => {
    response.render("welcome");
});
// Router.get("/", Controllers['Students'].index);
module.exports = Router;






















// const CarsController = require(`./app/controllers/Cars`);
// console.log(Controllers);
// console.log('Specific Controller');
// console.log(Controllers['Cars']);
// console.log('Manual');
// console.log(CarsController);

// const Express = require("express");
// const Router = Express.Router();
// const UserController = require(`./app/controllers/users`);

// const  path = require("path");
// const  app = Express();
// app.set('views', path.join(__dirname, './app/views'));
// app.set('view engine', 'ejs');

// // Router.get("/", UserController.index());
// Router.get("/", UserController.index);
// Router.get("/training", UserController.viewLoginPage);

// app.use(Router);
// // Router.get("/login", UserController.viewLoginPage);
// // Router.get("/register", UserController.viewRegisterPage);
// // Router.get("/logoff", UserController.processLogoff);
// const server = app.listen(8888);
// // module.exports = Router;