import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDetailedComponent } from './main-detailed.component';

describe('MainDetailedComponent', () => {
  let component: MainDetailedComponent;
  let fixture: ComponentFixture<MainDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
