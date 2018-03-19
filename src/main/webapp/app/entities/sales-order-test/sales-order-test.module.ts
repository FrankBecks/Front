import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    SalesOrderTestService,
    SalesOrderTestPopupService,
    SalesOrderTestComponent,
    SalesOrderTestDetailComponent,
    SalesOrderTestDialogComponent,
    SalesOrderTestPopupComponent,
    SalesOrderTestDeletePopupComponent,
    SalesOrderTestDeleteDialogComponent,
    salesOrderTestRoute,
    salesOrderTestPopupRoute,
} from './';

const ENTITY_STATES = [
    ...salesOrderTestRoute,
    ...salesOrderTestPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalesOrderTestComponent,
        SalesOrderTestDetailComponent,
        SalesOrderTestDialogComponent,
        SalesOrderTestDeleteDialogComponent,
        SalesOrderTestPopupComponent,
        SalesOrderTestDeletePopupComponent,
    ],
    entryComponents: [
        SalesOrderTestComponent,
        SalesOrderTestDialogComponent,
        SalesOrderTestPopupComponent,
        SalesOrderTestDeleteDialogComponent,
        SalesOrderTestDeletePopupComponent,
    ],
    providers: [
        SalesOrderTestService,
        SalesOrderTestPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontSalesOrderTestModule {}
