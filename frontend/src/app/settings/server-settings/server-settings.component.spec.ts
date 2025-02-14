import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSettingsComponent } from './server-settings.component';

describe('ServerSettingsComponent', () => {
  let component: ServerSettingsComponent;
  let fixture: ComponentFixture<ServerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
