import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRecruiterComponent } from './company-recruiter.component';

describe('CompanyRecruiterComponent', () => {
  let component: CompanyRecruiterComponent;
  let fixture: ComponentFixture<CompanyRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyRecruiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
