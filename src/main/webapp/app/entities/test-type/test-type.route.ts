import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TestTypeComponent } from './test-type.component';
import { TestTypeDetailComponent } from './test-type-detail.component';
import { TestTypePopupComponent } from './test-type-dialog.component';
import { TestTypeDeletePopupComponent } from './test-type-delete-dialog.component';

export const testTypeRoute: Routes = [
    {
        path: 'test-type',
        component: TestTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-type/:id',
        component: TestTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testTypePopupRoute: Routes = [
    {
        path: 'test-type-new',
        component: TestTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-type/:id/edit',
        component: TestTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-type/:id/delete',
        component: TestTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
