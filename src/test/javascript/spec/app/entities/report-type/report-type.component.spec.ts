/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { ReportTypeComponent } from '../../../../../../main/webapp/app/entities/report-type/report-type.component';
import { ReportTypeService } from '../../../../../../main/webapp/app/entities/report-type/report-type.service';
import { ReportType } from '../../../../../../main/webapp/app/entities/report-type/report-type.model';

describe('Component Tests', () => {

    describe('ReportType Management Component', () => {
        let comp: ReportTypeComponent;
        let fixture: ComponentFixture<ReportTypeComponent>;
        let service: ReportTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ReportTypeComponent],
                providers: [
                    ReportTypeService
                ]
            })
            .overrideTemplate(ReportTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReportType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reportTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
