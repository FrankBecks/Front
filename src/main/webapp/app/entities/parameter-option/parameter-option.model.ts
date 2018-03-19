import { BaseEntity } from './../../shared';

export class ParameterOption implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public info?: string,
        public parameters?: BaseEntity[],
    ) {
        this.active = false;
    }
}
