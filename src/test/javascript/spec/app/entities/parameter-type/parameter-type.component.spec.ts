/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { ParameterTypeComponent } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type.component';
import { ParameterTypeService } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type.service';
import { ParameterType } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type.model';

describe('Component Tests', () => {

    describe('ParameterType Management Component', () => {
        let comp: ParameterTypeComponent;
        let fixture: ComponentFixture<ParameterTypeComponent>;
        let service: ParameterTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ParameterTypeComponent],
                providers: [
                    ParameterTypeService
                ]
            })
            .overrideTemplate(ParameterTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParameterTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ParameterType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.parameterTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
