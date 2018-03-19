import { BaseEntity } from './../../shared';

export class SalesOrderTest implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public code?: string,
        public info?: string,
        public dateModified?: any,
        public category?: BaseEntity,
        public testType?: BaseEntity,
        public testTags?: BaseEntity[],
        public parameters?: BaseEntity[],
        public salesOrders?: BaseEntity[],
    ) {
        this.active = false;
    }
}
