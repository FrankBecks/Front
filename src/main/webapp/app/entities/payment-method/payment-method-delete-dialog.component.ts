import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentMethod } from './payment-method.model';
import { PaymentMethodPopupService } from './payment-method-popup.service';
import { PaymentMethodService } from './payment-method.service';

@Component({
    selector: 'jhi-payment-method-delete-dialog',
    templateUrl: './payment-method-delete-dialog.component.html'
})
export class PaymentMethodDeleteDialogComponent {

    paymentMethod: PaymentMethod;

    constructor(
        private paymentMethodService: PaymentMethodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentMethodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentMethodListModification',
                content: 'Deleted an paymentMethod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-method-delete-popup',
    template: ''
})
export class PaymentMethodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentMethodPopupService: PaymentMethodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentMethodPopupService
                .open(PaymentMethodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
