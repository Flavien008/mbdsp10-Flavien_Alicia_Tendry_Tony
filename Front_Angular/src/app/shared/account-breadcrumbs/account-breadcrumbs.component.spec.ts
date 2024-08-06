import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBreadcrumbsComponent } from './account-breadcrumbs.component';

describe('AccountBreadcrumbsComponent', () => {
  let component: AccountBreadcrumbsComponent;
  let fixture: ComponentFixture<AccountBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBreadcrumbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
