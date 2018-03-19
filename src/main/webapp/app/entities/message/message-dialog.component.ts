import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Message } from './message.model';
import { MessagePopupService } from './message-popup.service';
import { MessageService } from './message.service';
import { SalesOrder, SalesOrderService } from '../sales-order';
import { MessageType, MessageTypeService } from '../message-type';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-message-dialog',
    templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent implements OnInit {

    message: Message;
    isSaving: boolean;

    salesorders: SalesOrder[];

    messagetypes: MessageType[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private messageService: MessageService,
        private salesOrderService: SalesOrderService,
        private messageTypeService: MessageTypeService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.salesOrderService
            .query({filter: 'message-is-null'})
            .subscribe((res: HttpResponse<SalesOrder[]>) => {
                if (!this.message.salesOrder || !this.message.salesOrder.id) {
                    this.salesorders = res.body;
                } else {
                    this.salesOrderService
                        .find(this.message.salesOrder.id)
                        .subscribe((subRes: HttpResponse<SalesOrder>) => {
                            this.salesorders = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.messageTypeService
            .query({filter: 'message-is-null'})
            .subscribe((res: HttpResponse<MessageType[]>) => {
                if (!this.message.messageType || !this.message.messageType.id) {
                    this.messagetypes = res.body;
                } else {
                    this.messageTypeService
                        .find(this.message.messageType.id)
                        .subscribe((subRes: HttpResponse<MessageType>) => {
                            this.messagetypes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.message.id !== undefined) {
            this.subscribeToSaveResponse(
                this.messageService.update(this.message));
        } else {
            this.subscribeToSaveResponse(
                this.messageService.create(this.message));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Message>>) {
        result.subscribe((res: HttpResponse<Message>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Message) {
        this.eventManager.broadcast({ name: 'messageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSalesOrderById(index: number, item: SalesOrder) {
        return item.id;
    }

    trackMessageTypeById(index: number, item: MessageType) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-message-popup',
    template: ''
})
export class MessagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.messagePopupService
                    .open(MessageDialogComponent as Component, params['id']);
            } else {
                this.messagePopupService
                    .open(MessageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
