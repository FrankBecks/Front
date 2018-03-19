import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderPriority } from './order-priority.model';
import { OrderPriorityService } from './order-priority.service';

@Component({
    selector: 'jhi-order-priority-detail',
    templateUrl: './order-priority-detail.component.html'
})
export class OrderPriorityDetailComponent implements OnInit, OnDestroy {

    orderPriority: OrderPriority;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderPriorityService: OrderPriorityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderPriorities();
    }

    load(id) {
        this.orderPriorityService.find(id)
            .subscribe((orderPriorityResponse: HttpResponse<OrderPriority>) => {
                this.orderPriority = orderPriorityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderPriorities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderPriorityListModification',
            (response) => this.load(this.orderPriority.id)
        );
    }
}
