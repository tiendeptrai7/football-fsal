import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsGreaterThanOrEqualToDayConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
}
export declare function IsGreaterThanOrEqualToDay(compare: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
