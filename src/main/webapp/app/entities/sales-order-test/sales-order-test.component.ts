import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalesOrderTest } from './sales-order-test.model';
import { SalesOrderTestService } from './sales-order-test.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sales-order-test',
    templateUrl: './sales-order-test.component.html'
})
export class SalesOrderTestComponent implements OnInit, OnDestroy {
salesOrderTests: SalesOrderTest[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private salesOrderTestService: SalesOrderTestService,
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
            this.salesOrderTestService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<SalesOrderTest[]>) => this.salesOrderTests = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.salesOrderTestService.query().subscribe(
            (res: HttpResponse<SalesOrderTest[]>) => {
                this.salesOrderTests = res.body;
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
        this.registerChangeInSalesOrderTests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SalesOrderTest) {
        return item.id;
    }
    registerChangeInSalesOrderTests() {
        this.eventSubscriber = this.eventManager.subscribe('salesOrderTestListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
