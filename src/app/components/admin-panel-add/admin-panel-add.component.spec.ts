import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelAddComponent } from './admin-panel-add.component';

describe('AdminPanelAddComponent', () => {
  let component: AdminPanelAddComponent;
  let fixture: ComponentFixture<AdminPanelAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelAddComponent]
    });
    fixture = TestBed.createComponent(AdminPanelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
