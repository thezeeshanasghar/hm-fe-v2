import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTransectionComponent } from './income-transection.component';

describe('IncomeTransectionComponent', () => {
  let component: IncomeTransectionComponent;
  let fixture: ComponentFixture<IncomeTransectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTransectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTransectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
