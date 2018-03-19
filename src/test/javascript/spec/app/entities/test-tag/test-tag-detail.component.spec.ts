/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { TestTagDetailComponent } from '../../../../../../main/webapp/app/entities/test-tag/test-tag-detail.component';
import { TestTagService } from '../../../../../../main/webapp/app/entities/test-tag/test-tag.service';
import { TestTag } from '../../../../../../main/webapp/app/entities/test-tag/test-tag.model';

describe('Component Tests', () => {

    describe('TestTag Management Detail Component', () => {
        let comp: TestTagDetailComponent;
        let fixture: ComponentFixture<TestTagDetailComponent>;
        let service: TestTagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [TestTagDetailComponent],
                providers: [
                    TestTagService
                ]
            })
            .overrideTemplate(TestTagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TestTag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testTag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
