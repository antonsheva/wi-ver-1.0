module.exports = class UserDto {
    id:number;
    login:string;
    isActivated:boolean;

    constructor(model:UserDto) {
        this.id = model.id;
        this.login = model.login;
        this.isActivated = model.isActivated;
    }
}