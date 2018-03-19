/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { TestTypeDetailComponent } from '../../../../../../main/webapp/app/entities/test-type/test-type-detail.component';
import { TestTypeService } from '../../../../../../main/webapp/app/entities/test-type/test-type.service';
import { TestType } from '../../../../../../main/webapp/app/entities/test-type/test-type.model';

describe('Component Tests', () => {

    describe('TestType Management Detail Component', () => {
        let comp: TestTypeDetailComponent;
        let fixture: ComponentFixture<TestTypeDetailComponent>;
        let service: TestTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [TestTypeDetailComponent],
                providers: [
                    TestTypeService
                ]
            })
            .overrideTemplate(TestTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TestType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
