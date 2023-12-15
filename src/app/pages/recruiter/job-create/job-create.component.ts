import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JobField} from "../../../interfaces/job_field";
import {JobFieldService} from "../../../services/job-field.service";
import {Job} from "../../../interfaces/job";
import {UserService} from "../../../services/user.service";
import {JobService} from "../../../services/job.service";
import {response} from "express";

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.scss'
})
export class JobCreateComponent implements OnInit {
  jobFieldList?: JobField[];
  formCreateJob!: FormGroup;

  errorMessage?: string;
  successMessage?: string;
  loading:boolean = false;

  constructor(private jobFieldService: JobFieldService,
              private fb: FormBuilder,
              private userService: UserService,
              private jobService: JobService) {
  }

  ngOnInit() {
    this.formCreateJob = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      offer: ['', Validators.required],
      requirement: ['', Validators.required],
      salary: [0, Validators.required],
      location: ['', Validators.required],
      jobField: ['Job Field']
    });
    this.jobFieldService.getJobFieldAll().subscribe(response => this.jobFieldList = response.data);
  }

  onSubmit(): void {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    if (this.formCreateJob.valid) {
      this.loading = true;
      const job: Job = this.formCreateJob.value as Job;
      job.email = this.userService.getUser()?.email;
      console.log(job);
      this.jobService.postJob(job).subscribe({
        next: (response) => {
          this.successMessage = 'Created Job Successfully.'
        },
        error: (err) => {
          this.errorMessage = 'Server Error.';
          this.loading = false
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.errorMessage = 'Invalid Information';
    }
  }

}
