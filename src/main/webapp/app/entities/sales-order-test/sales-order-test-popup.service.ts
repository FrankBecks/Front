import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SalesOrderTest } from './sales-order-test.model';
import { SalesOrderTestService } from './sales-order-test.service';

@Injectable()
export class SalesOrderTestPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private salesOrderTestService: SalesOrderTestService

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
                this.salesOrderTestService.find(id)
                    .subscribe((salesOrderTestResponse: HttpResponse<SalesOrderTest>) => {
                        const salesOrderTest: SalesOrderTest = salesOrderTestResponse.body;
                        salesOrderTest.dateModified = this.datePipe
                            .transform(salesOrderTest.dateModified, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.salesOrderTestModalRef(component, salesOrderTest);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.salesOrderTestModalRef(component, new SalesOrderTest());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    salesOrderTestModalRef(component: Component, salesOrderTest: SalesOrderTest): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.salesOrderTest = salesOrderTest;
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
