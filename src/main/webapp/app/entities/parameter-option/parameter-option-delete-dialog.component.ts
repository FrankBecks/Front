import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParameterOption } from './parameter-option.model';
import { ParameterOptionPopupService } from './parameter-option-popup.service';
import { ParameterOptionService } from './parameter-option.service';

@Component({
    selector: 'jhi-parameter-option-delete-dialog',
    templateUrl: './parameter-option-delete-dialog.component.html'
})
export class ParameterOptionDeleteDialogComponent {

    parameterOption: ParameterOption;

    constructor(
        private parameterOptionService: ParameterOptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parameterOptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'parameterOptionListModification',
                content: 'Deleted an parameterOption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parameter-option-delete-popup',
    template: ''
})
export class ParameterOptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parameterOptionPopupService: ParameterOptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.parameterOptionPopupService
                .open(ParameterOptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
