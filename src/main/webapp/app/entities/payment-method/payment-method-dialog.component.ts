import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentMethod } from './payment-method.model';
import { PaymentMethodPopupService } from './payment-method-popup.service';
import { PaymentMethodService } from './payment-method.service';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-payment-method-dialog',
    templateUrl: './payment-method-dialog.component.html'
})
export class PaymentMethodDialogComponent implements OnInit {

    paymentMethod: PaymentMethod;
    isSaving: boolean;

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paymentMethodService: PaymentMethodService,
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
        if (this.paymentMethod.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentMethodService.update(this.paymentMethod));
        } else {
            this.subscribeToSaveResponse(
                this.paymentMethodService.create(this.paymentMethod));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaymentMethod>>) {
        result.subscribe((res: HttpResponse<PaymentMethod>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentMethod) {
        this.eventManager.broadcast({ name: 'paymentMethodListModification', content: 'OK'});
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
    selector: 'jhi-payment-method-popup',
    template: ''
})
export class PaymentMethodPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentMethodPopupService: PaymentMethodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentMethodPopupService
                    .open(PaymentMethodDialogComponent as Component, params['id']);
            } else {
                this.paymentMethodPopupService
                    .open(PaymentMethodDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
