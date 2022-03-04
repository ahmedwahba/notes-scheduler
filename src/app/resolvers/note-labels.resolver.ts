import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from './../services/notes.service';
import { NoteLabel } from './../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NoteLabelsResolver implements Resolve<NoteLabel[]> {
  constructor(public notesService: NotesService) {
  }

  resolve(): Observable<NoteLabel[]> {
    return this.notesService.getNoteLabels();
  }
}
