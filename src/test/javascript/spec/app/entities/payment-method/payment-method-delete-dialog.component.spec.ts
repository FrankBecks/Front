/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FrontTestModule } from '../../../test.module';
import { PaymentMethodDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/payment-method/payment-method-delete-dialog.component';
import { PaymentMethodService } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.service';

describe('Component Tests', () => {

    describe('PaymentMethod Management Delete Component', () => {
        let comp: PaymentMethodDeleteDialogComponent;
        let fixture: ComponentFixture<PaymentMethodDeleteDialogComponent>;
        let service: PaymentMethodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [PaymentMethodDeleteDialogComponent],
                providers: [
                    PaymentMethodService
                ]
            })
            .overrideTemplate(PaymentMethodDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMethodDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMethodService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
