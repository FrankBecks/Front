import { BaseEntity } from './../../shared';

export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public salesOrderTest?: BaseEntity,
    ) {
        this.active = false;
    }
}
