import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tablechart',
  templateUrl: './tablechart.component.html',
  styleUrls: ['./tablechart.component.scss']
})
export class TablechartComponent implements OnInit, OnChanges {
  @Input() chartTitle = '';
  @Input() chartHeader = '';
  @Input() tableHeaders = [];
  @Input() data;

  @Output() clickEvent = new EventEmitter<any>();

  public tablechartData = [];
  public displayedColumns = [];
  public tablechartOptions = {
    title: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.processData(this.data);
    this.tablechartOptions.title = this.chartTitle;
    this.displayedColumns = this.tableHeaders;
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
        key: this.tablechartData[idx][0],
        count: this.tablechartData[idx[1]]
      };
      this.clickEvent.emit(emittedObj);
    }
  }

  public getChartWidth(): string {
    return (0.4 * window.innerWidth) + '';
  }

  public getChartHeight(): string {
    return (0.3 * window.innerWidth) + '';
  }

  private processData(data: any): void {
    this.tablechartData = data;
  }

}
