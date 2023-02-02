export default class ApiError extends Error {
    status:number;
    errors:any;
    constructor(status:number, message:string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorisedError(){
        return new ApiError(401, 'Пользователь не авторизовани');
    }
    static BadRequest(message:string, errors = []){
        return new ApiError(400, message, errors);
    }
}



