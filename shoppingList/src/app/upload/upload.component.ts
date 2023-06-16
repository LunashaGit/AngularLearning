import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from './upload.service';
import { Subscription } from 'rxjs';
import { Upload } from './upload.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  images: Upload[] = [];
  private subscription!: Subscription;
  constructor(private uploadService: UploadService) {}

  ngOnInit() {
    this.subscription = this.uploadService
      .getAllImages()
      .subscribe((data: Upload[]) => {
        this.images = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
