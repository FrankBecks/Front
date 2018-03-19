import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReportTypeComponent } from './report-type.component';
import { ReportTypeDetailComponent } from './report-type-detail.component';
import { ReportTypePopupComponent } from './report-type-dialog.component';
import { ReportTypeDeletePopupComponent } from './report-type-delete-dialog.component';

export const reportTypeRoute: Routes = [
    {
        path: 'report-type',
        component: ReportTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'report-type/:id',
        component: ReportTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportTypePopupRoute: Routes = [
    {
        path: 'report-type-new',
        component: ReportTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'report-type/:id/edit',
        component: ReportTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'report-type/:id/delete',
        component: ReportTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
