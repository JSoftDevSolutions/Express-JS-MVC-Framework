/*
|   Custom flash data middleware manages flash data stored in the user's session.
|   This function checks if there is any flash data stored in the session, and if so, it passes it to the response object.
|   If there is no flash data in the session, it initializes an empty object to the "locals" object.
|   If there is flash data in the session, pass it to the response locals object and clear the session flash data.
*/
class FlashData{
    static flashdata_middleware(request, response, next){
        request.start_time = new Date().getMilliseconds();
        if(request.session.flashdata){
            response.locals.flashdata = request.session.flashdata;
            request.flash =  request.session.flashdata;
            delete request.session.flashdata;
        }else{
            response.locals.flashdata = {};
        }
        request.flashdata = (type, message) => {
            if(!request.session.flashdata){
                request.session.flashdata = {};
            }
            request.session.flashdata[type] = message;
        };
        next();
    }
}
module.exports = FlashData.flashdata_middleware;