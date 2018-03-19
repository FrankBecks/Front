import { BaseEntity, User } from './../../shared';

export class Message implements BaseEntity {
    constructor(
        public id?: number,
        public body?: string,
        public date?: any,
        public salesOrder?: BaseEntity,
        public messageType?: BaseEntity,
        public user?: User,
    ) {
    }
}
