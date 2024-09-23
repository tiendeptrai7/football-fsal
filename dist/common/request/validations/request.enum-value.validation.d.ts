import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsEnumValueConstraint implements ValidatorConstraintInterface {
    validate(value: string | number, args: ValidationArguments): boolean;
}
export declare function IsEnumValue(property: any, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
