import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAccountDetilsComponent } from './print-account-detils.component';

describe('PrintAccountDetilsComponent', () => {
  let component: PrintAccountDetilsComponent;
  let fixture: ComponentFixture<PrintAccountDetilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAccountDetilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAccountDetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
