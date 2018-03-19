import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SalesOrderTest } from './sales-order-test.model';
import { SalesOrderTestService } from './sales-order-test.service';

@Component({
    selector: 'jhi-sales-order-test-detail',
    templateUrl: './sales-order-test-detail.component.html'
})
export class SalesOrderTestDetailComponent implements OnInit, OnDestroy {

    salesOrderTest: SalesOrderTest;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salesOrderTestService: SalesOrderTestService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSalesOrderTests();
    }

    load(id) {
        this.salesOrderTestService.find(id)
            .subscribe((salesOrderTestResponse: HttpResponse<SalesOrderTest>) => {
                this.salesOrderTest = salesOrderTestResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalesOrderTests() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salesOrderTestListModification',
            (response) => this.load(this.salesOrderTest.id)
        );
    }
}
