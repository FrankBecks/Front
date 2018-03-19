import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderDetailComponent } from './sales-order-detail.component';
import { SalesOrderPopupComponent } from './sales-order-dialog.component';
import { SalesOrderDeletePopupComponent } from './sales-order-delete-dialog.component';

export const salesOrderRoute: Routes = [
    {
        path: 'sales-order',
        component: SalesOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sales-order/:id',
        component: SalesOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salesOrderPopupRoute: Routes = [
    {
        path: 'sales-order-new',
        component: SalesOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sales-order/:id/edit',
        component: SalesOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sales-order/:id/delete',
        component: SalesOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
