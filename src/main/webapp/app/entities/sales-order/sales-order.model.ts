import { BaseEntity, User } from './../../shared';

export class SalesOrder implements BaseEntity {
    constructor(
        public id?: number,
        public dateExpectedDelivery?: any,
        public dateConfirmed?: any,
        public dateSamplesExpected?: any,
        public dateXmlExported?: any,
        public dateModified?: any,
        public ref?: string,
        public comment?: string,
        public reportFile?: string,
        public customer?: User,
        public salesman?: User,
        public reportType?: BaseEntity,
        public salesOrderType?: BaseEntity,
        public segment?: BaseEntity,
        public paymentMethod?: BaseEntity,
        public orderPriority?: BaseEntity,
        public orderStatus?: BaseEntity,
        public salesOrderTests?: BaseEntity[],
        public samples?: BaseEntity[],
        public message?: BaseEntity,
    ) {
    }
}
