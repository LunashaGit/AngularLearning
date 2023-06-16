import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from '../upload.service';
import { Upload } from '../upload.model';
@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css'],
})
export class UploadPostComponent implements OnInit {
  @ViewChild('f') uploadForm!: NgForm;
  file!: File;

  constructor(private uploadService: UploadService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onAddUpload(form: NgForm) {
    this.uploadService.addUpload(this.file);
  }
}
