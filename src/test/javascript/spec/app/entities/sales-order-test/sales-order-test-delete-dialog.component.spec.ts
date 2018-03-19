/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderTestDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test-delete-dialog.component';
import { SalesOrderTestService } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.service';

describe('Component Tests', () => {

    describe('SalesOrderTest Management Delete Component', () => {
        let comp: SalesOrderTestDeleteDialogComponent;
        let fixture: ComponentFixture<SalesOrderTestDeleteDialogComponent>;
        let service: SalesOrderTestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderTestDeleteDialogComponent],
                providers: [
                    SalesOrderTestService
                ]
            })
            .overrideTemplate(SalesOrderTestDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderTestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderTestService);
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
