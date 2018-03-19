import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderPriority } from './order-priority.model';
import { OrderPriorityPopupService } from './order-priority-popup.service';
import { OrderPriorityService } from './order-priority.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-order-priority-dialog',
    templateUrl: './order-priority-dialog.component.html'
})
export class OrderPriorityDialogComponent implements OnInit {

    orderPriority: OrderPriority;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderPriorityService: OrderPriorityService,
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
        if (this.orderPriority.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderPriorityService.update(this.orderPriority));
        } else {
            this.subscribeToSaveResponse(
                this.orderPriorityService.create(this.orderPriority));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderPriority>>) {
        result.subscribe((res: HttpResponse<OrderPriority>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderPriority) {
        this.eventManager.broadcast({ name: 'orderPriorityListModification', content: 'OK'});
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
    selector: 'jhi-order-priority-popup',
    template: ''
})
export class OrderPriorityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPriorityPopupService: OrderPriorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderPriorityPopupService
                    .open(OrderPriorityDialogComponent as Component, params['id']);
            } else {
                this.orderPriorityPopupService
                    .open(OrderPriorityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
