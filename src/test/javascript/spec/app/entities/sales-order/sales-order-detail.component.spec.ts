/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderDetailComponent } from '../../../../../../main/webapp/app/entities/sales-order/sales-order-detail.component';
import { SalesOrderService } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.service';
import { SalesOrder } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.model';

describe('Component Tests', () => {

    describe('SalesOrder Management Detail Component', () => {
        let comp: SalesOrderDetailComponent;
        let fixture: ComponentFixture<SalesOrderDetailComponent>;
        let service: SalesOrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderDetailComponent],
                providers: [
                    SalesOrderService
                ]
            })
            .overrideTemplate(SalesOrderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SalesOrder(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.salesOrder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
