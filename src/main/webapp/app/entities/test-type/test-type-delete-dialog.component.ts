import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestType } from './test-type.model';
import { TestTypePopupService } from './test-type-popup.service';
import { TestTypeService } from './test-type.service';

@Component({
    selector: 'jhi-test-type-delete-dialog',
    templateUrl: './test-type-delete-dialog.component.html'
})
export class TestTypeDeleteDialogComponent {

    testType: TestType;

    constructor(
        private testTypeService: TestTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testTypeListModification',
                content: 'Deleted an testType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-type-delete-popup',
    template: ''
})
export class TestTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testTypePopupService: TestTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testTypePopupService
                .open(TestTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
