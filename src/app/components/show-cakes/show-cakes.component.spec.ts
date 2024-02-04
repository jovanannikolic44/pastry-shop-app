import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCakesComponent } from './show-cakes.component';

describe('ShowCakesComponent', () => {
  let component: ShowCakesComponent;
  let fixture: ComponentFixture<ShowCakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCakesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
