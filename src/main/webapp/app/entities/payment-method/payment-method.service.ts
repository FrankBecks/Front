import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PaymentMethod } from './payment-method.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentMethod>;

@Injectable()
export class PaymentMethodService {

    private resourceUrl =  SERVER_API_URL + 'api/payment-methods';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/payment-methods';

    constructor(private http: HttpClient) { }

    create(paymentMethod: PaymentMethod): Observable<EntityResponseType> {
        const copy = this.convert(paymentMethod);
        return this.http.post<PaymentMethod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(paymentMethod: PaymentMethod): Observable<EntityResponseType> {
        const copy = this.convert(paymentMethod);
        return this.http.put<PaymentMethod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentMethod>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentMethod[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentMethod[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentMethod[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PaymentMethod[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentMethod[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentMethod[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentMethod = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentMethod[]>): HttpResponse<PaymentMethod[]> {
        const jsonResponse: PaymentMethod[] = res.body;
        const body: PaymentMethod[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentMethod.
     */
    private convertItemFromServer(paymentMethod: PaymentMethod): PaymentMethod {
        const copy: PaymentMethod = Object.assign({}, paymentMethod);
        return copy;
    }

    /**
     * Convert a PaymentMethod to a JSON which can be sent to the server.
     */
    private convert(paymentMethod: PaymentMethod): PaymentMethod {
        const copy: PaymentMethod = Object.assign({}, paymentMethod);
        return copy;
    }
}
