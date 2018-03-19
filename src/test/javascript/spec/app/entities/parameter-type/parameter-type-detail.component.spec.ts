/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { ParameterTypeDetailComponent } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type-detail.component';
import { ParameterTypeService } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type.service';
import { ParameterType } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type.model';

describe('Component Tests', () => {

    describe('ParameterType Management Detail Component', () => {
        let comp: ParameterTypeDetailComponent;
        let fixture: ComponentFixture<ParameterTypeDetailComponent>;
        let service: ParameterTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ParameterTypeDetailComponent],
                providers: [
                    ParameterTypeService
                ]
            })
            .overrideTemplate(ParameterTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParameterTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ParameterType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parameterType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
