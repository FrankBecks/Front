import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    TestTypeService,
    TestTypePopupService,
    TestTypeComponent,
    TestTypeDetailComponent,
    TestTypeDialogComponent,
    TestTypePopupComponent,
    TestTypeDeletePopupComponent,
    TestTypeDeleteDialogComponent,
    testTypeRoute,
    testTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...testTypeRoute,
    ...testTypePopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestTypeComponent,
        TestTypeDetailComponent,
        TestTypeDialogComponent,
        TestTypeDeleteDialogComponent,
        TestTypePopupComponent,
        TestTypeDeletePopupComponent,
    ],
    entryComponents: [
        TestTypeComponent,
        TestTypeDialogComponent,
        TestTypePopupComponent,
        TestTypeDeleteDialogComponent,
        TestTypeDeletePopupComponent,
    ],
    providers: [
        TestTypeService,
        TestTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontTestTypeModule {}
