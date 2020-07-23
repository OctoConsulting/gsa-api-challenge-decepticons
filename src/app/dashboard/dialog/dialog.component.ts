import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public piechart = false;
  public barchart = false;
  public geochart = false;

  public chartTitle = '';
  public chartId = '';

  public chartData = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.parseData(this.data);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  private parseData(data: any): void {
    if (data) {
      switch (data.type) {
        case 'piechart':
          this.piechart = true;
          this.chartId = 'p0';
          break;
        case 'barchart':
          this.barchart = true;
          this.chartId = 'b0';
          break;
        case 'geochart':
          this.geochart = true;
          break;
        default:
          break;
      }
      this.chartTitle = data.title;
      this.chartData = data.data;
    }
  }

}
