import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Segment } from './segment.model';
import { SegmentPopupService } from './segment-popup.service';
import { SegmentService } from './segment.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-segment-dialog',
    templateUrl: './segment-dialog.component.html'
})
export class SegmentDialogComponent implements OnInit {

    segment: Segment;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private segmentService: SegmentService,
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
        if (this.segment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.segmentService.update(this.segment));
        } else {
            this.subscribeToSaveResponse(
                this.segmentService.create(this.segment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Segment>>) {
        result.subscribe((res: HttpResponse<Segment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Segment) {
        this.eventManager.broadcast({ name: 'segmentListModification', content: 'OK'});
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
    selector: 'jhi-segment-popup',
    template: ''
})
export class SegmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private segmentPopupService: SegmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.segmentPopupService
                    .open(SegmentDialogComponent as Component, params['id']);
            } else {
                this.segmentPopupService
                    .open(SegmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
