import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pg3 } from './pg3';

describe('Pg3', () => {
  let component: Pg3;
  let fixture: ComponentFixture<Pg3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pg3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pg3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
