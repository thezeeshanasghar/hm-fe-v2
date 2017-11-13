import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTransectionComponent } from './expense-transection.component';

describe('ExpenseTransectionComponent', () => {
  let component: ExpenseTransectionComponent;
  let fixture: ComponentFixture<ExpenseTransectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTransectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTransectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
