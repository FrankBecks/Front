import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderType } from './order-type.model';
import { OrderTypePopupService } from './order-type-popup.service';
import { OrderTypeService } from './order-type.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-order-type-dialog',
    templateUrl: './order-type-dialog.component.html'
})
export class OrderTypeDialogComponent implements OnInit {

    orderType: OrderType;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderTypeService: OrderTypeService,
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
        if (this.orderType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderTypeService.update(this.orderType));
        } else {
            this.subscribeToSaveResponse(
                this.orderTypeService.create(this.orderType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderType>>) {
        result.subscribe((res: HttpResponse<OrderType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderType) {
        this.eventManager.broadcast({ name: 'orderTypeListModification', content: 'OK'});
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
    selector: 'jhi-order-type-popup',
    template: ''
})
export class OrderTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderTypePopupService: OrderTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderTypePopupService
                    .open(OrderTypeDialogComponent as Component, params['id']);
            } else {
                this.orderTypePopupService
                    .open(OrderTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
