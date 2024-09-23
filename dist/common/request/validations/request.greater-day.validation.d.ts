import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsGreaterDayConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
}
export declare function IsGreaterDay(compare: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
