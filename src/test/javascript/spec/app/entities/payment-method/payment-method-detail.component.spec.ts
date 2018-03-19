/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { PaymentMethodDetailComponent } from '../../../../../../main/webapp/app/entities/payment-method/payment-method-detail.component';
import { PaymentMethodService } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.service';
import { PaymentMethod } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.model';

describe('Component Tests', () => {

    describe('PaymentMethod Management Detail Component', () => {
        let comp: PaymentMethodDetailComponent;
        let fixture: ComponentFixture<PaymentMethodDetailComponent>;
        let service: PaymentMethodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [PaymentMethodDetailComponent],
                providers: [
                    PaymentMethodService
                ]
            })
            .overrideTemplate(PaymentMethodDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMethodDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMethodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PaymentMethod(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.paymentMethod).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
