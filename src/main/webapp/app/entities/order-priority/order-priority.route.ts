import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderPriorityComponent } from './order-priority.component';
import { OrderPriorityDetailComponent } from './order-priority-detail.component';
import { OrderPriorityPopupComponent } from './order-priority-dialog.component';
import { OrderPriorityDeletePopupComponent } from './order-priority-delete-dialog.component';

export const orderPriorityRoute: Routes = [
    {
        path: 'order-priority',
        component: OrderPriorityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderPriorities'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-priority/:id',
        component: OrderPriorityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderPriorities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderPriorityPopupRoute: Routes = [
    {
        path: 'order-priority-new',
        component: OrderPriorityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderPriorities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-priority/:id/edit',
        component: OrderPriorityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderPriorities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-priority/:id/delete',
        component: OrderPriorityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderPriorities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
