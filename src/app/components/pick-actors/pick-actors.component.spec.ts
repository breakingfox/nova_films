import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickActorsComponent } from './pick-actors.component';

describe('PickActorsComponent', () => {
  let component: PickActorsComponent;
  let fixture: ComponentFixture<PickActorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickActorsComponent]
    });
    fixture = TestBed.createComponent(PickActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
