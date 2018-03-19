import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TestType } from './test-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TestType>;

@Injectable()
export class TestTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/test-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-types';

    constructor(private http: HttpClient) { }

    create(testType: TestType): Observable<EntityResponseType> {
        const copy = this.convert(testType);
        return this.http.post<TestType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(testType: TestType): Observable<EntityResponseType> {
        const copy = this.convert(testType);
        return this.http.put<TestType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TestType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TestType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TestType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TestType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TestType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TestType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TestType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TestType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TestType[]>): HttpResponse<TestType[]> {
        const jsonResponse: TestType[] = res.body;
        const body: TestType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TestType.
     */
    private convertItemFromServer(testType: TestType): TestType {
        const copy: TestType = Object.assign({}, testType);
        return copy;
    }

    /**
     * Convert a TestType to a JSON which can be sent to the server.
     */
    private convert(testType: TestType): TestType {
        const copy: TestType = Object.assign({}, testType);
        return copy;
    }
}
