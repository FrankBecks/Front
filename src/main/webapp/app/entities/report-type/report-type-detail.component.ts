import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReportType } from './report-type.model';
import { ReportTypeService } from './report-type.service';

@Component({
    selector: 'jhi-report-type-detail',
    templateUrl: './report-type-detail.component.html'
})
export class ReportTypeDetailComponent implements OnInit, OnDestroy {

    reportType: ReportType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reportTypeService: ReportTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReportTypes();
    }

    load(id) {
        this.reportTypeService.find(id)
            .subscribe((reportTypeResponse: HttpResponse<ReportType>) => {
                this.reportType = reportTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReportTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reportTypeListModification',
            (response) => this.load(this.reportType.id)
        );
    }
}
