import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterListJobComponent } from './recruiter-list-job.component';

describe('RecruiterListJobComponent', () => {
  let component: RecruiterListJobComponent;
  let fixture: ComponentFixture<RecruiterListJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterListJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterListJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
