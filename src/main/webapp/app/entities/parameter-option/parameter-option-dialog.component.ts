import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParameterOption } from './parameter-option.model';
import { ParameterOptionPopupService } from './parameter-option-popup.service';
import { ParameterOptionService } from './parameter-option.service';
import { Parameter, ParameterService } from '../parameter';

@Component({
    selector: 'jhi-parameter-option-dialog',
    templateUrl: './parameter-option-dialog.component.html'
})
export class ParameterOptionDialogComponent implements OnInit {

    parameterOption: ParameterOption;
    isSaving: boolean;

    parameters: Parameter[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parameterOptionService: ParameterOptionService,
        private parameterService: ParameterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.parameterService.query()
            .subscribe((res: HttpResponse<Parameter[]>) => { this.parameters = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parameterOption.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parameterOptionService.update(this.parameterOption));
        } else {
            this.subscribeToSaveResponse(
                this.parameterOptionService.create(this.parameterOption));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ParameterOption>>) {
        result.subscribe((res: HttpResponse<ParameterOption>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ParameterOption) {
        this.eventManager.broadcast({ name: 'parameterOptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackParameterById(index: number, item: Parameter) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-parameter-option-popup',
    template: ''
})
export class ParameterOptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parameterOptionPopupService: ParameterOptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.parameterOptionPopupService
                    .open(ParameterOptionDialogComponent as Component, params['id']);
            } else {
                this.parameterOptionPopupService
                    .open(ParameterOptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
