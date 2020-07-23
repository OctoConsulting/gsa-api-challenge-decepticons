import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';


@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, OnChanges {
  @Input() chartTitle = '';
  @Input() chartHeader = '';
  @Input() data;

  @Output() clickEvent = new EventEmitter<any>();

  public piechartData = [];
  public piechartOptions = {
    legend: {
      position: 'none'
    },
    pieSliceText: 'percentage',
    title: ''
  };
  constructor() { }

  ngOnInit(): void {
    this.processData(this.data);
    this.piechartOptions.title = this.chartTitle;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.processData(changes.data.currentValue);
    }
  }

  public onClick(event: any): void {
    if (event && event.selection && event.selection[0]) {
      const idx = event.selection[0].row;
      console.log(this.piechartData);
      const emittedObj = {
        key: this.piechartData[idx][0],
        count: this.piechartData[idx][1]
      };
      this.clickEvent.emit(emittedObj);
    }
  }

  public getChartWidth(): string {
    return (1 * document.getElementById('pie-chart-wrapper').clientWidth) + '';
  }

  private processData(data: any): void {
    if (data && data.length > 0) {
      this.piechartData = data.map( item => [item.key, +item.count]);
    }
  }

}
