import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesTableComponent } from './components/notes-table/notes-table.component';
import { NotesResolver } from './resolvers/notes.resolver';
import { NoteLabelsResolver } from './resolvers/note-labels.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotesTableComponent,
    resolve: {
      notes: NotesResolver,
      categories: NoteLabelsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
