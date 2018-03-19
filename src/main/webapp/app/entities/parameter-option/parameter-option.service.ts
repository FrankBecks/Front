import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ParameterOption } from './parameter-option.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ParameterOption>;

@Injectable()
export class ParameterOptionService {

    private resourceUrl =  SERVER_API_URL + 'api/parameter-options';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/parameter-options';

    constructor(private http: HttpClient) { }

    create(parameterOption: ParameterOption): Observable<EntityResponseType> {
        const copy = this.convert(parameterOption);
        return this.http.post<ParameterOption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parameterOption: ParameterOption): Observable<EntityResponseType> {
        const copy = this.convert(parameterOption);
        return this.http.put<ParameterOption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ParameterOption>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ParameterOption[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParameterOption[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParameterOption[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ParameterOption[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParameterOption[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParameterOption[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ParameterOption = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ParameterOption[]>): HttpResponse<ParameterOption[]> {
        const jsonResponse: ParameterOption[] = res.body;
        const body: ParameterOption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ParameterOption.
     */
    private convertItemFromServer(parameterOption: ParameterOption): ParameterOption {
        const copy: ParameterOption = Object.assign({}, parameterOption);
        return copy;
    }

    /**
     * Convert a ParameterOption to a JSON which can be sent to the server.
     */
    private convert(parameterOption: ParameterOption): ParameterOption {
        const copy: ParameterOption = Object.assign({}, parameterOption);
        return copy;
    }
}
