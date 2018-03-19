import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReportType } from './report-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReportType>;

@Injectable()
export class ReportTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/report-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/report-types';

    constructor(private http: HttpClient) { }

    create(reportType: ReportType): Observable<EntityResponseType> {
        const copy = this.convert(reportType);
        return this.http.post<ReportType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reportType: ReportType): Observable<EntityResponseType> {
        const copy = this.convert(reportType);
        return this.http.put<ReportType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReportType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReportType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReportType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReportType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ReportType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReportType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReportType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReportType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReportType[]>): HttpResponse<ReportType[]> {
        const jsonResponse: ReportType[] = res.body;
        const body: ReportType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReportType.
     */
    private convertItemFromServer(reportType: ReportType): ReportType {
        const copy: ReportType = Object.assign({}, reportType);
        return copy;
    }

    /**
     * Convert a ReportType to a JSON which can be sent to the server.
     */
    private convert(reportType: ReportType): ReportType {
        const copy: ReportType = Object.assign({}, reportType);
        return copy;
    }
}
