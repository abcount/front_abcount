import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tap1OptionalComponent } from './tap1-optional.component';

describe('Tap1OptionalComponent', () => {
  let component: Tap1OptionalComponent;
  let fixture: ComponentFixture<Tap1OptionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tap1OptionalComponent]
    });
    fixture = TestBed.createComponent(Tap1OptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
