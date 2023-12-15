import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Company } from '../../../interfaces/company';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-company-recruiter',
  standalone: true,
  imports: [],
  templateUrl: './company-recruiter.component.html',
  styleUrl: './company-recruiter.component.scss'
})
export class CompanyRecruiterComponent implements OnInit {
  company?: Company;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.company = this.userService.getUser()?.company;
  }

}
