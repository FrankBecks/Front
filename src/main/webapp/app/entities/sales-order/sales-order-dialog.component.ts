import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalesOrder } from './sales-order.model';
import { SalesOrderPopupService } from './sales-order-popup.service';
import { SalesOrderService } from './sales-order.service';
import { User, UserService } from '../../shared';
import { ReportType, ReportTypeService } from '../report-type';
import { OrderType, OrderTypeService } from '../order-type';
import { Segment, SegmentService } from '../segment';
import { PaymentMethod, PaymentMethodService } from '../payment-method';
import { OrderPriority, OrderPriorityService } from '../order-priority';
import { OrderStatus, OrderStatusService } from '../order-status';
import { SalesOrderTest, SalesOrderTestService } from '../sales-order-test';
import { Sample, SampleService } from '../sample';
import { Message, MessageService } from '../message';

@Component({
    selector: 'jhi-sales-order-dialog',
    templateUrl: './sales-order-dialog.component.html'
})
export class SalesOrderDialogComponent implements OnInit {

    salesOrder: SalesOrder;
    isSaving: boolean;

    users: User[];

    reporttypes: ReportType[];

    salesordertypes: OrderType[];

    segments: Segment[];

    paymentmethods: PaymentMethod[];

    orderpriorities: OrderPriority[];

    orderstatuses: OrderStatus[];

    salesordertests: SalesOrderTest[];

    samples: Sample[];

    messages: Message[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private salesOrderService: SalesOrderService,
        private userService: UserService,
        private reportTypeService: ReportTypeService,
        private orderTypeService: OrderTypeService,
        private segmentService: SegmentService,
        private paymentMethodService: PaymentMethodService,
        private orderPriorityService: OrderPriorityService,
        private orderStatusService: OrderStatusService,
        private salesOrderTestService: SalesOrderTestService,
        private sampleService: SampleService,
        private messageService: MessageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.reportTypeService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<ReportType[]>) => {
                if (!this.salesOrder.reportType || !this.salesOrder.reportType.id) {
                    this.reporttypes = res.body;
                } else {
                    this.reportTypeService
                        .find(this.salesOrder.reportType.id)
                        .subscribe((subRes: HttpResponse<ReportType>) => {
                            this.reporttypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.orderTypeService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<OrderType[]>) => {
                if (!this.salesOrder.salesOrderType || !this.salesOrder.salesOrderType.id) {
                    this.salesordertypes = res.body;
                } else {
                    this.orderTypeService
                        .find(this.salesOrder.salesOrderType.id)
                        .subscribe((subRes: HttpResponse<OrderType>) => {
                            this.salesordertypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.segmentService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<Segment[]>) => {
                if (!this.salesOrder.segment || !this.salesOrder.segment.id) {
                    this.segments = res.body;
                } else {
                    this.segmentService
                        .find(this.salesOrder.segment.id)
                        .subscribe((subRes: HttpResponse<Segment>) => {
                            this.segments = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.paymentMethodService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<PaymentMethod[]>) => {
                if (!this.salesOrder.paymentMethod || !this.salesOrder.paymentMethod.id) {
                    this.paymentmethods = res.body;
                } else {
                    this.paymentMethodService
                        .find(this.salesOrder.paymentMethod.id)
                        .subscribe((subRes: HttpResponse<PaymentMethod>) => {
                            this.paymentmethods = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.orderPriorityService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<OrderPriority[]>) => {
                if (!this.salesOrder.orderPriority || !this.salesOrder.orderPriority.id) {
                    this.orderpriorities = res.body;
                } else {
                    this.orderPriorityService
                        .find(this.salesOrder.orderPriority.id)
                        .subscribe((subRes: HttpResponse<OrderPriority>) => {
                            this.orderpriorities = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.orderStatusService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<OrderStatus[]>) => {
                if (!this.salesOrder.orderStatus || !this.salesOrder.orderStatus.id) {
                    this.orderstatuses = res.body;
                } else {
                    this.orderStatusService
                        .find(this.salesOrder.orderStatus.id)
                        .subscribe((subRes: HttpResponse<OrderStatus>) => {
                            this.orderstatuses = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.salesOrderTestService.query()
            .subscribe((res: HttpResponse<SalesOrderTest[]>) => { this.salesordertests = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.sampleService.query()
            .subscribe((res: HttpResponse<Sample[]>) => { this.samples = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.messageService.query()
            .subscribe((res: HttpResponse<Message[]>) => { this.messages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.salesOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salesOrderService.update(this.salesOrder));
        } else {
            this.subscribeToSaveResponse(
                this.salesOrderService.create(this.salesOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SalesOrder>>) {
        result.subscribe((res: HttpResponse<SalesOrder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SalesOrder) {
        this.eventManager.broadcast({ name: 'salesOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackReportTypeById(index: number, item: ReportType) {
        return item.id;
    }

    trackOrderTypeById(index: number, item: OrderType) {
        return item.id;
    }

    trackSegmentById(index: number, item: Segment) {
        return item.id;
    }

    trackPaymentMethodById(index: number, item: PaymentMethod) {
        return item.id;
    }

    trackOrderPriorityById(index: number, item: OrderPriority) {
        return item.id;
    }

    trackOrderStatusById(index: number, item: OrderStatus) {
        return item.id;
    }

    trackSalesOrderTestById(index: number, item: SalesOrderTest) {
        return item.id;
    }

    trackSampleById(index: number, item: Sample) {
        return item.id;
    }

    trackMessageById(index: number, item: Message) {
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
    selector: 'jhi-sales-order-popup',
    template: ''
})
export class SalesOrderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salesOrderPopupService: SalesOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.salesOrderPopupService
                    .open(SalesOrderDialogComponent as Component, params['id']);
            } else {
                this.salesOrderPopupService
                    .open(SalesOrderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
