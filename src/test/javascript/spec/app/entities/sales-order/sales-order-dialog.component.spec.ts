/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderDialogComponent } from '../../../../../../main/webapp/app/entities/sales-order/sales-order-dialog.component';
import { SalesOrderService } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.service';
import { SalesOrder } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { ReportTypeService } from '../../../../../../main/webapp/app/entities/report-type';
import { OrderTypeService } from '../../../../../../main/webapp/app/entities/order-type';
import { SegmentService } from '../../../../../../main/webapp/app/entities/segment';
import { PaymentMethodService } from '../../../../../../main/webapp/app/entities/payment-method';
import { OrderPriorityService } from '../../../../../../main/webapp/app/entities/order-priority';
import { OrderStatusService } from '../../../../../../main/webapp/app/entities/order-status';
import { SalesOrderTestService } from '../../../../../../main/webapp/app/entities/sales-order-test';
import { SampleService } from '../../../../../../main/webapp/app/entities/sample';
import { MessageService } from '../../../../../../main/webapp/app/entities/message';

describe('Component Tests', () => {

    describe('SalesOrder Management Dialog Component', () => {
        let comp: SalesOrderDialogComponent;
        let fixture: ComponentFixture<SalesOrderDialogComponent>;
        let service: SalesOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderDialogComponent],
                providers: [
                    UserService,
                    ReportTypeService,
                    OrderTypeService,
                    SegmentService,
                    PaymentMethodService,
                    OrderPriorityService,
                    OrderStatusService,
                    SalesOrderTestService,
                    SampleService,
                    MessageService,
                    SalesOrderService
                ]
            })
            .overrideTemplate(SalesOrderDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SalesOrder(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.salesOrder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'salesOrderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SalesOrder();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.salesOrder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'salesOrderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
