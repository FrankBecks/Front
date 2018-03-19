import { BaseEntity } from './../../shared';

export class ParameterType implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public parameter?: BaseEntity,
    ) {
        this.active = false;
    }
}
