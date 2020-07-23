import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, OnChanges {
  @Input() chartTitle = '';
  @Input() chartHeader = '';
  @Input() data;

  @Output() clickEvent = new EventEmitter();

  public barchartData = [];
  public barchartOptions = {
    legend: {
      position: 'none'
    },
    title: '',
    vAxis: {
      title: 'Opportunities posted'
    },
    hAxis: {
      textPosition: 'out',
      slantedText: true
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.processData(this.data);
    this.barchartOptions.title = this.chartTitle;
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
        key: this.barchartData[idx][0],
        count: this.barchartData[idx[1]]
      };
      this.clickEvent.emit(emittedObj);
    }
  }

  public getChartWidth(): string {
    return (1 * document.getElementById('barchart-wrapper').clientWidth) + '';
  }

  private processData(data: any): void {
    if (data && data.length > 0) {
      this.barchartData = data.map( item => [item.key, +item.count]);
    }
  }

}
