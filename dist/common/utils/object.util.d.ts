import { ListPaginate, QueryPaginate } from '@common/database/types/database.type';
export declare function wrapPagination<T>(data: T[], totalCount: number, paginationCfg: QueryPaginate): ListPaginate<T>;
export declare function parseJson(input: any): any;
export declare const isEmpty: (value: unknown) => boolean;
export declare function objOmit(obj: any, keysToOmit: string[]): {};
export declare function deepObjOmit(obj: any, keysToOmit: string[], condition?: (key: string, value: any) => boolean): {};
export declare function chunk(arr: any[], chunkSize?: number, cache?: any[]): any[];
export declare const padStart: (str: string, length: number, padChar?: string) => string;
export declare function orderBy(collection: any, iterates: any, orders: any): any[];
