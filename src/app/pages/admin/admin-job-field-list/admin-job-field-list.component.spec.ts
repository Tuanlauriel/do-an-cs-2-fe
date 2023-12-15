import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobFieldListComponent } from './admin-job-field-list.component';

describe('AdminJobFieldListComponent', () => {
  let component: AdminJobFieldListComponent;
  let fixture: ComponentFixture<AdminJobFieldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJobFieldListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminJobFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
