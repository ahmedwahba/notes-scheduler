import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatTooltipModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesStackGridComponent } from './notes-stack-grid.component';

describe('NotesStackGridComponent', () => {
  let component: NotesStackGridComponent;
  let fixture: ComponentFixture<NotesStackGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesStackGridComponent ],
      imports: [
       MatGridListModule,
       MatTooltipModule,
       MatDialogModule,
       MatSelectModule,
       MatInputModule,
       MatFormFieldModule,
       ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesStackGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
