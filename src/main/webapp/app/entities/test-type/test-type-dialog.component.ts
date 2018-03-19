import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestType } from './test-type.model';
import { TestTypePopupService } from './test-type-popup.service';
import { TestTypeService } from './test-type.service';
import { SalesOrderTest, SalesOrderTestService } from '../sales-order-test';

@Component({
    selector: 'jhi-test-type-dialog',
    templateUrl: './test-type-dialog.component.html'
})
export class TestTypeDialogComponent implements OnInit {

    testType: TestType;
    isSaving: boolean;

    salesordertests: SalesOrderTest[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testTypeService: TestTypeService,
        private salesOrderTestService: SalesOrderTestService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.salesOrderTestService.query()
            .subscribe((res: HttpResponse<SalesOrderTest[]>) => { this.salesordertests = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testTypeService.update(this.testType));
        } else {
            this.subscribeToSaveResponse(
                this.testTypeService.create(this.testType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TestType>>) {
        result.subscribe((res: HttpResponse<TestType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TestType) {
        this.eventManager.broadcast({ name: 'testTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSalesOrderTestById(index: number, item: SalesOrderTest) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-test-type-popup',
    template: ''
})
export class TestTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testTypePopupService: TestTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testTypePopupService
                    .open(TestTypeDialogComponent as Component, params['id']);
            } else {
                this.testTypePopupService
                    .open(TestTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
