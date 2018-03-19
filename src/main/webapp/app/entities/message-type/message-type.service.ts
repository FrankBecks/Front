import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MessageType } from './message-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MessageType>;

@Injectable()
export class MessageTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/message-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/message-types';

    constructor(private http: HttpClient) { }

    create(messageType: MessageType): Observable<EntityResponseType> {
        const copy = this.convert(messageType);
        return this.http.post<MessageType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(messageType: MessageType): Observable<EntityResponseType> {
        const copy = this.convert(messageType);
        return this.http.put<MessageType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MessageType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MessageType[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MessageType[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MessageType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MessageType[]>): HttpResponse<MessageType[]> {
        const jsonResponse: MessageType[] = res.body;
        const body: MessageType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MessageType.
     */
    private convertItemFromServer(messageType: MessageType): MessageType {
        const copy: MessageType = Object.assign({}, messageType);
        return copy;
    }

    /**
     * Convert a MessageType to a JSON which can be sent to the server.
     */
    private convert(messageType: MessageType): MessageType {
        const copy: MessageType = Object.assign({}, messageType);
        return copy;
    }
}
