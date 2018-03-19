import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReportType } from './report-type.model';
import { ReportTypePopupService } from './report-type-popup.service';
import { ReportTypeService } from './report-type.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-report-type-dialog',
    templateUrl: './report-type-dialog.component.html'
})
export class ReportTypeDialogComponent implements OnInit {

    reportType: ReportType;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reportTypeService: ReportTypeService,
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
        if (this.reportType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reportTypeService.update(this.reportType));
        } else {
            this.subscribeToSaveResponse(
                this.reportTypeService.create(this.reportType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReportType>>) {
        result.subscribe((res: HttpResponse<ReportType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReportType) {
        this.eventManager.broadcast({ name: 'reportTypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-report-type-popup',
    template: ''
})
export class ReportTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportTypePopupService: ReportTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reportTypePopupService
                    .open(ReportTypeDialogComponent as Component, params['id']);
            } else {
                this.reportTypePopupService
                    .open(ReportTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
