import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { Location } from '@angular/common';
import * as mockData from '../services/mock-db.json';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public geochartData = [];
  public loading = true;
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
    const todaysDate = moment().format('YYYY-MM-DD').toString();
    const last30Days = moment().subtract(30, 'days').format('YYYY-MM-DD').toString();
    this.setDate = {
      startDate: last30Days,
      endDate: todaysDate
    };
  }

  private fetchData(queryParams = {}): void {
    this.apiService.getOppCountsByGeoData(queryParams).subscribe(
      response => {
        this.geochartData = response;
        this.loading = false;
      },
      error => {
        this.geochartData = mockData.map;
        this.loading = false;
      }
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

  public geochartClicked(event: any): void {
    console.log('State clicked: ' + event.key);
  }

  public goBack(): void {
    this.location.back();
  }

}
