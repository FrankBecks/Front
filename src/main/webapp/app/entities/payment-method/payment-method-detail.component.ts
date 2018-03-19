import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentMethod } from './payment-method.model';
import { PaymentMethodService } from './payment-method.service';

@Component({
    selector: 'jhi-payment-method-detail',
    templateUrl: './payment-method-detail.component.html'
})
export class PaymentMethodDetailComponent implements OnInit, OnDestroy {

    paymentMethod: PaymentMethod;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paymentMethodService: PaymentMethodService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPaymentMethods();
    }

    load(id) {
        this.paymentMethodService.find(id)
            .subscribe((paymentMethodResponse: HttpResponse<PaymentMethod>) => {
                this.paymentMethod = paymentMethodResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPaymentMethods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paymentMethodListModification',
            (response) => this.load(this.paymentMethod.id)
        );
    }
}
