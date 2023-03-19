/* All Controllers must extend to the parent controller class */
const BaseController = require(`../../system/core/BaseController`);
const Car = require('../models/Car');

class Cars extends BaseController{
    constructor(){
        super();
    }
    async index(request, response){
        if(request.session.visits){
            request.session.visits++;
        }else{
            request.session.visits = 1;
        }
        const cars_list = await Car.get_cars_list();
        response.render('cars/index', {cars: cars_list, visits: request.session.visits});
    }
    reset(request, response){
        request.session.visits = null;
        response.redirect('/cars/index');
    }
}

module.exports = new Cars();