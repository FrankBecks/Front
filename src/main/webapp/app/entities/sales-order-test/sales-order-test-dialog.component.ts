import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalesOrderTest } from './sales-order-test.model';
import { SalesOrderTestPopupService } from './sales-order-test-popup.service';
import { SalesOrderTestService } from './sales-order-test.service';
import { Category, CategoryService } from '../category';
import { TestType, TestTypeService } from '../test-type';
import { TestTag, TestTagService } from '../test-tag';
import { Parameter, ParameterService } from '../parameter';
import { SalesOrder, SalesOrderService } from '../sales-order';

@Component({
    selector: 'jhi-sales-order-test-dialog',
    templateUrl: './sales-order-test-dialog.component.html'
})
export class SalesOrderTestDialogComponent implements OnInit {

    salesOrderTest: SalesOrderTest;
    isSaving: boolean;

    categories: Category[];

    testtypes: TestType[];

    testtags: TestTag[];

    parameters: Parameter[];

    salesorders: SalesOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private salesOrderTestService: SalesOrderTestService,
        private categoryService: CategoryService,
        private testTypeService: TestTypeService,
        private testTagService: TestTagService,
        private parameterService: ParameterService,
        private salesOrderService: SalesOrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService
            .query({filter: 'salesordertest(name)-is-null'})
            .subscribe((res: HttpResponse<Category[]>) => {
                if (!this.salesOrderTest.category || !this.salesOrderTest.category.id) {
                    this.categories = res.body;
                } else {
                    this.categoryService
                        .find(this.salesOrderTest.category.id)
                        .subscribe((subRes: HttpResponse<Category>) => {
                            this.categories = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.testTypeService
            .query({filter: 'salesorder(name)-is-null'})
            .subscribe((res: HttpResponse<TestType[]>) => {
                if (!this.salesOrderTest.testType || !this.salesOrderTest.testType.id) {
                    this.testtypes = res.body;
                } else {
                    this.testTypeService
                        .find(this.salesOrderTest.testType.id)
                        .subscribe((subRes: HttpResponse<TestType>) => {
                            this.testtypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.testTagService.query()
            .subscribe((res: HttpResponse<TestTag[]>) => { this.testtags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.parameterService.query()
            .subscribe((res: HttpResponse<Parameter[]>) => { this.parameters = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.salesOrderService.query()
            .subscribe((res: HttpResponse<SalesOrder[]>) => { this.salesorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.salesOrderTest.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salesOrderTestService.update(this.salesOrderTest));
        } else {
            this.subscribeToSaveResponse(
                this.salesOrderTestService.create(this.salesOrderTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SalesOrderTest>>) {
        result.subscribe((res: HttpResponse<SalesOrderTest>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SalesOrderTest) {
        this.eventManager.broadcast({ name: 'salesOrderTestListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }

    trackTestTypeById(index: number, item: TestType) {
        return item.id;
    }

    trackTestTagById(index: number, item: TestTag) {
        return item.id;
    }

    trackParameterById(index: number, item: Parameter) {
        return item.id;
    }

    trackSalesOrderById(index: number, item: SalesOrder) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-sales-order-test-popup',
    template: ''
})
export class SalesOrderTestPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salesOrderTestPopupService: SalesOrderTestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.salesOrderTestPopupService
                    .open(SalesOrderTestDialogComponent as Component, params['id']);
            } else {
                this.salesOrderTestPopupService
                    .open(SalesOrderTestDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
