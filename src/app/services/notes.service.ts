import { Note } from './../models/notes.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  @Output() updateNotesEvent = new EventEmitter<Note | number>();

  constructor(public httpClient: HttpClient) { }

  getNotes(): Observable<any> {
    return this.httpClient.get(environment.endpoint + 'notes');
  }

  getNoteLabels(): Observable<any> {
    return this.httpClient.get(environment.endpoint + 'noteLabels');
  }

  editNote(note: Note): Observable<any> {
    return this.httpClient.put(environment.endpoint + `notes/${note.id}`, note);
  }

  updateNotes(note: Note | number): void {
    this.updateNotesEvent.emit(note);
  }
}
