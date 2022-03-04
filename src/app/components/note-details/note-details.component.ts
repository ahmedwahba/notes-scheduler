import { take } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Note, NoteModalData, NoteLabel } from 'src/app/models/notes.model';
import { DateParserService } from 'src/app/services/date-parser.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  noteLabels: NoteLabel[];
  closeModal: boolean;
  isEditingMode: boolean;
  startDate: Date;
  editFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NoteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: NoteModalData,
    private fb: FormBuilder,
    private dateParser: DateParserService,
    public notesService: NotesService,
  ) { }

  ngOnInit() {
    this.note = this.modalData.note;
    if (this.modalData.categories) {
      this.noteLabels = this.modalData.categories.filter(
        (category) => this.note.labels.indexOf(category.id) !== -1
      );
    }
    if (this.note) {
      this.startDate = new Date(this.note.startDate * 1000);
    }
    this.editFormGroup = this.createEditForm();
  }

  createEditForm(): FormGroup {
    return this.fb.group({
      summary: [
        this.note ? this.note.summary : '',
        [Validators.required, Validators.maxLength(250)],
      ],
      startDate: [this.startDate || '', [Validators.required]],
      duration: [
        this.note && this.note.duration ? this.note.duration : 0,
        [Validators.required, Validators.pattern(/\d/)],
      ],
    });
  }

  onCancelEditClick(e: Event): void {
    e.preventDefault();
    this.closeModal = true;
    this.isEditingMode = false;
  }

  onEditClick(e: Event): void {
    e.preventDefault();
    this.closeModal = false;
    this.isEditingMode = true;
  }

  onSaveClick(): void {
    this.isEditingMode = false;
    this.note.summary = this.editFormGroup.value.summary;
    this.note.startDate = this.dateParser.formatDateInSeconds(
      this.editFormGroup.value.startDate
    );
    this.note.endDate = this.dateParser.formatDateInSeconds(
      this.dateParser.getEndDate(
        this.editFormGroup.value.startDate,
        this.editFormGroup.value.duration
      )
    );
    this.note.duration = this.editFormGroup.value.duration;
    this.startDate =  this.editFormGroup.value.startDate;
    this.notesService
      .editNote(this.note)
      .pipe(take(1))
      .subscribe((res) => {
        this.notesService.updateNotes(this.note);
        this.dialogRef.close();
      });
  }
}
