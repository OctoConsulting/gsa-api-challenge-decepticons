import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://34.205.247.199:8080/opps/v1';

  // private readonly baseUrl = 'http://127.0.0.1:3000';

  constructor(private httpClient: HttpClient) { }

  getOppByStatus(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bystatus`, {params: queryParams});
  }

  getOppTypesByStatus(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/byopptype`, {params: queryParams});
  }

  getOppCountsByConsumer(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/byvolume`, {params: queryParams});
  }

  getOppCountsByNAICSCode(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bynaicscode`, {params: queryParams});
  }

  getOppCountsBySetAsideCode(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bysetasidecode`, {params: queryParams});
  }

  getOppCountsByClassificationCode(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/byclassificationcode`, {params: queryParams});
  }

  getOppCountsByGeoData(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bypopstate`, {params: queryParams});
  }
}
