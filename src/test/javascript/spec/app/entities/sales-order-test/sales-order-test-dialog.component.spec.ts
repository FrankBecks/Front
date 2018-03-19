/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FrontTestModule } from '../../../test.module';
import { SalesOrderTestDialogComponent } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test-dialog.component';
import { SalesOrderTestService } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.service';
import { SalesOrderTest } from '../../../../../../main/webapp/app/entities/sales-order-test/sales-order-test.model';
import { CategoryService } from '../../../../../../main/webapp/app/entities/category';
import { TestTypeService } from '../../../../../../main/webapp/app/entities/test-type';
import { TestTagService } from '../../../../../../main/webapp/app/entities/test-tag';
import { ParameterService } from '../../../../../../main/webapp/app/entities/parameter';
import { SalesOrderService } from '../../../../../../main/webapp/app/entities/sales-order';

describe('Component Tests', () => {

    describe('SalesOrderTest Management Dialog Component', () => {
        let comp: SalesOrderTestDialogComponent;
        let fixture: ComponentFixture<SalesOrderTestDialogComponent>;
        let service: SalesOrderTestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FrontTestModule],
                declarations: [SalesOrderTestDialogComponent],
                providers: [
                    CategoryService,
                    TestTypeService,
                    TestTagService,
                    ParameterService,
                    SalesOrderService,
                    SalesOrderTestService
                ]
            })
            .overrideTemplate(SalesOrderTestDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalesOrderTestDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalesOrderTestService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SalesOrderTest(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.salesOrderTest = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'salesOrderTestListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SalesOrderTest();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.salesOrderTest = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'salesOrderTestListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
