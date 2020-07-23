import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { FileSaverService } from '../services/file-saver.service';
import * as mockData from '../services/mock-db.json';
import * as moment from 'moment';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading = true;

  public orgList = [];

  public piechart1Data = [];
  public piechart2Data = [];

  public barchart1Data = [];
  public barchart2Data = [];
  public barchart3Data = [];
  public barchart4Data = [];

  public geochartData = [];

  public setDate = {};

  public filterOptions = {};

  private fetchDataSub = new Subject();

  constructor(private apiService: ApiService, private fileService: FileSaverService, public dialog: MatDialog) {
    this.fetchDataSub.pipe(
      tap(() => this.loading = true),
      debounceTime(100)
    ).subscribe(filterOptions => this.fetchAllData(filterOptions));
  }

  ngOnInit(): void {
    this.initDateRange();
    this.loadOrgDropdown();
  }

  private initDateRange(): void {
    console.log(moment());
    const todaysDate = moment().toISOString();
    console.log(todaysDate);
    const last1Year = moment().subtract(1, 'years').toISOString();
    this.setDate = {
      startDate: last1Year,
      endDate: todaysDate
    };
  }

  private loadOrgDropdown(): void {
    const queryParams = {
      level: 1
    };
    this.apiService.getOrgList(queryParams).subscribe(
      response => this.orgList = response,
      error => this.orgList = mockData.getorgs
    );
  }

  private fetchAllData(filterOptions = {}): void {
    forkJoin([
      this.fetchStatusData(filterOptions),
      this.fetchTypeData(filterOptions),
      this.fetchConsumerData(filterOptions),
      this.fetchByNAICSCode(filterOptions),
      this.fetchBySetAsideCode(filterOptions),
      this.fetchByClassificationCode(filterOptions),
      this.fetchGeoChartData(filterOptions)])
      .subscribe(
        responses => {
          this.piechart1Data = responses[0];
          this.piechart2Data = responses[1];
          this.barchart1Data = responses[2];
          this.barchart2Data = responses[3];
          this.barchart3Data = responses[4];
          this.barchart4Data = responses[5];
          this.geochartData = responses[6];
          this.loading = false;
        },
        error => console.log(error)
      );
  }

  private fetchStatusData(queryParams = {}): Observable<any> {
    return this.apiService.getOppByStatus(queryParams);
  }

  private fetchTypeData(queryParams = {}): Observable<any> {
    return this.apiService.getOppTypesByStatus(queryParams);
  }

  private fetchConsumerData(queryParams = {}): Observable<any> {
    return this.apiService.getOppCountsByConsumer(queryParams);
  }

  private fetchByNAICSCode(queryParams = {}): Observable<any> {
    return this.apiService.getOppCountsByNAICSCode(queryParams);
  }

  private fetchBySetAsideCode(queryParams = {}): Observable<any> {
    return this.apiService.getOppCountsBySetAsideCode(queryParams);
  }

  private fetchByClassificationCode(queryParams = {}): Observable<any> {
    return this.apiService.getOppCountsByClassificationCode(queryParams);
  }

  private fetchGeoChartData(queryParams = {}): Observable<any> {
    return this.apiService.getOppCountsByGeoData(queryParams);
  }

  public onChartClick(chartName: string, event: any): void {
    if (chartName === 'piechart1') {
      console.log(event);
      this.onFilterValueChange({status: event.key});
    }
  }

  public onViewDetails(type: string, title: string, data: any): void {
    const modalRef = this.dialog.open(DialogComponent, {
      height: (0.5 * window.innerHeight) + 'px',
      width: (0.8 * window.innerWidth) + 'px',
      data: {type, title, data}
    });
  }

  public onFilterValueChange(event: any): void {
    Object.keys(event).forEach(key => (event[key] == null) && delete event[key]);
    this.filterOptions = {...this.filterOptions, ...event};
    this.fetchDataSub.next(this.filterOptions);
  }

  public exportData($event: any): void {
    // TO DO
  }

}
