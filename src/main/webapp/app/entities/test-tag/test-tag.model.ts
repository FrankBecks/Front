import { BaseEntity } from './../../shared';

export class TestTag implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public salesOrderTests?: BaseEntity[],
    ) {
        this.active = false;
    }
}
