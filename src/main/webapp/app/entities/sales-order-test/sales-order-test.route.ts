import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalesOrderTestComponent } from './sales-order-test.component';
import { SalesOrderTestDetailComponent } from './sales-order-test-detail.component';
import { SalesOrderTestPopupComponent } from './sales-order-test-dialog.component';
import { SalesOrderTestDeletePopupComponent } from './sales-order-test-delete-dialog.component';

export const salesOrderTestRoute: Routes = [
    {
        path: 'sales-order-test',
        component: SalesOrderTestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderTests'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sales-order-test/:id',
        component: SalesOrderTestDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderTests'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salesOrderTestPopupRoute: Routes = [
    {
        path: 'sales-order-test-new',
        component: SalesOrderTestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderTests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sales-order-test/:id/edit',
        component: SalesOrderTestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderTests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sales-order-test/:id/delete',
        component: SalesOrderTestDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SalesOrderTests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
