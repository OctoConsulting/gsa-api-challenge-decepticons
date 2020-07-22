import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FileSaverService } from '../services/file-saver.service';

@Component({
  selector: 'app-main-stepper',
  templateUrl: './main-stepper.component.html',
  styleUrls: ['./main-stepper.component.scss']
})
export class MainStepperComponent implements OnInit, AfterViewInit {
  @Input() piechart1Data;
  @Input() piechart2Data;
  @Input() barchart1Data;

  @Output() chart1Event = new EventEmitter();

  @ViewChild('stepper') stepper: MatStepper;
  constructor(public fileSaverService: FileSaverService) { }

  ngOnInit(): void {
    // this.stepper.selectedIndex = 1;
  }

  ngAfterViewInit(): void {
    // this.stepper.selectedIndex = 1;
  }

  public onChart1Click(event: any): void {
    this.chart1Event.emit(event);
    this.stepper.next();
  }

  public exportData(headers: any, data: any): void {
    this.fileSaverService.saveAsCSV(headers, data);
  }

}
