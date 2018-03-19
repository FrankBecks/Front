import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParameterType } from './parameter-type.model';
import { ParameterTypePopupService } from './parameter-type-popup.service';
import { ParameterTypeService } from './parameter-type.service';

@Component({
    selector: 'jhi-parameter-type-delete-dialog',
    templateUrl: './parameter-type-delete-dialog.component.html'
})
export class ParameterTypeDeleteDialogComponent {

    parameterType: ParameterType;

    constructor(
        private parameterTypeService: ParameterTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parameterTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'parameterTypeListModification',
                content: 'Deleted an parameterType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parameter-type-delete-popup',
    template: ''
})
export class ParameterTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parameterTypePopupService: ParameterTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.parameterTypePopupService
                .open(ParameterTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
