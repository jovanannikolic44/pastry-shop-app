import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBasketComponent } from './show-basket.component';

describe('ShowBasketComponent', () => {
  let component: ShowBasketComponent;
  let fixture: ComponentFixture<ShowBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowBasketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
