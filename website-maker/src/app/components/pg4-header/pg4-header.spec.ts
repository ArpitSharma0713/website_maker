import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pg4Header } from './pg4-header';

describe('Pg4Header', () => {
  let component: Pg4Header;
  let fixture: ComponentFixture<Pg4Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pg4Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pg4Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
