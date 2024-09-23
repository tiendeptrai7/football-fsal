export declare function ApiPaginatedResponse<TData>(options: {
    type: {
        new (): TData;
    };
}): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
