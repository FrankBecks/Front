import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderType } from './order-type.model';
import { OrderTypeService } from './order-type.service';

@Component({
    selector: 'jhi-order-type-detail',
    templateUrl: './order-type-detail.component.html'
})
export class OrderTypeDetailComponent implements OnInit, OnDestroy {

    orderType: OrderType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderTypeService: OrderTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderTypes();
    }

    load(id) {
        this.orderTypeService.find(id)
            .subscribe((orderTypeResponse: HttpResponse<OrderType>) => {
                this.orderType = orderTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderTypeListModification',
            (response) => this.load(this.orderType.id)
        );
    }
}
