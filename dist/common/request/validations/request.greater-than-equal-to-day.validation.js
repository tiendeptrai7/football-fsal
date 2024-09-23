"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGreaterThanOrEqualToDayConstraint = void 0;
exports.IsGreaterThanOrEqualToDay = IsGreaterThanOrEqualToDay;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const dayjs_1 = __importDefault(require("dayjs"));
let IsGreaterThanOrEqualToDayConstraint = class IsGreaterThanOrEqualToDayConstraint {
    validate(value, args) {
        const [compare] = args.constraints;
        let compareValue;
        if (compare === 'now') {
            compareValue = (0, dayjs_1.default)();
        }
        else if (args.object[compare]) {
            compareValue = args.object[compare];
        }
        else {
            compareValue = (0, dayjs_1.default)(compare);
        }
        return (0, dayjs_1.default)(value).diff(compareValue) >= 0;
    }
};
exports.IsGreaterThanOrEqualToDayConstraint = IsGreaterThanOrEqualToDayConstraint;
exports.IsGreaterThanOrEqualToDayConstraint = IsGreaterThanOrEqualToDayConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)()
], IsGreaterThanOrEqualToDayConstraint);
function IsGreaterThanOrEqualToDay(compare, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsGreaterThanOrEqualToDay',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [compare],
            validator: IsGreaterThanOrEqualToDayConstraint,
        });
    };
}
//# sourceMappingURL=request.greater-than-equal-to-day.validation.js.map