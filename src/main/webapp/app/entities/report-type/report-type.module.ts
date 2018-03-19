import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    ReportTypeService,
    ReportTypePopupService,
    ReportTypeComponent,
    ReportTypeDetailComponent,
    ReportTypeDialogComponent,
    ReportTypePopupComponent,
    ReportTypeDeletePopupComponent,
    ReportTypeDeleteDialogComponent,
    reportTypeRoute,
    reportTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...reportTypeRoute,
    ...reportTypePopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReportTypeComponent,
        ReportTypeDetailComponent,
        ReportTypeDialogComponent,
        ReportTypeDeleteDialogComponent,
        ReportTypePopupComponent,
        ReportTypeDeletePopupComponent,
    ],
    entryComponents: [
        ReportTypeComponent,
        ReportTypeDialogComponent,
        ReportTypePopupComponent,
        ReportTypeDeleteDialogComponent,
        ReportTypeDeletePopupComponent,
    ],
    providers: [
        ReportTypeService,
        ReportTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontReportTypeModule {}
