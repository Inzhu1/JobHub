import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerApplications } from './seeker-applications';

describe('SeekerApplications', () => {
  let component: SeekerApplications;
  let fixture: ComponentFixture<SeekerApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerApplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
