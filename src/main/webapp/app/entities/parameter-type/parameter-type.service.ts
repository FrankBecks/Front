import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ParameterType } from './parameter-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ParameterType>;

@Injectable()
export class ParameterTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/parameter-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/parameter-types';

    constructor(private http: HttpClient) { }

    create(parameterType: ParameterType): Observable<EntityResponseType> {
        const copy = this.convert(parameterType);
        return this.http.post<ParameterType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parameterType: ParameterType): Observable<EntityResponseType> {
        const copy = this.convert(parameterType);
        return this.http.put<ParameterType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ParameterType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ParameterType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParameterType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParameterType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ParameterType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParameterType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParameterType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ParameterType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ParameterType[]>): HttpResponse<ParameterType[]> {
        const jsonResponse: ParameterType[] = res.body;
        const body: ParameterType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ParameterType.
     */
    private convertItemFromServer(parameterType: ParameterType): ParameterType {
        const copy: ParameterType = Object.assign({}, parameterType);
        return copy;
    }

    /**
     * Convert a ParameterType to a JSON which can be sent to the server.
     */
    private convert(parameterType: ParameterType): ParameterType {
        const copy: ParameterType = Object.assign({}, parameterType);
        return copy;
    }
}
