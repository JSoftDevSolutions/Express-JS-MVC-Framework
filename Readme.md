# About Express-MVC-Framework
Express MVC framework is a powerful tool for building web applications that are easy to maintain and extend.
- Build your web applications using Node.js and Express with the Model-View-Controller (MVC) architectural pattern.

# Features
    - Middlewares
        └── Enable Profiler: Profiler is useful for tracking your application performance by analysing the execution time and memory usage. 
        Profiler is also helpful for debugging as you can easyly track the "POST Data, Session Data and Latest Database Query."
        └── FlashData: Built using express-session module together with res.locals. Flashdata is useful for Handling success and error messages. 
        This data is automatically cleared after one request. Therefore you don't need to manually unset or clear messages in the session.
        └── RoutingMiddleware: This feature is very time saving and reduces your lines of code. Having this feature you don't need to manually 
        define your routes in the route file in order to render your page of specific controller and method. This middleware do that for you, 
        it will automatically maps for the specific controller and method. will display appropriate error page when requested route doesn't exist. 
        Works on all HTTP request methods (Example: POST, GET, PUT).
    
    - AutoloadControllers - This feature simply autoload all available controllers in the controller directory. Instead of requiring each controller, 
    this feature did that job for you.

    - BaseController
        └── By default you can load your models at the top of your page. But what if you only want to load that specific model in specific route? 
        No worries! you can do that in this MVC Framework. You can load your model in specific method by using this code 
        "const model_name = this.load.model('ModelName');".
        └── Enable Profiler in specific Controller by using this code "this.enable_profiler(true)";

    - BaseModel
        └── All operations related to database such us insert, update, delete, result array and row array. 
            Note: All Models should extend in Base Model Class
        └── You can also load your helpers in Model by using this code "const variable_name = this.load.helper('helper_name')";

    - FormValidation - This helper function simply provides validation for form data like requiring specific field when submitted.

# Instructions to run this application
    - run this in your terminal "git clone https://github.com/JSoftDevSolutions/Express-JS-MVC-Framework.git" to get the boiler template.
    - run npm install to update dependencies
    - set up appropriate configuration in the base_config and database_config file.
    - run nodemon app.js
    - Congrats you can now use the Express MVC Framework

# Folder Structure              
 - Express MVC Framework/
  - application/
    - controllers/
    - models/
    - views/
  - assets/
    - css/
    - images/
    - js/
  - configs/
    - base_config.js
    - database.js
  - helpers/
    - FormValidation.js
  - middlewares/
    - EnableProfiler.js
    - FlashData.js
    - RoutingMiddleware.js
  - system/
    - core/
        - AutoloadController.js
        - BaseController.js
        - BaseModel.js
  - app.js
  - package-lock
  - package.json
  - README.md
  - route.js
