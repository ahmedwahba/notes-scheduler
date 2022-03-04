import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from './../services/notes.service';
import { Note } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesResolver implements Resolve<Note[]> {
  constructor(public notesService: NotesService) {
  }

  resolve(): Observable<Note[]> {
    return this.notesService.getNotes().pipe(
      map(res => res.notes)
    );
  }
}
