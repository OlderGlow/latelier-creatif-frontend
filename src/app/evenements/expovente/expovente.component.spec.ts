import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpoventeComponent } from './expovente.component';

describe('ExpoventeComponent', () => {
  let component: ExpoventeComponent;
  let fixture: ComponentFixture<ExpoventeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpoventeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpoventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
