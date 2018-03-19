import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TestTagComponent } from './test-tag.component';
import { TestTagDetailComponent } from './test-tag-detail.component';
import { TestTagPopupComponent } from './test-tag-dialog.component';
import { TestTagDeletePopupComponent } from './test-tag-delete-dialog.component';

export const testTagRoute: Routes = [
    {
        path: 'test-tag',
        component: TestTagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTags'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-tag/:id',
        component: TestTagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTags'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testTagPopupRoute: Routes = [
    {
        path: 'test-tag-new',
        component: TestTagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-tag/:id/edit',
        component: TestTagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-tag/:id/delete',
        component: TestTagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
