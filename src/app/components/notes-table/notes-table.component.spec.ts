import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatGridListModule,
  MatToolbarModule,
  MatSelectModule,
  MatDialogModule,
  MatTooltipModule,
} from '@angular/material';
import { NotesTableComponent } from './notes-table.component';
import { NotesStackGridComponent } from '../notes-stack-grid/notes-stack-grid.component';
import { Note } from 'src/app/models/notes.model';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NotesTableComponent', () => {
  let component: NotesTableComponent;
  let fixture: ComponentFixture<NotesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotesTableComponent,
        NotesStackGridComponent,
      ],
      imports: [
        MatGridListModule,
        MatTooltipModule,
        MatDialogModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        HttpClientModule,
        BrowserAnimationsModule,
       ],
       providers: [
        {
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get(): Note[] {
                          return [];
                      },
                  },
              },
          },
        },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
