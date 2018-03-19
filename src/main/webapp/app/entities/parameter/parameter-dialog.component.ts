import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Parameter } from './parameter.model';
import { ParameterPopupService } from './parameter-popup.service';
import { ParameterService } from './parameter.service';
import { ParameterType, ParameterTypeService } from '../parameter-type';
import { ParameterOption, ParameterOptionService } from '../parameter-option';
import { SalesOrderTest, SalesOrderTestService } from '../sales-order-test';

@Component({
    selector: 'jhi-parameter-dialog',
    templateUrl: './parameter-dialog.component.html'
})
export class ParameterDialogComponent implements OnInit {

    parameter: Parameter;
    isSaving: boolean;

    parametertypes: ParameterType[];

    parameteroptions: ParameterOption[];

    salesordertests: SalesOrderTest[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parameterService: ParameterService,
        private parameterTypeService: ParameterTypeService,
        private parameterOptionService: ParameterOptionService,
        private salesOrderTestService: SalesOrderTestService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.parameterTypeService
            .query({filter: 'parameter(name)-is-null'})
            .subscribe((res: HttpResponse<ParameterType[]>) => {
                if (!this.parameter.parameterType || !this.parameter.parameterType.id) {
                    this.parametertypes = res.body;
                } else {
                    this.parameterTypeService
                        .find(this.parameter.parameterType.id)
                        .subscribe((subRes: HttpResponse<ParameterType>) => {
                            this.parametertypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.parameterOptionService.query()
            .subscribe((res: HttpResponse<ParameterOption[]>) => { this.parameteroptions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.salesOrderTestService.query()
            .subscribe((res: HttpResponse<SalesOrderTest[]>) => { this.salesordertests = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parameter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parameterService.update(this.parameter));
        } else {
            this.subscribeToSaveResponse(
                this.parameterService.create(this.parameter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Parameter>>) {
        result.subscribe((res: HttpResponse<Parameter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Parameter) {
        this.eventManager.broadcast({ name: 'parameterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackParameterTypeById(index: number, item: ParameterType) {
        return item.id;
    }

    trackParameterOptionById(index: number, item: ParameterOption) {
        return item.id;
    }

    trackSalesOrderTestById(index: number, item: SalesOrderTest) {
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
    selector: 'jhi-parameter-popup',
    template: ''
})
export class ParameterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parameterPopupService: ParameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.parameterPopupService
                    .open(ParameterDialogComponent as Component, params['id']);
            } else {
                this.parameterPopupService
                    .open(ParameterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
