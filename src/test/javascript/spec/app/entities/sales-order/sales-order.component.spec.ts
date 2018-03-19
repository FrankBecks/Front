/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderComponent } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.component';
import { SalesOrderService } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.service';
import { SalesOrder } from '../../../../../../main/webapp/app/entities/sales-order/sales-order.model';

describe('Component Tests', () => {

    describe('SalesOrder Management Component', () => {
        let comp: SalesOrderComponent;
        let fixture: ComponentFixture<SalesOrderComponent>;
        let service: SalesOrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderComponent],
                providers: [
                    SalesOrderService
                ]
            })
            .overrideTemplate(SalesOrderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SalesOrder(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salesOrders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
