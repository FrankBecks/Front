import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderPriority } from './order-priority.model';
import { OrderPriorityService } from './order-priority.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-order-priority',
    templateUrl: './order-priority.component.html'
})
export class OrderPriorityComponent implements OnInit, OnDestroy {
orderPriorities: OrderPriority[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private orderPriorityService: OrderPriorityService,
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
            this.orderPriorityService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<OrderPriority[]>) => this.orderPriorities = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.orderPriorityService.query().subscribe(
            (res: HttpResponse<OrderPriority[]>) => {
                this.orderPriorities = res.body;
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
        this.registerChangeInOrderPriorities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderPriority) {
        return item.id;
    }
    registerChangeInOrderPriorities() {
        this.eventSubscriber = this.eventManager.subscribe('orderPriorityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
