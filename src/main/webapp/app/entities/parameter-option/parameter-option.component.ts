import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParameterOption } from './parameter-option.model';
import { ParameterOptionService } from './parameter-option.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-parameter-option',
    templateUrl: './parameter-option.component.html'
})
export class ParameterOptionComponent implements OnInit, OnDestroy {
parameterOptions: ParameterOption[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private parameterOptionService: ParameterOptionService,
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
            this.parameterOptionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ParameterOption[]>) => this.parameterOptions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.parameterOptionService.query().subscribe(
            (res: HttpResponse<ParameterOption[]>) => {
                this.parameterOptions = res.body;
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
        this.registerChangeInParameterOptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ParameterOption) {
        return item.id;
    }
    registerChangeInParameterOptions() {
        this.eventSubscriber = this.eventManager.subscribe('parameterOptionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
