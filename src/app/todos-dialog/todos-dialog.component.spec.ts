import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosDialogComponent } from './todos-dialog.component';

describe('TodosDialogComponent', () => {
  let component: TodosDialogComponent;
  let fixture: ComponentFixture<TodosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
