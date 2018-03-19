/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderTestComponent } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.component';
import { SalesOrderTestService } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.service';
import { SalesOrderTest } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.model';

describe('Component Tests', () => {

    describe('SalesOrderTest Management Component', () => {
        let comp: SalesOrderTestComponent;
        let fixture: ComponentFixture<SalesOrderTestComponent>;
        let service: SalesOrderTestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderTestComponent],
                providers: [
                    SalesOrderTestService
                ]
            })
            .overrideTemplate(SalesOrderTestComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderTestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderTestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SalesOrderTest(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salesOrderTests[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
