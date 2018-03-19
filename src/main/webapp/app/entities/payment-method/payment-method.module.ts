import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    PaymentMethodService,
    PaymentMethodPopupService,
    PaymentMethodComponent,
    PaymentMethodDetailComponent,
    PaymentMethodDialogComponent,
    PaymentMethodPopupComponent,
    PaymentMethodDeletePopupComponent,
    PaymentMethodDeleteDialogComponent,
    paymentMethodRoute,
    paymentMethodPopupRoute,
} from './';

const ENTITY_STATES = [
    ...paymentMethodRoute,
    ...paymentMethodPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentMethodComponent,
        PaymentMethodDetailComponent,
        PaymentMethodDialogComponent,
        PaymentMethodDeleteDialogComponent,
        PaymentMethodPopupComponent,
        PaymentMethodDeletePopupComponent,
    ],
    entryComponents: [
        PaymentMethodComponent,
        PaymentMethodDialogComponent,
        PaymentMethodPopupComponent,
        PaymentMethodDeleteDialogComponent,
        PaymentMethodDeletePopupComponent,
    ],
    providers: [
        PaymentMethodService,
        PaymentMethodPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontPaymentMethodModule {}
