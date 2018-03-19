import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaymentMethodComponent } from './payment-method.component';
import { PaymentMethodDetailComponent } from './payment-method-detail.component';
import { PaymentMethodPopupComponent } from './payment-method-dialog.component';
import { PaymentMethodDeletePopupComponent } from './payment-method-delete-dialog.component';

export const paymentMethodRoute: Routes = [
    {
        path: 'payment-method',
        component: PaymentMethodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentMethods'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-method/:id',
        component: PaymentMethodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentMethods'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentMethodPopupRoute: Routes = [
    {
        path: 'payment-method-new',
        component: PaymentMethodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentMethods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-method/:id/edit',
        component: PaymentMethodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentMethods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-method/:id/delete',
        component: PaymentMethodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentMethods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
