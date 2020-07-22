import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { Location } from '@angular/common';
import * as mockData from '../services/mock-db.json';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public loading = true;

  public piechart1Data = [];

  public piechart2Data = [];

  public barchart1Data = [];

  constructor(private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.apiService.getOppByStatus({}).subscribe(
      response => {
        this.piechart1Data = response;
        this.loading = false;
      },
      error => {
        this.piechart1Data = mockData.status;
        this.loading = false;
      }
    );
  }

  public onChart1Event(event: any): void {
    this.apiService.getOppTypesByStatus({}).subscribe(
      response => {
        this.piechart2Data = response;
      },
      error => this.piechart2Data = mockData.type
    );

    this.apiService.getOppCountsByConsumer({}).subscribe(
      response => {
        this.barchart1Data = response;
      },
      error => this.barchart1Data = mockData.consumer
    );
  }

  public onFilterValueChange(event: any): void {
    if (event) {
      console.log(event);
      // const saved = this.piechart1Data;
      // this.piechart1Data = [];
      this.piechart1Data[0]['count'] = 442514;
      this.piechart1Data = Object.assign([], this.piechart1Data);
    }
  }

  public goBack(): void {
    this.location.back();
  }

}
