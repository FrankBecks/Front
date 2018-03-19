/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { ReportTypeDetailComponent } from '../../../../../../main/webapp/app/entities/report-type/report-type-detail.component';
import { ReportTypeService } from '../../../../../../main/webapp/app/entities/report-type/report-type.service';
import { ReportType } from '../../../../../../main/webapp/app/entities/report-type/report-type.model';

describe('Component Tests', () => {

    describe('ReportType Management Detail Component', () => {
        let comp: ReportTypeDetailComponent;
        let fixture: ComponentFixture<ReportTypeDetailComponent>;
        let service: ReportTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ReportTypeDetailComponent],
                providers: [
                    ReportTypeService
                ]
            })
            .overrideTemplate(ReportTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReportType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reportType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
