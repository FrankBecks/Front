/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderTestDetailComponent } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test-detail.component';
import { SalesOrderTestService } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.service';
import { SalesOrderTest } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.model';

describe('Component Tests', () => {

    describe('SalesOrderTest Management Detail Component', () => {
        let comp: SalesOrderTestDetailComponent;
        let fixture: ComponentFixture<SalesOrderTestDetailComponent>;
        let service: SalesOrderTestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderTestDetailComponent],
                providers: [
                    SalesOrderTestService
                ]
            })
            .overrideTemplate(SalesOrderTestDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderTestDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderTestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SalesOrderTest(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.salesOrderTest).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
