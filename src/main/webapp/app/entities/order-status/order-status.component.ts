import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderStatus } from './order-status.model';
import { OrderStatusService } from './order-status.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-order-status',
    templateUrl: './order-status.component.html'
})
export class OrderStatusComponent implements OnInit, OnDestroy {
orderStatuses: OrderStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private orderStatusService: OrderStatusService,
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
            this.orderStatusService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<OrderStatus[]>) => this.orderStatuses = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.orderStatusService.query().subscribe(
            (res: HttpResponse<OrderStatus[]>) => {
                this.orderStatuses = res.body;
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
        this.registerChangeInOrderStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderStatus) {
        return item.id;
    }
    registerChangeInOrderStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('orderStatusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
