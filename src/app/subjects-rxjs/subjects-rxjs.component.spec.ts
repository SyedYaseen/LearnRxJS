import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsRxjsComponent } from './subjects-rxjs.component';

describe('SubjectsRxjsComponent', () => {
  let component: SubjectsRxjsComponent;
  let fixture: ComponentFixture<SubjectsRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsRxjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
