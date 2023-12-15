import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannerService } from '../../../services/banner.service';
import {JobService} from "../../../services/job.service";

@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.scss'
})
export class AddBannerComponent implements OnInit {
  bannerForm!: FormGroup;
  bannerSelected?: File;
  imageTemp?: string;

  loading: boolean = false;
  errorMessage?: string;
  successMessage?: string;

  constructor(private fb: FormBuilder,
              private bannerService: BannerService,
              private jobService: JobService) { }

  ngOnInit(): void {

    this.bannerForm = this.fb.group({
      link: ['', Validators.required],
      image: [null, Validators.required]
    })

  }

  get link() { return this.bannerForm.get('link'); }
  get image() { return this.bannerForm.get('image')?.value; }

  onSelectBanner(event: any) {
    this.bannerSelected = event.target.files[0];
    if (this.bannerSelected) {
      this.imageTemp = URL.createObjectURL(this.bannerSelected);
    }

  }

  onSubmit(): void {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    if (this.bannerForm.valid && this.bannerSelected) {
      this.loading = true;
      this.bannerService.postBanner(this.bannerSelected, this.link?.value).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Created successfully!'
        },
        error: (err) => {
          console.log(err);
          this.loading = false
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.errorMessage = 'Invalid data.'
    }
  }

}
