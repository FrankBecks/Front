import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderPriority } from './order-priority.model';
import { OrderPriorityPopupService } from './order-priority-popup.service';
import { OrderPriorityService } from './order-priority.service';

@Component({
    selector: 'jhi-order-priority-delete-dialog',
    templateUrl: './order-priority-delete-dialog.component.html'
})
export class OrderPriorityDeleteDialogComponent {

    orderPriority: OrderPriority;

    constructor(
        private orderPriorityService: OrderPriorityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderPriorityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderPriorityListModification',
                content: 'Deleted an orderPriority'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-priority-delete-popup',
    template: ''
})
export class OrderPriorityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPriorityPopupService: OrderPriorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderPriorityPopupService
                .open(OrderPriorityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
