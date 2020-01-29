import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsYtmCalcComponent } from './bonds-ytm-calc.component';

describe('BondsYtmCalcComponent', () => {
  let component: BondsYtmCalcComponent;
  let fixture: ComponentFixture<BondsYtmCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BondsYtmCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BondsYtmCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
