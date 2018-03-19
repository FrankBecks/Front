import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalesOrder } from './sales-order.model';
import { SalesOrderService } from './sales-order.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sales-order',
    templateUrl: './sales-order.component.html'
})
export class SalesOrderComponent implements OnInit, OnDestroy {
salesOrders: SalesOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private salesOrderService: SalesOrderService,
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
            this.salesOrderService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<SalesOrder[]>) => this.salesOrders = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.salesOrderService.query().subscribe(
            (res: HttpResponse<SalesOrder[]>) => {
                this.salesOrders = res.body;
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
        this.registerChangeInSalesOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SalesOrder) {
        return item.id;
    }
    registerChangeInSalesOrders() {
        this.eventSubscriber = this.eventManager.subscribe('salesOrderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
