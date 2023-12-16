import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateJobFieldComponent } from './admin-create-job-field.component';

describe('AdminCreateJobFieldComponent', () => {
  let component: AdminCreateJobFieldComponent;
  let fixture: ComponentFixture<AdminCreateJobFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateJobFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateJobFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
