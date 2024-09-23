export declare function Auth(options?: {
    permissions?: string[] | string;
    scope?: 'admin' | 'mini_app' | 'web';
    anonymous?: boolean;
    roles?: string[] | string;
}): MethodDecorator;
export declare function RefreshGuard(): MethodDecorator;
