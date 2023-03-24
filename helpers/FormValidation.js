class FormValidation{
    /*  This function takes two mandatory parameters (request.body and rules) */
    validate(request_data, rules){
        this.error_messages = [];
        this.values = request_data;
        for(let rule in rules){
            if(rules[rule].length === 1){
                this.#run_validator(this.values[rule], rule, rules[rule][0].split('|'));
            }else{
                this.#run_validator(this.values[rule], rules[rule][0], rules[rule][1].split('|'));
            }
        }
    }
    fails(){
        if(this.error_messages.length > 0){
            return true;
        }else{
            return false;
        }
    }
    #run_validator(field_value, label = '', input_rules = []){
        field_value.trim();

        let rules_list = {
            required: () => {
                if(field_value.length === 0){
                    this.error_messages.push(`The ${label} field is required.`);
                }
            },
            min_length: (min) => {
                if(field_value.length < min){
                    this.error_messages.push(`The ${label} field must be at least ${min} characters long.`);
                }
            },
            max_length: (max) => {
                if(field_value.length > max){
                    this.error_messages.push(`The ${label} field must not be greater than ${max} characters long.`);
                }
            },
            exact_length: (exact) => {
                if(field_value.length !== exact){
                    this.error_messages.push(`The ${label} field must be exactly ${exact} characters long.`);
                }
            },
            valid_email: () => {
                const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!email_regex.test(field_value)){
                    this.error_messages.push(`The ${label} field is not a valid email address.`);
                }
            },
            matches: (match_field) => {
                if(field_value != this.values[match_field]){
                    this.error_messages.push(`The ${label} field must match ${match_field} field.`);
                }
            },
            numeric: () => {
                if(isNaN(field_value)){
                    this.error_messages.push(`The ${label} field must be a number.`);
                }
            }
        }

        for(let index = 0; index < input_rules.length; index++){
            if(input_rules[index].split(":").length === 2){
                let rule = input_rules[index].split(":")[0];
                let rule_value = input_rules[index].split(":")[1];
                rules_list[rule](rule_value);
            }else{
                rules_list[input_rules[index]]();
            }
        }
    }
}


module.exports = new FormValidation();






































// class Sample extends FormValidation{
//     sample(){
//         let validate_input = {
//             first_name: ['First Name', 'required|min_length:10'],
//             last_name: ['Last Name', 'required'],
//             email_address: ['Email', 'required|valid_email'],
//             password: ['required|numeric|exact_length:11'],
//             confirm_password: ['required|matches:password']
//         };
//         this.validate('', validate_input);
//     }
// }

// let sample = new Sample();
// sample.sample();
// console.log(sample.error_message);
// sample.test();
// // let validation = {
// //     first_name: ['First Name', 'required|min'],
// //     last_name: ['Last Name', 'required'],
// //     email_address: ['required']
// // };