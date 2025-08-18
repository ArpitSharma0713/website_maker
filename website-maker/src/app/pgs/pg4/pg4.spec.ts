import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pg4 } from './pg4';

describe('Pg4', () => {
  let component: Pg4;
  let fixture: ComponentFixture<Pg4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pg4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pg4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
