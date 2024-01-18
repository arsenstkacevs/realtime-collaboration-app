import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  downloadFile(data: any, fileName: string): void {
    console.log(data); // Log the original data

    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(link.href);
  }
}
