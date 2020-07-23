import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { Location } from '@angular/common';
import * as mockData from '../services/mock-db.json';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public loading = false;

  public piechart1Data = [];

  public piechart2Data = [];

  public barchart1Data = [];

  public setDate = {};

  private fetchDataSub = new Subject();

  constructor(private apiService: ApiService, private location: Location) {
    this.fetchDataSub.pipe(
      debounceTime(300)
    ).subscribe(filterOptions => this.fetchData(filterOptions));
  }

  ngOnInit(): void {
    this.initDateRange();
  }

  private initDateRange(): void {
    console.log(moment());
    const todaysDate = moment().toISOString();
    console.log(todaysDate);
    const last30Days = moment().subtract(30, 'days').toISOString();
    this.setDate = {
      startDate: last30Days,
      endDate: todaysDate
    };
  }

  private fetchData(queryParams = {}): void {
    this.apiService.getOppByStatus(queryParams).subscribe(
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
    let filterOptions = {};
    if (event.startDate) {
      filterOptions['startDate'] = moment(event.startDate).format('YYYY-MM-DD').toString();
    }
    if (event.endDate) {
      filterOptions['endDate'] = moment(event.endDate).format('YYYY-MM-DD').toString();
    }
    if (event.org) {
      filterOptions['org'] = event.org;
    }

    this.fetchDataSub.next(filterOptions);
  }

  public goBack(): void {
    this.location.back();
  }

}
