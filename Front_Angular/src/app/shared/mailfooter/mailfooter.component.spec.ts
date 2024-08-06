import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailfooterComponent } from './mailfooter.component';

describe('MailfooterComponent', () => {
  let component: MailfooterComponent;
  let fixture: ComponentFixture<MailfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
