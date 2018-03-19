import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParameterTypeComponent } from './parameter-type.component';
import { ParameterTypeDetailComponent } from './parameter-type-detail.component';
import { ParameterTypePopupComponent } from './parameter-type-dialog.component';
import { ParameterTypeDeletePopupComponent } from './parameter-type-delete-dialog.component';

export const parameterTypeRoute: Routes = [
    {
        path: 'parameter-type',
        component: ParameterTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parameter-type/:id',
        component: ParameterTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parameterTypePopupRoute: Routes = [
    {
        path: 'parameter-type-new',
        component: ParameterTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parameter-type/:id/edit',
        component: ParameterTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parameter-type/:id/delete',
        component: ParameterTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
