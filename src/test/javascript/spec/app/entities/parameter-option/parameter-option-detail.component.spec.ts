/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { ParameterOptionDetailComponent } from '../../../../../../main/webapp/app/entities/parameter-option/parameter-option-detail.component';
import { ParameterOptionService } from '../../../../../../main/webapp/app/entities/parameter-option/parameter-option.service';
import { ParameterOption } from '../../../../../../main/webapp/app/entities/parameter-option/parameter-option.model';

describe('Component Tests', () => {

    describe('ParameterOption Management Detail Component', () => {
        let comp: ParameterOptionDetailComponent;
        let fixture: ComponentFixture<ParameterOptionDetailComponent>;
        let service: ParameterOptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ParameterOptionDetailComponent],
                providers: [
                    ParameterOptionService
                ]
            })
            .overrideTemplate(ParameterOptionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParameterOptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterOptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ParameterOption(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parameterOption).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
