import { BaseEntity } from './../../shared';

export class Sample implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public batch?: string,
        public dateSampling?: any,
        public samplingLocation?: string,
        public info?: string,
        public salesOrders?: BaseEntity[],
    ) {
    }
}
