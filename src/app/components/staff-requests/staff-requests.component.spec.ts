import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRequestsComponent } from './staff-requests.component';

describe('StaffRequestsComponent', () => {
  let component: StaffRequestsComponent;
  let fixture: ComponentFixture<StaffRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
