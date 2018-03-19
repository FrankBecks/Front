import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SalesOrder } from './sales-order.model';
import { SalesOrderService } from './sales-order.service';

@Injectable()
export class SalesOrderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private salesOrderService: SalesOrderService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.salesOrderService.find(id)
                    .subscribe((salesOrderResponse: HttpResponse<SalesOrder>) => {
                        const salesOrder: SalesOrder = salesOrderResponse.body;
                        salesOrder.dateExpectedDelivery = this.datePipe
                            .transform(salesOrder.dateExpectedDelivery, 'yyyy-MM-ddTHH:mm:ss');
                        salesOrder.dateConfirmed = this.datePipe
                            .transform(salesOrder.dateConfirmed, 'yyyy-MM-ddTHH:mm:ss');
                        salesOrder.dateSamplesExpected = this.datePipe
                            .transform(salesOrder.dateSamplesExpected, 'yyyy-MM-ddTHH:mm:ss');
                        salesOrder.dateXmlExported = this.datePipe
                            .transform(salesOrder.dateXmlExported, 'yyyy-MM-ddTHH:mm:ss');
                        salesOrder.dateModified = this.datePipe
                            .transform(salesOrder.dateModified, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.salesOrderModalRef(component, salesOrder);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.salesOrderModalRef(component, new SalesOrder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    salesOrderModalRef(component: Component, salesOrder: SalesOrder): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.salesOrder = salesOrder;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
