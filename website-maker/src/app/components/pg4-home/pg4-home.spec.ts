import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pg4Home } from './pg4-home';

describe('Pg4Home', () => {
  let component: Pg4Home;
  let fixture: ComponentFixture<Pg4Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pg4Home]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pg4Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
