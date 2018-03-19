import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ParameterType } from './parameter-type.model';
import { ParameterTypeService } from './parameter-type.service';

@Component({
    selector: 'jhi-parameter-type-detail',
    templateUrl: './parameter-type-detail.component.html'
})
export class ParameterTypeDetailComponent implements OnInit, OnDestroy {

    parameterType: ParameterType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parameterTypeService: ParameterTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParameterTypes();
    }

    load(id) {
        this.parameterTypeService.find(id)
            .subscribe((parameterTypeResponse: HttpResponse<ParameterType>) => {
                this.parameterType = parameterTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParameterTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'parameterTypeListModification',
            (response) => this.load(this.parameterType.id)
        );
    }
}
