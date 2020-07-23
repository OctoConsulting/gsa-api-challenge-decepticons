import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-geochart',
  templateUrl: './geochart.component.html',
  styleUrls: ['./geochart.component.scss']
})
export class GeochartComponent implements OnInit, OnChanges {
  @Input() chartTitle = '';
  @Input() data;

  @Output() clickEvent = new EventEmitter<any>();


  public geochartData = [];

  public geoChartOptions = {
    region: 'US',
    displayMode: 'regions',
    resolution: 'provinces'
  };

  constructor() { }

  ngOnInit(): void {
    this.processData(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.processData(changes.data.currentValue);
    }
  }

  public onClick(event: any): void {
    if (event && event.selection && event.selection[0]) {
      const idx = event.selection[0].row;
      const emittedObj = {
        key: this.geochartData[idx][0],
        count: this.geochartData[idx[1]]
      };
      this.clickEvent.emit(emittedObj);
    }
  }

  public getChartWidth(): string {
    return (1 * document.getElementById('geochart-container').clientWidth) + '';
  }


  private processData(data: any): void {
    if (data && data.length > 0) {
      this.geochartData = data.filter(item => item.key).map( item => [item.key, {v: +item.count, f: `No. of Opps: ${item.count}`}]);
    }
  }

}
