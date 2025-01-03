import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationSettingsComponent } from './classification-settings.component';

describe('ClassificationSettingsComponent', () => {
  let component: ClassificationSettingsComponent;
  let fixture: ComponentFixture<ClassificationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
