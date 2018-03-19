import { BaseEntity } from './../../shared';

export class MessageType implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public name?: string,
        public message?: BaseEntity,
    ) {
        this.active = false;
    }
}
