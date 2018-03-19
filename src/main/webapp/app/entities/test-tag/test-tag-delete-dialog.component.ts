import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestTag } from './test-tag.model';
import { TestTagPopupService } from './test-tag-popup.service';
import { TestTagService } from './test-tag.service';

@Component({
    selector: 'jhi-test-tag-delete-dialog',
    templateUrl: './test-tag-delete-dialog.component.html'
})
export class TestTagDeleteDialogComponent {

    testTag: TestTag;

    constructor(
        private testTagService: TestTagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testTagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testTagListModification',
                content: 'Deleted an testTag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-tag-delete-popup',
    template: ''
})
export class TestTagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testTagPopupService: TestTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testTagPopupService
                .open(TestTagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
