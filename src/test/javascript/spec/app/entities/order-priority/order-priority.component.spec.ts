/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { OrderPriorityComponent } from '../../../../../../main/webapp/app/entities/order-priority/order-priority.component';
import { OrderPriorityService } from '../../../../../../main/webapp/app/entities/order-priority/order-priority.service';
import { OrderPriority } from '../../../../../../main/webapp/app/entities/order-priority/order-priority.model';

describe('Component Tests', () => {

    describe('OrderPriority Management Component', () => {
        let comp: OrderPriorityComponent;
        let fixture: ComponentFixture<OrderPriorityComponent>;
        let service: OrderPriorityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [OrderPriorityComponent],
                providers: [
                    OrderPriorityService
                ]
            })
            .overrideTemplate(OrderPriorityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderPriorityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderPriorityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderPriority(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderPriorities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
