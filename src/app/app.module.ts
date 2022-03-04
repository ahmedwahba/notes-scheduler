import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatTooltipModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesTableComponent } from './components/notes-table/notes-table.component';
import { NotesStackGridComponent } from './components/notes-stack-grid/notes-stack-grid.component';
import { NoteDetailsComponent } from './components/note-details/note-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesTableComponent,
    NotesStackGridComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [NoteDetailsComponent],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
