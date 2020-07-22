import { Component, OnInit, Input } from '@angular/core';
import { FileSaverService } from '../services/file-saver.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {

  constructor(private fileService: FileSaverService) {}

  ngOnInit(): void {
  }
  
  download(dataUrl : string) {
    this.fileService.getData(dataUrl).subscribe(response => {
      let blob:any = new Blob([response.body], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
      window.location.href = response.url;
      this.fileService.saveAsCSV(response.headers, blob)
    }), error => console.log('Error downloading the file'),
                  () => console.info('File downloaded successfully');
  }

}
