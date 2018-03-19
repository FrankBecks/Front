/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FrontTestModule } from '../../../test.module';
import { MessageTypeDetailComponent } from '../../../../../../main/webapp/app/entities/message-type/message-type-detail.component';
import { MessageTypeService } from '../../../../../../main/webapp/app/entities/message-type/message-type.service';
import { MessageType } from '../../../../../../main/webapp/app/entities/message-type/message-type.model';

describe('Component Tests', () => {

    describe('MessageType Management Detail Component', () => {
        let comp: MessageTypeDetailComponent;
        let fixture: ComponentFixture<MessageTypeDetailComponent>;
        let service: MessageTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [MessageTypeDetailComponent],
                providers: [
                    MessageTypeService
                ]
            })
            .overrideTemplate(MessageTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MessageType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.messageType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
