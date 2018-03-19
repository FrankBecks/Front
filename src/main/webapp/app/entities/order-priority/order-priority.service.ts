import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderPriority } from './order-priority.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderPriority>;

@Injectable()
export class OrderPriorityService {

    private resourceUrl =  SERVER_API_URL + 'api/order-priorities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/order-priorities';

    constructor(private http: HttpClient) { }

    create(orderPriority: OrderPriority): Observable<EntityResponseType> {
        const copy = this.convert(orderPriority);
        return this.http.post<OrderPriority>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderPriority: OrderPriority): Observable<EntityResponseType> {
        const copy = this.convert(orderPriority);
        return this.http.put<OrderPriority>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderPriority>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderPriority[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderPriority[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderPriority[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrderPriority[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderPriority[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderPriority[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderPriority = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderPriority[]>): HttpResponse<OrderPriority[]> {
        const jsonResponse: OrderPriority[] = res.body;
        const body: OrderPriority[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderPriority.
     */
    private convertItemFromServer(orderPriority: OrderPriority): OrderPriority {
        const copy: OrderPriority = Object.assign({}, orderPriority);
        return copy;
    }

    /**
     * Convert a OrderPriority to a JSON which can be sent to the server.
     */
    private convert(orderPriority: OrderPriority): OrderPriority {
        const copy: OrderPriority = Object.assign({}, orderPriority);
        return copy;
    }
}
