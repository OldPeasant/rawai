import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenSettingsComponent } from './token-settings.component';

describe('TokenSettingsComponent', () => {
  let component: TokenSettingsComponent;
  let fixture: ComponentFixture<TokenSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
