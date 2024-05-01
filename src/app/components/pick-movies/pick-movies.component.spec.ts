import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickMoviesComponent } from './pick-movies.component';

describe('PickMoviesComponent', () => {
  let component: PickMoviesComponent;
  let fixture: ComponentFixture<PickMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickMoviesComponent]
    });
    fixture = TestBed.createComponent(PickMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
