import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderType } from './order-type.model';
import { OrderTypePopupService } from './order-type-popup.service';
import { OrderTypeService } from './order-type.service';

@Component({
    selector: 'jhi-order-type-delete-dialog',
    templateUrl: './order-type-delete-dialog.component.html'
})
export class OrderTypeDeleteDialogComponent {

    orderType: OrderType;

    constructor(
        private orderTypeService: OrderTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderTypeListModification',
                content: 'Deleted an orderType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-type-delete-popup',
    template: ''
})
export class OrderTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderTypePopupService: OrderTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderTypePopupService
                .open(OrderTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
