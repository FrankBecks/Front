import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReportType } from './report-type.model';
import { ReportTypePopupService } from './report-type-popup.service';
import { ReportTypeService } from './report-type.service';

@Component({
    selector: 'jhi-report-type-delete-dialog',
    templateUrl: './report-type-delete-dialog.component.html'
})
export class ReportTypeDeleteDialogComponent {

    reportType: ReportType;

    constructor(
        private reportTypeService: ReportTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reportTypeListModification',
                content: 'Deleted an reportType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-report-type-delete-popup',
    template: ''
})
export class ReportTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportTypePopupService: ReportTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reportTypePopupService
                .open(ReportTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
