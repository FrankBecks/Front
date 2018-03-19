import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderType } from './order-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderType>;

@Injectable()
export class OrderTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/order-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/order-types';

    constructor(private http: HttpClient) { }

    create(orderType: OrderType): Observable<EntityResponseType> {
        const copy = this.convert(orderType);
        return this.http.post<OrderType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderType: OrderType): Observable<EntityResponseType> {
        const copy = this.convert(orderType);
        return this.http.put<OrderType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderType[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrderType[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderType[]>): HttpResponse<OrderType[]> {
        const jsonResponse: OrderType[] = res.body;
        const body: OrderType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderType.
     */
    private convertItemFromServer(orderType: OrderType): OrderType {
        const copy: OrderType = Object.assign({}, orderType);
        return copy;
    }

    /**
     * Convert a OrderType to a JSON which can be sent to the server.
     */
    private convert(orderType: OrderType): OrderType {
        const copy: OrderType = Object.assign({}, orderType);
        return copy;
    }
}
