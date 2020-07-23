import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor(private httpClient: HttpClient) { }

  saveAsCSV(data: any): void {
    const header = Object.keys(data[0]);
    const replacer = (key, value) => value === null ? '' : value;
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));

    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv'});

    saveAs(blob, 'exported_Analytics.csv');
  }
}
