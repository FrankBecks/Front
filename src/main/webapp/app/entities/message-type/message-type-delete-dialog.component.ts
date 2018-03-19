import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageType } from './message-type.model';
import { MessageTypePopupService } from './message-type-popup.service';
import { MessageTypeService } from './message-type.service';

@Component({
    selector: 'jhi-message-type-delete-dialog',
    templateUrl: './message-type-delete-dialog.component.html'
})
export class MessageTypeDeleteDialogComponent {

    messageType: MessageType;

    constructor(
        private messageTypeService: MessageTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'messageTypeListModification',
                content: 'Deleted an messageType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-type-delete-popup',
    template: ''
})
export class MessageTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messageTypePopupService: MessageTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.messageTypePopupService
                .open(MessageTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
