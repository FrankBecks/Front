import { BaseEntity } from './../../shared';

export class Parameter implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public info?: string,
        public minValue?: number,
        public maxValue?: number,
        public parameterType?: BaseEntity,
        public parameterOptions?: BaseEntity[],
        public salesOrderTests?: BaseEntity[],
    ) {
        this.active = false;
    }
}
