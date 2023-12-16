import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JobFieldService} from "../../../services/job-field.service";
import {JobField} from "../../../interfaces/job_field";

@Component({
  selector: 'app-admin-create-job-field',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-create-job-field.component.html',
  styleUrl: './admin-create-job-field.component.scss'
})
export class AdminCreateJobFieldComponent implements OnInit{
  formJobField!: FormGroup;

  errorMessage?: string;
  successMessage?: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private jobFieldService: JobFieldService) {
  }

  ngOnInit(): void {
    this.formJobField = this.fb.group({
      name: ['', Validators.required]
    })
  }

  onSubmit() {
    this.errorMessage = undefined;
    this.successMessage = undefined;

    if (this.formJobField?.valid) {
      this.loading = true;
      const jobField = this.formJobField.value as JobField;
      this.jobFieldService.postJobField(jobField).subscribe({
        next: (response) => {
          this.successMessage = 'Created Job Field successfully.';
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.errorMessage = 'Invalid is required.'
    }
  }
}
