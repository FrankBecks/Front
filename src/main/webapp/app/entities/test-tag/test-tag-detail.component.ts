import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TestTag } from './test-tag.model';
import { TestTagService } from './test-tag.service';

@Component({
    selector: 'jhi-test-tag-detail',
    templateUrl: './test-tag-detail.component.html'
})
export class TestTagDetailComponent implements OnInit, OnDestroy {

    testTag: TestTag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testTagService: TestTagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestTags();
    }

    load(id) {
        this.testTagService.find(id)
            .subscribe((testTagResponse: HttpResponse<TestTag>) => {
                this.testTag = testTagResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testTagListModification',
            (response) => this.load(this.testTag.id)
        );
    }
}
