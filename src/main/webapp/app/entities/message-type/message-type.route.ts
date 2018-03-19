import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MessageTypeComponent } from './message-type.component';
import { MessageTypeDetailComponent } from './message-type-detail.component';
import { MessageTypePopupComponent } from './message-type-dialog.component';
import { MessageTypeDeletePopupComponent } from './message-type-delete-dialog.component';

export const messageTypeRoute: Routes = [
    {
        path: 'message-type',
        component: MessageTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'message-type/:id',
        component: MessageTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messageTypePopupRoute: Routes = [
    {
        path: 'message-type-new',
        component: MessageTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-type/:id/edit',
        component: MessageTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-type/:id/delete',
        component: MessageTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
