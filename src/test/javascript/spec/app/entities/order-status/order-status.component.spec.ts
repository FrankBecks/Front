/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { OrderStatusComponent } from '../../../../../../main/webapp/app/entities/order-status/order-status.component';
import { OrderStatusService } from '../../../../../../main/webapp/app/entities/order-status/order-status.service';
import { OrderStatus } from '../../../../../../main/webapp/app/entities/order-status/order-status.model';

describe('Component Tests', () => {

    describe('OrderStatus Management Component', () => {
        let comp: OrderStatusComponent;
        let fixture: ComponentFixture<OrderStatusComponent>;
        let service: OrderStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [OrderStatusComponent],
                providers: [
                    OrderStatusService
                ]
            })
            .overrideTemplate(OrderStatusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderStatus(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
