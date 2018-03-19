import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TestType } from './test-type.model';
import { TestTypeService } from './test-type.service';

@Component({
    selector: 'jhi-test-type-detail',
    templateUrl: './test-type-detail.component.html'
})
export class TestTypeDetailComponent implements OnInit, OnDestroy {

    testType: TestType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testTypeService: TestTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestTypes();
    }

    load(id) {
        this.testTypeService.find(id)
            .subscribe((testTypeResponse: HttpResponse<TestType>) => {
                this.testType = testTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testTypeListModification',
            (response) => this.load(this.testType.id)
        );
    }
}
