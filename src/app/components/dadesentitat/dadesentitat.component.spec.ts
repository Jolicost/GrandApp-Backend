import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadesentitatComponent } from './dadesentitat.component';

describe('DadesentitatComponent', () => {
  let component: DadesentitatComponent;
  let fixture: ComponentFixture<DadesentitatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadesentitatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadesentitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
