import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParameterOptionComponent } from './parameter-option.component';
import { ParameterOptionDetailComponent } from './parameter-option-detail.component';
import { ParameterOptionPopupComponent } from './parameter-option-dialog.component';
import { ParameterOptionDeletePopupComponent } from './parameter-option-delete-dialog.component';

export const parameterOptionRoute: Routes = [
    {
        path: 'parameter-option',
        component: ParameterOptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterOptions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parameter-option/:id',
        component: ParameterOptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterOptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parameterOptionPopupRoute: Routes = [
    {
        path: 'parameter-option-new',
        component: ParameterOptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterOptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parameter-option/:id/edit',
        component: ParameterOptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterOptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parameter-option/:id/delete',
        component: ParameterOptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParameterOptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
