import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pg1 } from './pg1';

describe('Pg1', () => {
  let component: Pg1;
  let fixture: ComponentFixture<Pg1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pg1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pg1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
