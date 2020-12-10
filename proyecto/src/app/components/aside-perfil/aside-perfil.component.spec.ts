import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidePerfilComponent } from './aside-perfil.component';

describe('AsidePerfilComponent', () => {
  let component: AsidePerfilComponent;
  let fixture: ComponentFixture<AsidePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsidePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsidePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
