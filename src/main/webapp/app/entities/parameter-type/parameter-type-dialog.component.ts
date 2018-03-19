import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParameterType } from './parameter-type.model';
import { ParameterTypePopupService } from './parameter-type-popup.service';
import { ParameterTypeService } from './parameter-type.service';
import { Parameter, ParameterService } from '../parameter';

@Component({
    selector: 'jhi-parameter-type-dialog',
    templateUrl: './parameter-type-dialog.component.html'
})
export class ParameterTypeDialogComponent implements OnInit {

    parameterType: ParameterType;
    isSaving: boolean;

    parameters: Parameter[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parameterTypeService: ParameterTypeService,
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
        if (this.parameterType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parameterTypeService.update(this.parameterType));
        } else {
            this.subscribeToSaveResponse(
                this.parameterTypeService.create(this.parameterType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ParameterType>>) {
        result.subscribe((res: HttpResponse<ParameterType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ParameterType) {
        this.eventManager.broadcast({ name: 'parameterTypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-parameter-type-popup',
    template: ''
})
export class ParameterTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parameterTypePopupService: ParameterTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.parameterTypePopupService
                    .open(ParameterTypeDialogComponent as Component, params['id']);
            } else {
                this.parameterTypePopupService
                    .open(ParameterTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
