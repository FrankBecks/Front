import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    SegmentService,
    SegmentPopupService,
    SegmentComponent,
    SegmentDetailComponent,
    SegmentDialogComponent,
    SegmentPopupComponent,
    SegmentDeletePopupComponent,
    SegmentDeleteDialogComponent,
    segmentRoute,
    segmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...segmentRoute,
    ...segmentPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SegmentComponent,
        SegmentDetailComponent,
        SegmentDialogComponent,
        SegmentDeleteDialogComponent,
        SegmentPopupComponent,
        SegmentDeletePopupComponent,
    ],
    entryComponents: [
        SegmentComponent,
        SegmentDialogComponent,
        SegmentPopupComponent,
        SegmentDeleteDialogComponent,
        SegmentDeletePopupComponent,
    ],
    providers: [
        SegmentService,
        SegmentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontSegmentModule {}
