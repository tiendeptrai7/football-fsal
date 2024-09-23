"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDistinctArrayConstraint = void 0;
exports.IsDistinctArray = IsDistinctArray;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let IsDistinctArrayConstraint = class IsDistinctArrayConstraint {
    validate(value, args) {
        const [property] = args.constraints;
        if (Array.isArray(value)) {
            const distinct = [...new Set(value.map((v) => v[property]))];
            return distinct.length === value.length;
        }
        return false;
    }
};
exports.IsDistinctArrayConstraint = IsDistinctArrayConstraint;
exports.IsDistinctArrayConstraint = IsDistinctArrayConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
], IsDistinctArrayConstraint);
function IsDistinctArray(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsDistinctArray',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsDistinctArrayConstraint,
        });
    };
}
//# sourceMappingURL=request.distinct-array.validation.js.map