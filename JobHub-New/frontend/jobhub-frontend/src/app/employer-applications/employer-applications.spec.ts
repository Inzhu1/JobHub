import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplications } from './employer-applications';

describe('EmployerApplications', () => {
  let component: EmployerApplications;
  let fixture: ComponentFixture<EmployerApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerApplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
