import {Component, OnInit} from '@angular/core';
import {Banner} from "../../../interfaces/banner";
import {BannerService} from "../../../services/banner.service";
import {JobFieldService} from "../../../services/job-field.service";
import {JobField} from "../../../interfaces/job_field";

@Component({
  selector: 'app-admin-job-field-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-job-field-list.component.html',
  styleUrl: './admin-job-field-list.component.scss'
})
export class AdminJobFieldListComponent implements OnInit{

  jobFieldList?: JobField[];
  jobFieldTotal?: number;

  constructor(private jobFieldService: JobFieldService) { }

  ngOnInit(): void {
    this.loadBanner();
  }

  deleteBanner(id: number | undefined): void {
    if (id) {
      this.jobFieldService.deleteJobField(id).subscribe({
        next: (response) => {
          this.loadBanner();
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private loadBanner(): void {
    this.jobFieldService.getJobFieldAll().subscribe({
      next: (response) => {
        this.jobFieldList = response.data;
        this.jobFieldTotal = this.jobFieldList?.length;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
