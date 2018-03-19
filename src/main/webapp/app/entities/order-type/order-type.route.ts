import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderTypeComponent } from './order-type.component';
import { OrderTypeDetailComponent } from './order-type-detail.component';
import { OrderTypePopupComponent } from './order-type-dialog.component';
import { OrderTypeDeletePopupComponent } from './order-type-delete-dialog.component';

export const orderTypeRoute: Routes = [
    {
        path: 'order-type',
        component: OrderTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-type/:id',
        component: OrderTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderTypePopupRoute: Routes = [
    {
        path: 'order-type-new',
        component: OrderTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-type/:id/edit',
        component: OrderTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-type/:id/delete',
        component: OrderTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
