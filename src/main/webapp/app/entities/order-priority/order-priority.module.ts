import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    OrderPriorityService,
    OrderPriorityPopupService,
    OrderPriorityComponent,
    OrderPriorityDetailComponent,
    OrderPriorityDialogComponent,
    OrderPriorityPopupComponent,
    OrderPriorityDeletePopupComponent,
    OrderPriorityDeleteDialogComponent,
    orderPriorityRoute,
    orderPriorityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderPriorityRoute,
    ...orderPriorityPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderPriorityComponent,
        OrderPriorityDetailComponent,
        OrderPriorityDialogComponent,
        OrderPriorityDeleteDialogComponent,
        OrderPriorityPopupComponent,
        OrderPriorityDeletePopupComponent,
    ],
    entryComponents: [
        OrderPriorityComponent,
        OrderPriorityDialogComponent,
        OrderPriorityPopupComponent,
        OrderPriorityDeleteDialogComponent,
        OrderPriorityDeletePopupComponent,
    ],
    providers: [
        OrderPriorityService,
        OrderPriorityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontOrderPriorityModule {}
