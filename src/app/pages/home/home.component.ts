import { Component, OnInit, inject, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Banner } from '../../interfaces/banner';
import { BannerService } from '../../services/banner.service';
import { response } from 'express';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  bannerList?: Banner[];

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.bannerService.getAllBanner().subscribe( response => this.bannerList = response.data);
  }

}
