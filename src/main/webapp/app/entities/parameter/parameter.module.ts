import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    ParameterService,
    ParameterPopupService,
    ParameterComponent,
    ParameterDetailComponent,
    ParameterDialogComponent,
    ParameterPopupComponent,
    ParameterDeletePopupComponent,
    ParameterDeleteDialogComponent,
    parameterRoute,
    parameterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...parameterRoute,
    ...parameterPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParameterComponent,
        ParameterDetailComponent,
        ParameterDialogComponent,
        ParameterDeleteDialogComponent,
        ParameterPopupComponent,
        ParameterDeletePopupComponent,
    ],
    entryComponents: [
        ParameterComponent,
        ParameterDialogComponent,
        ParameterPopupComponent,
        ParameterDeleteDialogComponent,
        ParameterDeletePopupComponent,
    ],
    providers: [
        ParameterService,
        ParameterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontParameterModule {}
