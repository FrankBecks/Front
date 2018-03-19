import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderStatusComponent } from './order-status.component';
import { OrderStatusDetailComponent } from './order-status-detail.component';
import { OrderStatusPopupComponent } from './order-status-dialog.component';
import { OrderStatusDeletePopupComponent } from './order-status-delete-dialog.component';

export const orderStatusRoute: Routes = [
    {
        path: 'order-status',
        component: OrderStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-status/:id',
        component: OrderStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderStatusPopupRoute: Routes = [
    {
        path: 'order-status-new',
        component: OrderStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-status/:id/edit',
        component: OrderStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-status/:id/delete',
        component: OrderStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
