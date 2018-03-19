import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SalesOrderTest } from './sales-order-test.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SalesOrderTest>;

@Injectable()
export class SalesOrderTestService {

    private resourceUrl =  SERVER_API_URL + 'api/sales-order-tests';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/sales-order-tests';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(salesOrderTest: SalesOrderTest): Observable<EntityResponseType> {
        const copy = this.convert(salesOrderTest);
        return this.http.post<SalesOrderTest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(salesOrderTest: SalesOrderTest): Observable<EntityResponseType> {
        const copy = this.convert(salesOrderTest);
        return this.http.put<SalesOrderTest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SalesOrderTest>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SalesOrderTest[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalesOrderTest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalesOrderTest[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SalesOrderTest[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalesOrderTest[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalesOrderTest[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SalesOrderTest = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SalesOrderTest[]>): HttpResponse<SalesOrderTest[]> {
        const jsonResponse: SalesOrderTest[] = res.body;
        const body: SalesOrderTest[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SalesOrderTest.
     */
    private convertItemFromServer(salesOrderTest: SalesOrderTest): SalesOrderTest {
        const copy: SalesOrderTest = Object.assign({}, salesOrderTest);
        copy.dateModified = this.dateUtils
            .convertDateTimeFromServer(salesOrderTest.dateModified);
        return copy;
    }

    /**
     * Convert a SalesOrderTest to a JSON which can be sent to the server.
     */
    private convert(salesOrderTest: SalesOrderTest): SalesOrderTest {
        const copy: SalesOrderTest = Object.assign({}, salesOrderTest);

        copy.dateModified = this.dateUtils.toDate(salesOrderTest.dateModified);
        return copy;
    }
}
