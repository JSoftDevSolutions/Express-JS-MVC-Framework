/* All Controllers must extend to the parent controller class */
const BaseController = require(`../../system/core/BaseController`);
const Student = require('../models/Student');

class Students extends BaseController{
    constructor(){
        super();
    }
    async index(request, response){
        // Disable cache so that when back button is press it will redirect back to profile page
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        if(request.session.login_student_id){
            response.redirect('students/profile');
        }else{
            response.render('students/index');
        }
    }
    async process_registration(request, response){
        const validate_registration = Student.validate_registration_data(request.body);
        if(validate_registration === false){
            const save_student = await Student.save_student(request.body);
            if(save_student){
                request.flashdata('success', 'Successfully Registered.');
                response.redirect('/');
            }
        }else{
            request.flashdata('input_values', {
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email_address: request.body.email_address,
                password: request.body.password,
                confirm_password: request.body.confirm_password
            });
            request.flashdata('validation_errors', validate_registration);
            response.redirect('/');
        }
    }
    async process_login(request, response){
        const validate_login = Student.validate_login_data(request.body);
        if(validate_login === false){
            const student_data = await Student.check_student_email(request.body.email_address);
            const validate_login_credentials = Student.validate_login_credentials(student_data, request.body.password);
            if(validate_login_credentials){
                request.session.login_student_id = student_data.id;
                response.redirect('profile');
            }else{
                this.#login_values(request);
                request.flashdata('login_errors', ['Invalid email or password']);
                response.redirect('/');
            }
        }else{
            this.#login_values(request);
            request.flashdata('login_errors', validate_login);
            response.redirect('/');
        }
    }
    async profile(request, response){
        if(request.session.login_student_id){
            let student = await Student.get_student_details(request.session.login_student_id);
            // Disable cache so that when back button is press it will redirect back to login page
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            response.render('students/profile', {profile: student});
        }else{
            response.redirect('/');
        }
    }
    logout(request, response){
        request.session.login_student_id = null;
        response.redirect('/');
    }
    /* Store Login input values in flashdata */
    #login_values(request){
        request.flashdata('login_values', {
            email_address: request.body.email_address,
            password: request.body.password
        });
    }
}

module.exports = new Students();