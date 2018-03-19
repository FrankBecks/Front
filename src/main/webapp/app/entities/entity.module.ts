import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FrontSalesOrderModule } from './sales-order/sales-order.module';
import { FrontPaymentMethodModule } from './payment-method/payment-method.module';
import { FrontOrderTypeModule } from './order-type/order-type.module';
import { FrontOrderPriorityModule } from './order-priority/order-priority.module';
import { FrontOrderStatusModule } from './order-status/order-status.module';
import { FrontReportTypeModule } from './report-type/report-type.module';
import { FrontTestTypeModule } from './test-type/test-type.module';
import { FrontSampleModule } from './sample/sample.module';
import { FrontTestTagModule } from './test-tag/test-tag.module';
import { FrontSegmentModule } from './segment/segment.module';
import { FrontCategoryModule } from './category/category.module';
import { FrontParameterModule } from './parameter/parameter.module';
import { FrontParameterOptionModule } from './parameter-option/parameter-option.module';
import { FrontParameterTypeModule } from './parameter-type/parameter-type.module';
import { FrontMessageTypeModule } from './message-type/message-type.module';
import { FrontSalesOrderTestModule } from './sales-order-test/sales-order-test.module';
import { FrontMessageModule } from './message/message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FrontSalesOrderModule,
        FrontPaymentMethodModule,
        FrontOrderTypeModule,
        FrontOrderPriorityModule,
        FrontOrderStatusModule,
        FrontReportTypeModule,
        FrontTestTypeModule,
        FrontSampleModule,
        FrontTestTagModule,
        FrontSegmentModule,
        FrontCategoryModule,
        FrontParameterModule,
        FrontParameterOptionModule,
        FrontParameterTypeModule,
        FrontMessageTypeModule,
        FrontSalesOrderTestModule,
        FrontMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontEntityModule {}
