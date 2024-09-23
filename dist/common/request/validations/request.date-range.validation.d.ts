import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class checkDateRangeConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function CheckDateRange(compareValue: number, compareKey?: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
