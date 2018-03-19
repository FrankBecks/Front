import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderStatus } from './order-status.model';
import { OrderStatusPopupService } from './order-status-popup.service';
import { OrderStatusService } from './order-status.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-order-status-dialog',
    templateUrl: './order-status-dialog.component.html'
})
export class OrderStatusDialogComponent implements OnInit {

    orderStatus: OrderStatus;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderStatusService: OrderStatusService,
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
        if (this.orderStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderStatusService.update(this.orderStatus));
        } else {
            this.subscribeToSaveResponse(
                this.orderStatusService.create(this.orderStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderStatus>>) {
        result.subscribe((res: HttpResponse<OrderStatus>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderStatus) {
        this.eventManager.broadcast({ name: 'orderStatusListModification', content: 'OK'});
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
    selector: 'jhi-order-status-popup',
    template: ''
})
export class OrderStatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderStatusPopupService: OrderStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderStatusPopupService
                    .open(OrderStatusDialogComponent as Component, params['id']);
            } else {
                this.orderStatusPopupService
                    .open(OrderStatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
