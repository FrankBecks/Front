/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { OrderTypeDetailComponent } from '../../../../../../main/webapp/app/entities/order-type/order-type-detail.component';
import { OrderTypeService } from '../../../../../../main/webapp/app/entities/order-type/order-type.service';
import { OrderType } from '../../../../../../main/webapp/app/entities/order-type/order-type.model';

describe('Component Tests', () => {

    describe('OrderType Management Detail Component', () => {
        let comp: OrderTypeDetailComponent;
        let fixture: ComponentFixture<OrderTypeDetailComponent>;
        let service: OrderTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [OrderTypeDetailComponent],
                providers: [
                    OrderTypeService
                ]
            })
            .overrideTemplate(OrderTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
