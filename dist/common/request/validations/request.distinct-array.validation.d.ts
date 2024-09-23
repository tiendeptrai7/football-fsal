import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsDistinctArrayConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
}
export declare function IsDistinctArray(property: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
