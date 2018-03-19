import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sample } from './sample.model';
import { SamplePopupService } from './sample-popup.service';
import { SampleService } from './sample.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-sample-dialog',
    templateUrl: './sample-dialog.component.html'
})
export class SampleDialogComponent implements OnInit {

    sample: Sample;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sampleService: SampleService,
        private salesOrderService: SalesOrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.salesOrderService.query()
            .subscribe((res: HttpResponse<SalesOrder[]>) => { this.salesorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sample.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sampleService.update(this.sample));
        } else {
            this.subscribeToSaveResponse(
                this.sampleService.create(this.sample));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Sample>>) {
        result.subscribe((res: HttpResponse<Sample>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Sample) {
        this.eventManager.broadcast({ name: 'sampleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSalesOrderById(index: number, item: SalesOrder) {
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
    selector: 'jhi-sample-popup',
    template: ''
})
export class SamplePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private samplePopupService: SamplePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.samplePopupService
                    .open(SampleDialogComponent as Component, params['id']);
            } else {
                this.samplePopupService
                    .open(SampleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
