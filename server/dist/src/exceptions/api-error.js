"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiError = class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorisedError() {
        return new ApiError(401, 'Пользователь не авторизовани');
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
};
exports.default = apiError;
//# sourceMappingURL=api-error.js.map