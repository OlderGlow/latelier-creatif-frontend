import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TricotComponent } from './tricot.component';

describe('TricotComponent', () => {
  let component: TricotComponent;
  let fixture: ComponentFixture<TricotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TricotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TricotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
