import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    TestTagService,
    TestTagPopupService,
    TestTagComponent,
    TestTagDetailComponent,
    TestTagDialogComponent,
    TestTagPopupComponent,
    TestTagDeletePopupComponent,
    TestTagDeleteDialogComponent,
    testTagRoute,
    testTagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testTagRoute,
    ...testTagPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestTagComponent,
        TestTagDetailComponent,
        TestTagDialogComponent,
        TestTagDeleteDialogComponent,
        TestTagPopupComponent,
        TestTagDeletePopupComponent,
    ],
    entryComponents: [
        TestTagComponent,
        TestTagDialogComponent,
        TestTagPopupComponent,
        TestTagDeleteDialogComponent,
        TestTagDeletePopupComponent,
    ],
    providers: [
        TestTagService,
        TestTagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontTestTagModule {}
