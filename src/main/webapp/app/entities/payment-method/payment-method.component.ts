import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentMethod } from './payment-method.model';
import { PaymentMethodService } from './payment-method.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-payment-method',
    templateUrl: './payment-method.component.html'
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
paymentMethods: PaymentMethod[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private paymentMethodService: PaymentMethodService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.paymentMethodService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PaymentMethod[]>) => this.paymentMethods = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.paymentMethodService.query().subscribe(
            (res: HttpResponse<PaymentMethod[]>) => {
                this.paymentMethods = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPaymentMethods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PaymentMethod) {
        return item.id;
    }
    registerChangeInPaymentMethods() {
        this.eventSubscriber = this.eventManager.subscribe('paymentMethodListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
