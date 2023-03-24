const  express = require("express");
const  app = express();
const  path = require("path");
const session = require("express-session");
const  body_parser = require('body-parser');

/* Custom routes will be define here */
const routes = require("./routes");
/* Main configuration File */
const config = require("./configs/base_config");

/* Custom middleware for flashdata */
const flash_data = require('./middlewares/FlashData');
/* Custom middleware for profiler */
const profiler = require('./middlewares/EnableProfiler');
/* Custom middleware that will map the ControllerName/MethodName base on the url. Only triggers when url is not defined in custom routes. */
const routing_middleware = require('./middlewares/RoutingMiddleware');


app.set('views', path.join(__dirname, "./application/views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/assets"));
app.use(body_parser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(flash_data, profiler, routes, routing_middleware);
app.listen(config.server_port);