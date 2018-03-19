import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from '../../shared';
import {
    ParameterTypeService,
    ParameterTypePopupService,
    ParameterTypeComponent,
    ParameterTypeDetailComponent,
    ParameterTypeDialogComponent,
    ParameterTypePopupComponent,
    ParameterTypeDeletePopupComponent,
    ParameterTypeDeleteDialogComponent,
    parameterTypeRoute,
    parameterTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...parameterTypeRoute,
    ...parameterTypePopupRoute,
];

@NgModule({
    imports: [
        FrontSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParameterTypeComponent,
        ParameterTypeDetailComponent,
        ParameterTypeDialogComponent,
        ParameterTypeDeleteDialogComponent,
        ParameterTypePopupComponent,
        ParameterTypeDeletePopupComponent,
    ],
    entryComponents: [
        ParameterTypeComponent,
        ParameterTypeDialogComponent,
        ParameterTypePopupComponent,
        ParameterTypeDeleteDialogComponent,
        ParameterTypeDeletePopupComponent,
    ],
    providers: [
        ParameterTypeService,
        ParameterTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontParameterTypeModule {}
