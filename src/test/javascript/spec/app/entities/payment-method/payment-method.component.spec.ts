/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { PaymentMethodComponent } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.component';
import { PaymentMethodService } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.service';
import { PaymentMethod } from '../../../../../../main/webapp/app/entities/payment-method/payment-method.model';

describe('Component Tests', () => {

    describe('PaymentMethod Management Component', () => {
        let comp: PaymentMethodComponent;
        let fixture: ComponentFixture<PaymentMethodComponent>;
        let service: PaymentMethodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [PaymentMethodComponent],
                providers: [
                    PaymentMethodService
                ]
            })
            .overrideTemplate(PaymentMethodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMethodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMethodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaymentMethod(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.paymentMethods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
