import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.scss'
})
export class JobCreateComponent {

}
