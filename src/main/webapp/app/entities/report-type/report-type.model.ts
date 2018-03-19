import { BaseEntity } from './../../shared';

export class ReportType implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public salesOrder?: BaseEntity,
    ) {
        this.active = false;
    }
}
