import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusServerComponent } from './status-server.component';

describe('StatusServerComponent', () => {
  let component: StatusServerComponent;
  let fixture: ComponentFixture<StatusServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
