import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Upload } from './upload.model';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return formData;
  }

  getAllImages() {
    return this.http.get<Upload[]>('api/image');
  }

  addUpload(upload: File) {
    this.http
      .post<File>('api/image', this.uploadFile(upload))
      .subscribe((data) => {});
  }
}
