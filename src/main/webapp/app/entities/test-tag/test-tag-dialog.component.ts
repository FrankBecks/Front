import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestTag } from './test-tag.model';
import { TestTagPopupService } from './test-tag-popup.service';
import { TestTagService } from './test-tag.service';
import { SalesOrderTest, SalesOrderTestService } from '../sales-order-test';

@Component({
    selector: 'jhi-test-tag-dialog',
    templateUrl: './test-tag-dialog.component.html'
})
export class TestTagDialogComponent implements OnInit {

    testTag: TestTag;
    isSaving: boolean;

    salesordertests: SalesOrderTest[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testTagService: TestTagService,
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
        if (this.testTag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testTagService.update(this.testTag));
        } else {
            this.subscribeToSaveResponse(
                this.testTagService.create(this.testTag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TestTag>>) {
        result.subscribe((res: HttpResponse<TestTag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TestTag) {
        this.eventManager.broadcast({ name: 'testTagListModification', content: 'OK'});
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
    selector: 'jhi-test-tag-popup',
    template: ''
})
export class TestTagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testTagPopupService: TestTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testTagPopupService
                    .open(TestTagDialogComponent as Component, params['id']);
            } else {
                this.testTagPopupService
                    .open(TestTagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
