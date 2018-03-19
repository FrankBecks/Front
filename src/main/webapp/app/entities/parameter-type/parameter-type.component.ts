import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParameterType } from './parameter-type.model';
import { ParameterTypeService } from './parameter-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-parameter-type',
    templateUrl: './parameter-type.component.html'
})
export class ParameterTypeComponent implements OnInit, OnDestroy {
parameterTypes: ParameterType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private parameterTypeService: ParameterTypeService,
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
            this.parameterTypeService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ParameterType[]>) => this.parameterTypes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.parameterTypeService.query().subscribe(
            (res: HttpResponse<ParameterType[]>) => {
                this.parameterTypes = res.body;
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
        this.registerChangeInParameterTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ParameterType) {
        return item.id;
    }
    registerChangeInParameterTypes() {
        this.eventSubscriber = this.eventManager.subscribe('parameterTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}