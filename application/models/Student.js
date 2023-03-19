/* All Controllers must extend to the parent controller class */
const BaseModel = require(`../../system/core/BaseModel`);
/* Used for hashing password */
const bcrypt = require('bcryptjs');

class Student extends BaseModel{
    save_student(student){
        /* hashes the password from student object */
        student.password = bcrypt.hashSync(student.password, 10);
        return this.insert('INSERT INTO students (first_name, last_name, email_address, password) VALUES(?, ?, ?, ?)', [student.first_name, student.last_name, student.email_address, student.password]);
    }
    check_student_email(email_address){
        return this.row_array('Select * from students where email_address = ?', [email_address]);
    }
    get_student_details(student_id){
        return this.row_array('Select first_name, last_name, email_address from students where id = ?', [student_id]);
    }
    
    /* Validations */
    /* 
    |  When validating data, you must pass the request.body object from controller.
    |  validate convention => validate(request.body object, rules) 
    |  rules convention => field_name: ['Optional Label', 'list of rules']
    |  validation rules is based on the concept of laravel framework.
    */
    validate_registration_data(request_data){
        /* this will load the form validation helper class */
        const form_validation = this.load.helper('FormValidation');
        form_validation.validate(request_data, {
            first_name: ['First Name', 'required|min_length:2'], 
            last_name: ['Last Name', 'required|min_length:2'],
            email_address: ['Email', 'required|valid_email'],
            password: ['required|min_length:8'],
            confirm_password: ['required|min_length:8|matches:password']
        });
        /* Returns true if any validation fails.*/
        if(form_validation.fails()){
            return form_validation.error_messages;
        }else{
            return false;
        }
    }
    validate_login_data(request_data){
        const form_validation = this.load.helper('FormValidation');
        form_validation.validate(request_data, {
            email_address: ['Email', 'required|valid_email'],
            password: ['Password', 'required|min_length:8']
        });
        if(form_validation.fails()){
            return form_validation.error_messages;
        }else{
            return false;
        }
    }
    validate_login_credentials(student, password){
        if(student && bcrypt.compareSync(password, student.password)){
            return true;
        }
        return false;        
    }
}

module.exports = new Student();