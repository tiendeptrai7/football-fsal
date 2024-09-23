"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPhoneConstraint = void 0;
exports.IsValidPhone = IsValidPhone;
const app_constant_1 = require("../../../app/constant/app.constant");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let IsValidPhoneConstraint = class IsValidPhoneConstraint {
    validate(value) {
        if (!value?.toString()?.trim())
            return true;
        return !!app_constant_1.PHONE_REGEX.test(value);
    }
};
exports.IsValidPhoneConstraint = IsValidPhoneConstraint;
exports.IsValidPhoneConstraint = IsValidPhoneConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
], IsValidPhoneConstraint);
function IsValidPhone(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsValidPhone',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsValidPhoneConstraint,
        });
    };
}
//# sourceMappingURL=request.valid-phone.validation.js.map