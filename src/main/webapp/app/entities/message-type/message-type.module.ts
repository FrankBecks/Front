import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    MessageTypeService,
    MessageTypePopupService,
    MessageTypeComponent,
    MessageTypeDetailComponent,
    MessageTypeDialogComponent,
    MessageTypePopupComponent,
    MessageTypeDeletePopupComponent,
    MessageTypeDeleteDialogComponent,
    messageTypeRoute,
    messageTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...messageTypeRoute,
    ...messageTypePopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MessageTypeComponent,
        MessageTypeDetailComponent,
        MessageTypeDialogComponent,
        MessageTypeDeleteDialogComponent,
        MessageTypePopupComponent,
        MessageTypeDeletePopupComponent,
    ],
    entryComponents: [
        MessageTypeComponent,
        MessageTypeDialogComponent,
        MessageTypePopupComponent,
        MessageTypeDeleteDialogComponent,
        MessageTypeDeletePopupComponent,
    ],
    providers: [
        MessageTypeService,
        MessageTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontMessageTypeModule {}
