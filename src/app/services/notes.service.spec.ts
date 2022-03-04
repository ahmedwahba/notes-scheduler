import { take } from 'rxjs/operators';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));


  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });

  it('should be have a notes service & load notes', () => {
    const service: NotesService = TestBed.get(NotesService);
    let notes = [];
    service.getNotes().pipe(take(1)).subscribe(res => {
      notes = res.notes;
      expect(notes.length > 0).toBeTruthy();
    });
  });

  it('should be have a labels service & load labels', () => {
    const service: NotesService = TestBed.get(NotesService);
    let labels = [];
    service.getNoteLabels().pipe(take(1)).subscribe(res => {
      labels = res;
      expect(labels.length > 0).toBeTruthy();
    });
  });

});
