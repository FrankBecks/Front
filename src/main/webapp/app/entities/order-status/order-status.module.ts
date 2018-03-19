import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    OrderStatusService,
    OrderStatusPopupService,
    OrderStatusComponent,
    OrderStatusDetailComponent,
    OrderStatusDialogComponent,
    OrderStatusPopupComponent,
    OrderStatusDeletePopupComponent,
    OrderStatusDeleteDialogComponent,
    orderStatusRoute,
    orderStatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderStatusRoute,
    ...orderStatusPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderStatusComponent,
        OrderStatusDetailComponent,
        OrderStatusDialogComponent,
        OrderStatusDeleteDialogComponent,
        OrderStatusPopupComponent,
        OrderStatusDeletePopupComponent,
    ],
    entryComponents: [
        OrderStatusComponent,
        OrderStatusDialogComponent,
        OrderStatusPopupComponent,
        OrderStatusDeleteDialogComponent,
        OrderStatusDeletePopupComponent,
    ],
    providers: [
        OrderStatusService,
        OrderStatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontOrderStatusModule {}
