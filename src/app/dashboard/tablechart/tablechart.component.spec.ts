import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablechartComponent } from './tablechart.component';

describe('TablechartComponent', () => {
  let component: TablechartComponent;
  let fixture: ComponentFixture<TablechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
