"use strict";
function InternalServerError(code, error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "InternalServerError";
    this.message = error.message;
    this.code = code;
    this.status = 500;
    this.inner = error;
}

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;

module.exports = InternalServerError;