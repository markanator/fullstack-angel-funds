"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRegister = void 0;
const ValidateRegister = (options) => {
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "Invalid Email!",
            },
        ];
    }
    if (options.fullName.length <= 2) {
        return [
            {
                field: "username",
                message: "Too short!",
            },
        ];
    }
    if (options.fullName.includes("@")) {
        return [
            {
                field: "username",
                message: 'Cannot include "@"!',
            },
        ];
    }
    if (options.password.length <= 8) {
        return [
            {
                field: "password",
                message: "Too short!",
            },
        ];
    }
    return null;
};
exports.ValidateRegister = ValidateRegister;
//# sourceMappingURL=ValidateRegister.js.map