import {Component, OnInit} from '@angular/core';
import {Banner} from "../../../interfaces/banner";
import {BannerService} from "../../../services/banner.service";
import {Job} from "../../../interfaces/job";
import {JobService} from "../../../services/job.service";
import {User} from "../../../interfaces/user";
import {UserService} from "../../../services/user.service";
import {response} from "express";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-recruiter-list-job',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './recruiter-list-job.component.html',
  styleUrl: './recruiter-list-job.component.scss'
})
export class RecruiterListJobComponent implements OnInit {
  jobList?: Job[];
  user?: User;
  jobTotal?: number;

  constructor(private jobService: JobService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loadJob();
  }

  deleteBanner(id: number | undefined): void {
    if (id) {
      this.jobService.deleteJob(id).subscribe({
        next: (response) => {
          this.loadJob();
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private loadJob(): void {
    const id = this.user?.id;
    if (id) {
      this.jobService.getAllJobByRecruiter(id).subscribe(response => {
        this.jobList = response.data;
        this.jobTotal = this.jobList?.length;
        console.log(this.jobList);
      })
    }
  }

}
