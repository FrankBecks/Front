/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { OrderTypeComponent } from '../../../../../../main/webapp/app/entities/order-type/order-type.component';
import { OrderTypeService } from '../../../../../../main/webapp/app/entities/order-type/order-type.service';
import { OrderType } from '../../../../../../main/webapp/app/entities/order-type/order-type.model';

describe('Component Tests', () => {

    describe('OrderType Management Component', () => {
        let comp: OrderTypeComponent;
        let fixture: ComponentFixture<OrderTypeComponent>;
        let service: OrderTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [OrderTypeComponent],
                providers: [
                    OrderTypeService
                ]
            })
            .overrideTemplate(OrderTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
