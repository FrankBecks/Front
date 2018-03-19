import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SalesOrder } from './sales-order.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SalesOrder>;

@Injectable()
export class SalesOrderService {

    private resourceUrl =  SERVER_API_URL + 'api/sales-orders';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/sales-orders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(salesOrder: SalesOrder): Observable<EntityResponseType> {
        const copy = this.convert(salesOrder);
        return this.http.post<SalesOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(salesOrder: SalesOrder): Observable<EntityResponseType> {
        const copy = this.convert(salesOrder);
        return this.http.put<SalesOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SalesOrder>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SalesOrder[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalesOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalesOrder[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SalesOrder[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalesOrder[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalesOrder[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SalesOrder = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SalesOrder[]>): HttpResponse<SalesOrder[]> {
        const jsonResponse: SalesOrder[] = res.body;
        const body: SalesOrder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SalesOrder.
     */
    private convertItemFromServer(salesOrder: SalesOrder): SalesOrder {
        const copy: SalesOrder = Object.assign({}, salesOrder);
        copy.dateExpectedDelivery = this.dateUtils
            .convertDateTimeFromServer(salesOrder.dateExpectedDelivery);
        copy.dateConfirmed = this.dateUtils
            .convertDateTimeFromServer(salesOrder.dateConfirmed);
        copy.dateSamplesExpected = this.dateUtils
            .convertDateTimeFromServer(salesOrder.dateSamplesExpected);
        copy.dateXmlExported = this.dateUtils
            .convertDateTimeFromServer(salesOrder.dateXmlExported);
        copy.dateModified = this.dateUtils
            .convertDateTimeFromServer(salesOrder.dateModified);
        return copy;
    }

    /**
     * Convert a SalesOrder to a JSON which can be sent to the server.
     */
    private convert(salesOrder: SalesOrder): SalesOrder {
        const copy: SalesOrder = Object.assign({}, salesOrder);

        copy.dateExpectedDelivery = this.dateUtils.toDate(salesOrder.dateExpectedDelivery);

        copy.dateConfirmed = this.dateUtils.toDate(salesOrder.dateConfirmed);

        copy.dateSamplesExpected = this.dateUtils.toDate(salesOrder.dateSamplesExpected);

        copy.dateXmlExported = this.dateUtils.toDate(salesOrder.dateXmlExported);

        copy.dateModified = this.dateUtils.toDate(salesOrder.dateModified);
        return copy;
    }
}
