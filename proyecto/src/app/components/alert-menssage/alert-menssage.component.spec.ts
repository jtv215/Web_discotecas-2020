import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMenssageComponent } from './alert-menssage.component';

describe('AlertMenssageComponent', () => {
  let component: AlertMenssageComponent;
  let fixture: ComponentFixture<AlertMenssageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMenssageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
