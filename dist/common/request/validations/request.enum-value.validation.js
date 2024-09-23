"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEnumValueConstraint = void 0;
exports.IsEnumValue = IsEnumValue;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let IsEnumValueConstraint = class IsEnumValueConstraint {
    validate(value, args) {
        const [property] = args.constraints;
        return value in property;
    }
};
exports.IsEnumValueConstraint = IsEnumValueConstraint;
exports.IsEnumValueConstraint = IsEnumValueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
], IsEnumValueConstraint);
function IsEnumValue(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsEnumValue',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsEnumValueConstraint,
        });
    };
}
//# sourceMappingURL=request.enum-value.validation.js.map