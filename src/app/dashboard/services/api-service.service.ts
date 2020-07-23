import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://ec2-34-205-247-199.compute-1.amazonaws.com:8080/opps/v1';
  private readonly apiKey = 'zAdl8SNdzc1Y06aCX6JN1nXIqT060ejvG0LJbDKK';

  constructor(private httpClient: HttpClient) { }

  getOppByStatus(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bystatus`, {params: queryParams});
  }

  getOppTypesByStatus(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/type`, {params: queryParams});
  }

  getOppCountsByConsumer(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/byvolume`, {params: queryParams});
  }

  getOppCountsByGeoData(queryParams: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bypopstate`, {params: queryParams});
  }
}
