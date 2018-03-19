import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MessageType } from './message-type.model';
import { MessageTypeService } from './message-type.service';

@Component({
    selector: 'jhi-message-type-detail',
    templateUrl: './message-type-detail.component.html'
})
export class MessageTypeDetailComponent implements OnInit, OnDestroy {

    messageType: MessageType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private messageTypeService: MessageTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMessageTypes();
    }

    load(id) {
        this.messageTypeService.find(id)
            .subscribe((messageTypeResponse: HttpResponse<MessageType>) => {
                this.messageType = messageTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMessageTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'messageTypeListModification',
            (response) => this.load(this.messageType.id)
        );
    }
}
