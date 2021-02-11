import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarterieComponent } from './carterie.component';

describe('CarterieComponent', () => {
  let component: CarterieComponent;
  let fixture: ComponentFixture<CarterieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarterieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
