import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsValidPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean;
}
export declare function IsValidPhone(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
