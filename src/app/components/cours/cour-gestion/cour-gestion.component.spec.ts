import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourGestionComponent } from './cour-gestion.component';

describe('CourGestionComponent', () => {
  let component: CourGestionComponent;
  let fixture: ComponentFixture<CourGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
