import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPromotionsComponent } from './show-promotions.component';

describe('ShowPromotionsComponent', () => {
  let component: ShowPromotionsComponent;
  let fixture: ComponentFixture<ShowPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPromotionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
