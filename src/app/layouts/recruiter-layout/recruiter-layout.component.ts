import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecruiterHeaderComponent } from '../../components/recruiter-header/recruiter-header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-recruiter-layout',
  standalone: true,
  imports: [RouterOutlet, RecruiterHeaderComponent, FooterComponent],
  templateUrl: './recruiter-layout.component.html',
  styleUrl: './recruiter-layout.component.scss'
})
export class RecruiterLayoutComponent {

}
