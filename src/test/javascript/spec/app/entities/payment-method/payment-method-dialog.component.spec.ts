/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FrontTestModule } from '../../../test.module';
import { PaymentMethodDialogComponent } from '../../../../../../main/webapp/app/entities/payment-method/payment-method-dialog.component';
import { PaymentMethodService } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.service';
import { PaymentMethod } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.model';
import { SalesOrderService } from '../../../../../../main/webapp/app/entities/sales-order';

describe('Component Tests', () => {

    describe('PaymentMethod Management Dialog Component', () => {
        let comp: PaymentMethodDialogComponent;
        let fixture: ComponentFixture<PaymentMethodDialogComponent>;
        let service: PaymentMethodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [PaymentMethodDialogComponent],
                providers: [
                    SalesOrderService,
                    PaymentMethodService
                ]
            })
            .overrideTemplate(PaymentMethodDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMethodDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMethodService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentMethod(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.paymentMethod = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentMethodListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentMethod();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.paymentMethod = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentMethodListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
