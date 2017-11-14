import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoznamchaComponent } from './roznamcha.component';

describe('RoznamchaComponent', () => {
  let component: RoznamchaComponent;
  let fixture: ComponentFixture<RoznamchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoznamchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoznamchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
