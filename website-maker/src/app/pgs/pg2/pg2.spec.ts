import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pg2 } from './pg2';

describe('Pg2', () => {
  let component: Pg2;
  let fixture: ComponentFixture<Pg2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pg2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pg2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
