import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalesOrderTest } from './sales-order-test.model';
import { SalesOrderTestPopupService } from './sales-order-test-popup.service';
import { SalesOrderTestService } from './sales-order-test.service';

@Component({
    selector: 'jhi-sales-order-test-delete-dialog',
    templateUrl: './sales-order-test-delete-dialog.component.html'
})
export class SalesOrderTestDeleteDialogComponent {

    salesOrderTest: SalesOrderTest;

    constructor(
        private salesOrderTestService: SalesOrderTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salesOrderTestService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salesOrderTestListModification',
                content: 'Deleted an salesOrderTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sales-order-test-delete-popup',
    template: ''
})
export class SalesOrderTestDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salesOrderTestPopupService: SalesOrderTestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.salesOrderTestPopupService
                .open(SalesOrderTestDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
