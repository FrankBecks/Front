/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { ParameterOptionComponent } from '../../../../../../main/webapp/app/entities/parameter-option/parameter-option.component';
import { ParameterOptionService } from '../../../../../../main/webapp/app/entities/parameter-option/parameter-option.service';
import { ParameterOption } from '../../../../../../main/webapp/app/entities/parameter-option/parameter-option.model';

describe('Component Tests', () => {

    describe('ParameterOption Management Component', () => {
        let comp: ParameterOptionComponent;
        let fixture: ComponentFixture<ParameterOptionComponent>;
        let service: ParameterOptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ParameterOptionComponent],
                providers: [
                    ParameterOptionService
                ]
            })
            .overrideTemplate(ParameterOptionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParameterOptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterOptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ParameterOption(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.parameterOptions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
