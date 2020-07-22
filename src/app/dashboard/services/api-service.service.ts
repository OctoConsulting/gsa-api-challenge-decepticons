import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://127.0.0.1:3000';
  private readonly apiKey = 'zAdl8SNdzc1Y06aCX6JN1nXIqT060ejvG0LJbDKK';

  constructor(private httpClient: HttpClient) { }

  getOppByStatus(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/status`, {params: queryParams});
  }

  getOppTypesByStatus(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/type`, {params: queryParams});
  }

  getOppCountsByConsumer(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/consumer`, {params: queryParams});
  }

  getOppCountsByGeoData(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/map`, {params: queryParams});
  }
}
