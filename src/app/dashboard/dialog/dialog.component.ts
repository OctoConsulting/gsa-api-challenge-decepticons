import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api-service.service';
import { FileSaverService } from '../services/file-saver.service';

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
  public enableExport = false;

  constructor(
    private apiService: ApiService,
    private fileService: FileSaverService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.parseData(this.data);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onExportData(): void {
    const filterOptions = {...this.data.filterOptions, ...{export: 'yes'}};
    this.apiService[this.data.apiCall](filterOptions).subscribe(
      response => this.fileService.saveAsCSV(response)
    );
  }

  private parseData(data: any): void {
    console.log(data);
    if (data) {
      switch (data.chartType) {
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
      this.enableExport = data.apiCall !== '';
    }
  }

}
