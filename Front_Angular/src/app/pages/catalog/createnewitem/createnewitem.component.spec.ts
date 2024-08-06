import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewitemComponent } from './createnewitem.component';

describe('CreatenewitemComponent', () => {
  let component: CreatenewitemComponent;
  let fixture: ComponentFixture<CreatenewitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
