import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditEstablecimientoComponent } from './user-edit-establecimiento.component';

describe('UserEditEstablecimientoComponent', () => {
  let component: UserEditEstablecimientoComponent;
  let fixture: ComponentFixture<UserEditEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
