import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsGreaterConstraint implements ValidatorConstraintInterface {
    validate(value: number, args: ValidationArguments): boolean;
}
export declare function IsGreater(compare: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
