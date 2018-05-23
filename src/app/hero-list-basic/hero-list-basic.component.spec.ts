import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListBasicComponent } from './hero-list-basic.component';

describe('HeroListBasicComponent', () => {
  let component: HeroListBasicComponent;
  let fixture: ComponentFixture<HeroListBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroListBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
