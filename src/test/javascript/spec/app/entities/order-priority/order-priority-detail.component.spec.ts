/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { OrderPriorityDetailComponent } from '../../../../../../main/webapp/app/entities/order-priority/order-priority-detail.component';
import { OrderPriorityService } from '../../../../../../main/webapp/app/entities/order-priority/order-priority.service';
import { OrderPriority } from '../../../../../../main/webapp/app/entities/order-priority/order-priority.model';

describe('Component Tests', () => {

    describe('OrderPriority Management Detail Component', () => {
        let comp: OrderPriorityDetailComponent;
        let fixture: ComponentFixture<OrderPriorityDetailComponent>;
        let service: OrderPriorityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [OrderPriorityDetailComponent],
                providers: [
                    OrderPriorityService
                ]
            })
            .overrideTemplate(OrderPriorityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderPriorityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderPriorityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderPriority(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderPriority).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
