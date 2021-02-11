import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconoelComponent } from './deconoel.component';

describe('DeconoelComponent', () => {
  let component: DeconoelComponent;
  let fixture: ComponentFixture<DeconoelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeconoelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconoelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
