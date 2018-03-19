/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontTestModule } from '../../../test.module';
import { MessageTypeComponent } from '../../../../../../main/webapp/app/entities/message-type/message-type.component';
import { MessageTypeService } from '../../../../../../main/webapp/app/entities/message-type/message-type.service';
import { MessageType } from '../../../../../../main/webapp/app/entities/message-type/message-type.model';

describe('Component Tests', () => {

    describe('MessageType Management Component', () => {
        let comp: MessageTypeComponent;
        let fixture: ComponentFixture<MessageTypeComponent>;
        let service: MessageTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [MessageTypeComponent],
                providers: [
                    MessageTypeService
                ]
            })
            .overrideTemplate(MessageTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MessageType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.messageTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
