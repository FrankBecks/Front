import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MessageType } from './message-type.model';
import { MessageTypePopupService } from './message-type-popup.service';
import { MessageTypeService } from './message-type.service';
import { Message, MessageService } from '../message';

@Component({
    selector: 'jhi-message-type-dialog',
    templateUrl: './message-type-dialog.component.html'
})
export class MessageTypeDialogComponent implements OnInit {

    messageType: MessageType;
    isSaving: boolean;

    messages: Message[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private messageTypeService: MessageTypeService,
        private messageService: MessageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.messageService.query()
            .subscribe((res: HttpResponse<Message[]>) => { this.messages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.messageType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.messageTypeService.update(this.messageType));
        } else {
            this.subscribeToSaveResponse(
                this.messageTypeService.create(this.messageType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MessageType>>) {
        result.subscribe((res: HttpResponse<MessageType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MessageType) {
        this.eventManager.broadcast({ name: 'messageTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMessageById(index: number, item: Message) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-message-type-popup',
    template: ''
})
export class MessageTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messageTypePopupService: MessageTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.messageTypePopupService
                    .open(MessageTypeDialogComponent as Component, params['id']);
            } else {
                this.messageTypePopupService
                    .open(MessageTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
