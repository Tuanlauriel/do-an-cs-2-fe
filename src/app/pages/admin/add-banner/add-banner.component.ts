import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BannerService } from '../../../services/banner.service';

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

  constructor(private fb: FormBuilder, private bannerService: BannerService) { }

  ngOnInit(): void {

    this.bannerForm = this.fb.group({
      link: ['', Validators.required],
      image: [null, Validators.required]
    })

  }

  get link() { return this.bannerForm.get('link'); }

  onSelectBanner(event: any) {
    this.bannerSelected = event.target.files[0];
  }

  onSubmit(): void {
    if (this.bannerForm.valid && this.bannerSelected) {
      this.bannerService.postBanner(this.bannerSelected, this.link?.value).subscribe({
        next: (response) => {

        },
        error: (err) => {

        },
        complete: () => {
          
        }
      })
    }
  }

}
