import { QueryPaginate, QueryPeriod } from '@common/database/types/database.type';
import { SelectQueryBuilder } from 'typeorm';
export declare function applyQueryPaging<T>(param: QueryPaginate, query: SelectQueryBuilder<T>, isRaw?: boolean): void;
export declare function extractSorting(value: string): {
    key: string;
    dir: 'ASC' | 'DESC';
};
export declare function applyQuerySorting<T>(value: string, query: SelectQueryBuilder<T>, alias?: string, isAddOrder?: boolean): void;
export declare function applyQueryMonthRange<T>(params: {
    date_from: Date;
    date_to?: Date;
}, query: SelectQueryBuilder<T>, config: {
    alias?: string;
    column: string;
}): void;
export declare function applyQueryPeriod<T>(params: QueryPeriod, query: SelectQueryBuilder<T>, config: {
    alias?: string;
    column: string;
}): void;
export declare function applyQueryDayRange<T>(date: Date, query: SelectQueryBuilder<T>, config: {
    alias?: string;
    column: string;
}): void;
