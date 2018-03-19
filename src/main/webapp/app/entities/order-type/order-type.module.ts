import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    OrderTypeService,
    OrderTypePopupService,
    OrderTypeComponent,
    OrderTypeDetailComponent,
    OrderTypeDialogComponent,
    OrderTypePopupComponent,
    OrderTypeDeletePopupComponent,
    OrderTypeDeleteDialogComponent,
    orderTypeRoute,
    orderTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderTypeRoute,
    ...orderTypePopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderTypeComponent,
        OrderTypeDetailComponent,
        OrderTypeDialogComponent,
        OrderTypeDeleteDialogComponent,
        OrderTypePopupComponent,
        OrderTypeDeletePopupComponent,
    ],
    entryComponents: [
        OrderTypeComponent,
        OrderTypeDialogComponent,
        OrderTypePopupComponent,
        OrderTypeDeleteDialogComponent,
        OrderTypeDeletePopupComponent,
    ],
    providers: [
        OrderTypeService,
        OrderTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontOrderTypeModule {}
