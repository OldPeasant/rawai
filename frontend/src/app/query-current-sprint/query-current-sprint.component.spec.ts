import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCurrentSprintComponent } from './query-current-sprint.component';

describe('QueryCurrentSprintComponent', () => {
  let component: QueryCurrentSprintComponent;
  let fixture: ComponentFixture<QueryCurrentSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryCurrentSprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryCurrentSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
