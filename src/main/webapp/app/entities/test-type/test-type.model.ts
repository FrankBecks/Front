import { BaseEntity } from './../../shared';

export class TestType implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public salesOrder?: BaseEntity,
    ) {
        this.active = false;
    }
}
