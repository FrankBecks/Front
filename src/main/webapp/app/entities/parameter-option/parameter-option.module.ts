import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    ParameterOptionService,
    ParameterOptionPopupService,
    ParameterOptionComponent,
    ParameterOptionDetailComponent,
    ParameterOptionDialogComponent,
    ParameterOptionPopupComponent,
    ParameterOptionDeletePopupComponent,
    ParameterOptionDeleteDialogComponent,
    parameterOptionRoute,
    parameterOptionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...parameterOptionRoute,
    ...parameterOptionPopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParameterOptionComponent,
        ParameterOptionDetailComponent,
        ParameterOptionDialogComponent,
        ParameterOptionDeleteDialogComponent,
        ParameterOptionPopupComponent,
        ParameterOptionDeletePopupComponent,
    ],
    entryComponents: [
        ParameterOptionComponent,
        ParameterOptionDialogComponent,
        ParameterOptionPopupComponent,
        ParameterOptionDeleteDialogComponent,
        ParameterOptionDeletePopupComponent,
    ],
    providers: [
        ParameterOptionService,
        ParameterOptionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontParameterOptionModule {}
