import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-job-recruiter',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './job-recruiter.component.html',
  styleUrl: './job-recruiter.component.scss'
})
export class JobRecruiterComponent {

}
