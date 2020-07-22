import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public geochartData = [];
  public loading = true;
  constructor(private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.apiService.getOppCountsByGeoData({}).subscribe(
      response => {
        this.geochartData = response;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  public geochartClicked(event: any): void {
    console.log('State clicked: ' + event.key);
  }

  public goBack(): void {
    this.location.back();
  }

}
