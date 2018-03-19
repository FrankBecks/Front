import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ParameterOption } from './parameter-option.model';
import { ParameterOptionService } from './parameter-option.service';

@Component({
    selector: 'jhi-parameter-option-detail',
    templateUrl: './parameter-option-detail.component.html'
})
export class ParameterOptionDetailComponent implements OnInit, OnDestroy {

    parameterOption: ParameterOption;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parameterOptionService: ParameterOptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParameterOptions();
    }

    load(id) {
        this.parameterOptionService.find(id)
            .subscribe((parameterOptionResponse: HttpResponse<ParameterOption>) => {
                this.parameterOption = parameterOptionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParameterOptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'parameterOptionListModification',
            (response) => this.load(this.parameterOption.id)
        );
    }
}
