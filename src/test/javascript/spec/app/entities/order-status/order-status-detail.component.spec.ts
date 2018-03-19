/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { OrderStatusDetailComponent } from '../../../../../../main/webapp/app/entities/order-status/order-status-detail.component';
import { OrderStatusService } from '../../../../../../main/webapp/app/entities/order-status/order-status.service';
import { OrderStatus } from '../../../../../../main/webapp/app/entities/order-status/order-status.model';

describe('Component Tests', () => {

    describe('OrderStatus Management Detail Component', () => {
        let comp: OrderStatusDetailComponent;
        let fixture: ComponentFixture<OrderStatusDetailComponent>;
        let service: OrderStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [OrderStatusDetailComponent],
                providers: [
                    OrderStatusService
                ]
            })
            .overrideTemplate(OrderStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderStatus(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderStatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
