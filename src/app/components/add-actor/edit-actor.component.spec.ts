import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActorComponent } from './edit-actor.component';

describe('AddActorComponent', () => {
  let component: EditActorComponent;
  let fixture: ComponentFixture<EditActorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditActorComponent]
    });
    fixture = TestBed.createComponent(EditActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
