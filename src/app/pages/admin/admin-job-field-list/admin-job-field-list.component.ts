import { Component } from '@angular/core';
import {Banner} from "../../../interfaces/banner";
import {BannerService} from "../../../services/banner.service";

@Component({
  selector: 'app-admin-job-field-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-job-field-list.component.html',
  styleUrl: './admin-job-field-list.component.scss'
})
export class AdminJobFieldListComponent {

  bannerList?: Banner[];
  bannerTotal?: number;
  bannerActive?: number;
  bannerDisabled?: number;

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.loadBanner();
  }

  updateBanner(banner: Banner, event: any): void {
    banner.status = event.target.checked;

    this.bannerService.putBanner(banner).subscribe({
      next: (response) => {
        this.loadBanner();
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteBanner(id: number | undefined): void {
    if (id) {
      this.bannerService.deleteBanner(id).subscribe({
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
    this.bannerService.getAllBanner().subscribe({
      next: (response) => {
        this.bannerList = response.data;
        this.bannerTotal = this.bannerList?.length;
        this.bannerActive = this.countBannersByStatus(true);
        this.bannerDisabled = this.countBannersByStatus(false);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private countBannersByStatus(status: boolean): number {
    // Sử dụng hàm filter để lọc danh sách banner theo status
    const filteredBanners = (this.bannerList || []).filter(banner => banner.status === status);

    // Sử dụng thuật toán reduce để tính tổng số lượng banner
    const count = filteredBanners.reduce((accumulator, currentBanner) => {
      return accumulator + 1;
    }, 0);

    return count;
  }
}
