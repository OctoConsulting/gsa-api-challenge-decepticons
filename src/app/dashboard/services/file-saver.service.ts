import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor(private httpClient: HttpClient) { }

  saveAsCSV(headers: any, data: any): void {
    console.log(data);
    const csv = data.map(row => [row.key, row.count]).map(row => row.join(','));
    csv.unshift(headers.join(','));
    const csvArray = csv.join('\r\n');
    console.log(csvArray);
    const blob = new Blob([csvArray], {type: 'text/csv'});

    saveAs(blob, 'testFile.csv');
  }
}
