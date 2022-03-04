import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateParserService } from 'src/app/services/date-parser.service';
import { NoteDetailsComponent } from './../note-details/note-details.component';
import { Note, NoteLabel } from '../../models/notes.model';
import { TASKS_STACK_SIZE, WORKING_DAYS_COUNT } from 'src/app/common/constants';
import { MatDialog } from '@angular/material/dialog';
import { ThemeManagerService } from 'src/app/common/theme-manager.service';

@Component({
  selector: 'app-notes-stack-grid',
  templateUrl: './notes-stack-grid.component.html',
  styleUrls: ['./notes-stack-grid.component.scss'],
})
export class NotesStackGridComponent implements OnInit, OnChanges {
  @Input() categories: NoteLabel[];
  @Input() notes: Note[];
  @Input() notesCellsCount: number;
  @Input() weekStart: Date;
  @Input() weekEnd: Date;

  notesCells = [];

  rowIndex: number;
  currentCategory: NoteLabel;
  cellsPerRowCount = WORKING_DAYS_COUNT;

  constructor(private dateParser: DateParserService, public noteModal: MatDialog, private themeService: ThemeManagerService,) {}

  ngOnInit() {
    this.notesCells = Array(this.notesCellsCount);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notes && this.notes) {
      this.prepareNotesList();
      this.allocateNotes();
    }
    if (changes.categories && this.notes) {
      this.allocateNotes();
    }
  }

  prepareNotesList() {
    this.notes = this.notes
      .map((note) => {
        note.duration = this.dateParser.getTaskDuration(
          note.startDate,
          note.endDate
        );
        return note;
      })
      .sort((a, b) => (a.duration < b.duration ? 1 : -1));
  }

  allocateNotes(): void {
    this.notesCells = Array(this.notesCellsCount);
    this.notes.forEach((note) => {
      const dayIndex = this.dateParser.getDayOfWeekIndex(note.startDate);
      note.labels.forEach((label) => {
        const catIndex = this.categories.findIndex((cat) => cat.id === label);
        if (catIndex > -1) {
          let cellIndex = catIndex * TASKS_STACK_SIZE * this.cellsPerRowCount + dayIndex - 1;
          cellIndex = this.shiftCellsHasNotesInStack(cellIndex);
          if (note.duration > 1) {
            this.assignMultipleCellNote(cellIndex, note, dayIndex);
          } else {
            this.assignSingleCellNote(cellIndex, note);
          }
        }
      });
    });
  }

  shiftCellsHasNotesInStack(cellIndex: number): number {
    let updatedIndex = cellIndex;
    if (this.notesCells[cellIndex] && this.notesCells[cellIndex].hasNote) {
      updatedIndex = cellIndex + this.cellsPerRowCount;
    }
    if (
      this.notesCells[updatedIndex] &&
      this.notesCells[updatedIndex].hasNote
    ) {
      updatedIndex = updatedIndex + this.cellsPerRowCount;
    }
    return updatedIndex;
  }

  assignSingleCellNote(cellIndex: number, note: Note): void {
    this.notesCells[cellIndex] = {
      hasNote: true,
      isTaskEnd: true,
      isTaskStart: true,
      note,
    };
  }

  assignMultipleCellNote(cellIndex: number, note: Note, dayIndex: number): void {
    let colsCount: number;
    let isTaskStart = true;
    let isTaskEnd = true;
    if (
      this.dateParser.isTaskStartedInPreviousWeek(this.weekStart, note.startDate)
    ) {
      cellIndex = cellIndex - dayIndex + 1;
      colsCount = this.dateParser.getTaskDuration(this.weekStart, note.endDate);
      isTaskStart = false;
      if (colsCount > this.cellsPerRowCount) {
        colsCount = this.cellsPerRowCount;
        isTaskEnd = false;
      }
    } else {
      if (
        this.dateParser.isTaskFinishedBeforeEndOfWeek(this.weekEnd, note.endDate)
      ) {
        colsCount = note.duration;
      } else {
        isTaskEnd = false;
        colsCount = this.dateParser.getTaskDuration(note.startDate, this.weekEnd);
      }
    }
    this.notesCells[cellIndex] = {
      hasNote: true,
      isTaskEnd,
      isTaskStart,
      colsCount,
      note,
    };
    this.adjustNeighbourCellsColumns(cellIndex, colsCount);
  }

  adjustNeighbourCellsColumns(cellIndex: number, mergedColsCount: number): void {
    if (mergedColsCount === 1) { return; }
    for (let i = 1; i < mergedColsCount; i++) {
      this.notesCells[cellIndex + i] = {
        hasNote: true,
        colsCount: 0,
      };
    }
  }

  openNoteDetails(note: Note): void {
    this.noteModal.open(NoteDetailsComponent, {
      data: {note, categories: this.categories},
      panelClass: `note-details-${this.themeService.currentTheme}`
    });
  }
}
