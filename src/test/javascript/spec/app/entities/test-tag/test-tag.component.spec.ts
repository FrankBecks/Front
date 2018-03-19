/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { TestTagComponent } from '../../../../../../main/webapp/app/entities/test-tag/test-tag.component';
import { TestTagService } from '../../../../../../main/webapp/app/entities/test-tag/test-tag.service';
import { TestTag } from '../../../../../../main/webapp/app/entities/test-tag/test-tag.model';

describe('Component Tests', () => {

    describe('TestTag Management Component', () => {
        let comp: TestTagComponent;
        let fixture: ComponentFixture<TestTagComponent>;
        let service: TestTagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [TestTagComponent],
                providers: [
                    TestTagService
                ]
            })
            .overrideTemplate(TestTagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestTagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TestTag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testTags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
