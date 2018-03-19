/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { TestTypeComponent } from '../../../../../../main/webapp/app/entities/test-type/test-type.component';
import { TestTypeService } from '../../../../../../main/webapp/app/entities/test-type/test-type.service';
import { TestType } from '../../../../../../main/webapp/app/entities/test-type/test-type.model';

describe('Component Tests', () => {

    describe('TestType Management Component', () => {
        let comp: TestTypeComponent;
        let fixture: ComponentFixture<TestTypeComponent>;
        let service: TestTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [TestTypeComponent],
                providers: [
                    TestTypeService
                ]
            })
            .overrideTemplate(TestTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TestType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
