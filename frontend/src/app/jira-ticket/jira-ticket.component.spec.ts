import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraTicketComponent } from './jira-ticket.component';

describe('JiraTicketComponent', () => {
  let component: JiraTicketComponent;
  let fixture: ComponentFixture<JiraTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JiraTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiraTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
