/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FrontTestModule } from '../../../test.module';
import { ParameterTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type-delete-dialog.component';
import { ParameterTypeService } from '../../../../../../main/webapp/app/entities/parameter-type/parameter-type.service';

describe('Component Tests', () => {

    describe('ParameterType Management Delete Component', () => {
        let comp: ParameterTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ParameterTypeDeleteDialogComponent>;
        let service: ParameterTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [ParameterTypeDeleteDialogComponent],
                providers: [
                    ParameterTypeService
                ]
            })
            .overrideTemplate(ParameterTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParameterTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
