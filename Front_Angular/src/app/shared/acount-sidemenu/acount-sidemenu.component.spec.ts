import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountSidemenuComponent } from './acount-sidemenu.component';

describe('AcountSidemenuComponent', () => {
  let component: AcountSidemenuComponent;
  let fixture: ComponentFixture<AcountSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcountSidemenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
